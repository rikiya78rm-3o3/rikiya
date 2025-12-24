import { Card } from "@/components/ui/Card";
import { Users, CheckCircle, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">
                    イベントダッシュボード
                </h1>
                <div className="flex gap-3">
                    <Link
                        href="/admin/master"
                        className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-bold hover:bg-secondary transition-colors"
                    >
                        名簿管理
                    </Link>
                    <Link
                        href="/admin/settings/smtp"
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                        設定変更
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="総申し込み数"
                    value="1,240"
                    icon={<Users className="w-6 h-6 text-blue-500" />}
                    trend="+12 本日"
                />
                <StatsCard
                    title="チェックイン済み"
                    value="856"
                    icon={<CheckCircle className="w-6 h-6 text-green-500" />}
                    subtext="来場率 69%"
                />
                <StatsCard
                    title="メール送信待ち"
                    value="0"
                    icon={<Mail className="w-6 h-6 text-gray-500" />}
                    subtext="すべて送信完了"
                />
                <StatsCard
                    title="エラー/不達"
                    value="3"
                    icon={<AlertCircle className="w-6 h-6 text-red-500" />}
                    isWarning
                />
            </div>

            {/* Recent Activity (Placeholder) */}
            <Card className="min-h-[300px]">
                <h3 className="font-bold text-lg mb-4">最近のアクティビティ</h3>
                <div className="text-foreground/60 text-sm text-center py-20">
                    データがありません
                </div>
            </Card>
        </div>
    );
}

function StatsCard({
    title,
    value,
    icon,
    trend,
    subtext,
    isWarning
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend?: string;
    subtext?: string;
    isWarning?: boolean;
}) {
    return (
        <Card className={`flex flex-col gap-2 ${isWarning ? 'border-red-200 bg-red-50/50' : ''}`}>
            <div className="flex items-start justify-between">
                <span className="text-sm font-bold text-foreground/60">{title}</span>
                <div className="p-2 bg-white rounded-full shadow-sm">{icon}</div>
            </div>
            <div className="text-3xl font-bold tracking-tight">{value}</div>
            {(trend || subtext) && (
                <div className="text-xs font-medium text-foreground/50 mt-1">
                    {trend && <span className="text-primary">{trend}</span>}
                    {subtext}
                </div>
            )}
        </Card>
    );
}
