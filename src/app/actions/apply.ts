'use server';

import { createClient } from "@/utils/supabase/server";

export async function submitApplication(formData: FormData) {
    const supabase = await createClient();

    // 1. Extract Data
    const eventCode = formData.get('event_code') as string;
    const employeeId = formData.get('employee_id') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    // Honeypot
    const honeyPot = formData.get('fax_number') as string;
    if (honeyPot) return { success: false, error: null };

    if (!eventCode || !employeeId || !name || !email) {
        return { success: false, error: '必須項目が入力されていません。' };
    }

    try {
        // 2. Resolve Event
        const { data: event, error: eventError } = await supabase
            .from('events')
            .select('id, tenant_id, name')
            .eq('event_code', eventCode)
            .single();

        if (eventError || !event) {
            return { success: false, error: 'イベントコードが無効です。' };
        }

        // 3. Resolve Tenant (For Name/Email settings)
        const { data: tenant } = await supabase.from('tenants').select('*').eq('id', event.tenant_id).single();
        if (!tenant) return { success: false, error: 'システムエラー: テナント不明' };

        // 4. Validate Employee in Master Data
        const { data: employee, error: findError } = await supabase
            .from('master_data')
            .select('id, name')
            .eq('tenant_id', tenant.id)
            .eq('employee_id', employeeId)
            .single();

        if (findError || !employee) {
            return { success: false, error: '入力された社員IDは名簿に存在しません。' };
        }

        // 5. Check if already Participating in THIS Event
        const { data: existingParticipation } = await supabase
            .from('participations')
            .select('id')
            .eq('event_id', event.id)
            .eq('master_data_id', employee.id)
            .single();

        if (existingParticipation) {
            return { success: false, error: '既にこのイベントへの申し込みは完了しています。' };
        }

        // 6. Create Participation Record
        const { data: participation, error: createError } = await supabase
            .from('participations')
            .insert({
                event_id: event.id,
                master_data_id: employee.id,
                email: email,
                phone: phone,
                checkin_token: crypto.randomUUID(),
                status: 'pending'
            })
            .select('checkin_token')
            .single();

        if (createError) {
            console.error('Participation Error:', createError);
            return { success: false, error: 'データ保存に失敗しました。' };
        }

        // 7. Queue Email
        const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
        const ticketUrl = `${baseUrl}/apply/complete?token=${participation.checkin_token}`;

        await supabase.from('mail_jobs').insert({
            tenant_id: tenant.id,
            to_email: email,
            subject: `【${event.name}】受付完了のお知らせ`,
            body: `${employee.name} 様\n\nお申し込みありがとうございます。\n当日は以下のURLよりQRコードを表示し、受付にてご提示ください。\n\nチケットURL:\n${ticketUrl}`,
            status: 'pending'
        });

        // Trigger Mail Processor
        try {
            const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
            fetch(`${baseUrl}/api/cron/mail`, { method: 'GET', cache: 'no-store' });
        } catch (e) {
            // Ignore
        }

        return { success: true, token: participation.checkin_token };

    } catch (err) {
        console.error('Unexpected error:', err);
        return { success: false, error: 'システムエラーが発生しました。' };
    }
}

