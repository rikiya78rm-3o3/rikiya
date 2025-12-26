'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Staff Session Types
export type StaffSession = {
  eventId: string;
  eventName: string;
  tenantName: string;
};

const SESSION_COOKIE_NAME = 'staff_session';

// Staff Login
export async function staffLogin(formData: FormData) {
  const supabase = await createClient();
  const cookieStore = cookies();

  const companyCode = formData.get('company_code') as string;
  const eventCode = formData.get('event_code') as string;
  const passcode = formData.get('passcode') as string;

  if (!companyCode || !eventCode || !passcode) {
    return { success: false, error: '全ての項目を入力してください。' };
  }

  // 1. Find Tenant by Company Code
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id, name')
    .eq('company_code', companyCode)
    .single();

  if (!tenant) {
    return { success: false, error: '企業コードが見つかりません。' };
  }

  // 2. Find Event by Tenant ID + Event Code
  const { data: event } = await supabase
    .from('events')
    .select('id, name, staff_passcode')
    .eq('tenant_id', tenant.id)
    .eq('event_code', eventCode)
    .single();

  if (!event) {
    return { success: false, error: 'イベントコードが見つかりません。' };
  }

  // 3. Verify Passcode
  if (event.staff_passcode !== passcode) {
    return { success: false, error: 'パスコードが間違っています。' };
  }

  // 4. Create Session (Simple JSON in Cookie for MVP)
  const sessionData: StaffSession = {
    eventId: event.id,
    eventName: event.name,
    tenantName: tenant.name
  };

  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  return { success: true };
}

// Staff Logout
export async function staffLogout() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect('/staff');
}

// Get Session logic
export async function getStaffSession(): Promise<StaffSession | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) return null;

  try {
    return JSON.parse(sessionCookie.value);
  } catch (e) {
    return null;
  }
}
