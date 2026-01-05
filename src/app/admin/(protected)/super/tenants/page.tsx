'use client';

import { Card } from "@/components/ui/Card";
import { Building2, Mail, Hash, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllTenants } from "@/app/actions/super-admin";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function TenantsListPage() {
    const [tenants, setTenants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllTenants().then(data => {
            setTenants(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="text-center py-8">読み込み中...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-primary" />
                        登録企業一覧
                    </h1>
                    <p className="text-foreground/70 text-sm mt-1">
                        システムに登録されている全企業の情報
                    </p>
                </div>
                <Link href="/admin/super/create-tenant">
                    <Button>
                        新規企業作成
                    </Button>
                </Link>
            </div>

            <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-foreground/70 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">企業名</th>
                                <th className="px-6 py-4">企業コード</th>
                                <th className="px-6 py-4">登録メールアドレス</th>
                                <th className="px-6 py-4">登録日</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {tenants.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-foreground/50">
                                        登録企業がありません
                                    </td>
                                </tr>
                            ) : (
                                tenants.map(tenant => (
                                    <tr key={tenant.id} className="hover:bg-muted/10 transition-colors">
                                        <td className="px-6 py-4 font-bold">
                                            {tenant.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-bold text-primary">
                                                {tenant.company_code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-foreground/40" />
                                                <span className="font-mono">{tenant.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-foreground/60">
                                            {new Date(tenant.created_at).toLocaleDateString('ja-JP')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    <strong>📊 統計</strong><br />
                    登録企業数: <span className="font-bold">{tenants.length}</span> 社
                </p>
            </div>
        </div>
    );
}
