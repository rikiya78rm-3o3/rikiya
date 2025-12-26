import Link from "next/link";
import { LogOut, Settings, Users, BarChart } from "lucide-react";
import { signOut } from "@/app/auth/actions";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-secondary/50">
            {/* Admin Header */}
            <header className="bg-white border-b border-border sticky top-0 z-10">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/admin" className="text-xl font-bold text-primary tracking-wide">
                        チケットレス管理
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/70">
                        <Link href="/admin" className="hover:text-primary flex items-center gap-2 transition-colors">
                            <BarChart className="w-4 h-4" />
                            ダッシュボード
                        </Link>
                        <Link href="/admin/master" className="text-foreground/70 hover:text-primary transition-colors">
                            名簿管理(Master)
                        </Link>
                        <Link href="/admin/settings" className="text-foreground/70 hover:text-primary transition-colors">
                            イベント設定
                        </Link>
                        <Link href="/admin/settings/smtp" className="text-foreground/70 hover:text-primary transition-colors">
                            SMTP設定
                        </Link>
                    </nav>

                    <form action={signOut}>
                        <button type="submit" className="text-sm font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-md transition-colors flex items-center gap-2">
                            <LogOut className="w-4 h-4" />
                            ログアウト
                        </button>
                    </form>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
