import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-primary tracking-wide">
          チケットレス受付システム
        </h1>
      </div>

      <div className="flex gap-6 mt-8">
        <Link
          href="/admin"
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg shadow-sm hover:opacity-90 transition-opacity font-bold"
        >
          管理者ログイン
        </Link>
        <Link
          href="/apply"
          className="px-8 py-3 bg-white border border-border text-foreground rounded-lg shadow-sm hover:bg-secondary transition-colors"
        >
          参加者申し込み
        </Link>
        <Link
          href="/staff"
          className="px-8 py-3 bg-white border border-border text-foreground rounded-lg shadow-sm hover:bg-secondary transition-colors"
        >
          スタッフ受付
        </Link>
      </div>

      <div className="mt-12 p-6 bg-secondary rounded-lg text-sm text-foreground/70 max-w-lg w-full">
        <h3 className="font-bold mb-2">システムステータス</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>フォント: 平成明朝体 (System Default Serif)</li>
          <li>テーマ: Bright Mode (No Dark Mode)</li>
          <li>DB接続: 未設定 (Supabase認証待ち)</li>
        </ul>
      </div>
    </div>
  );
}
