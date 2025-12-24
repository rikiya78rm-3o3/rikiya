'use client';

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Save, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function SmtpSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    // Mock submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">
                    SMTP送信設定
                </h1>
                <p className="text-foreground/70 text-sm">
                    企業独自のメールサーバーを設定します。パスワードは暗号化して保存され、画面には表示されません。
                </p>
            </div>

            <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <Input
                            label="SMTPホスト (Host)"
                            placeholder="smtp.example.com"
                            name="smtp_host"
                            required
                        />
                        <Input
                            label="ポート (Port)"
                            placeholder="587"
                            name="smtp_port"
                            type="number"
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <Input
                            label="ユーザー名 / ログインID"
                            placeholder="user@example.com"
                            name="smtp_user"
                            required
                        />

                        <div className="space-y-2">
                            <Input
                                label="SMTPパスワード"
                                placeholder="新しいパスワードを入力 (変更時のみ)"
                                name="smtp_password"
                                type="password"
                            // No 'value' retrieval for security - strictly write-only UI
                            />
                            <p className="text-xs text-foreground/50 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                セキュリティのため、現在のパスワードは表示されません
                            </p>
                        </div>
                    </div>

                    <hr className="border-border" />

                    <Input
                        label="送信元アドレス (From)"
                        placeholder="noreply@example.com"
                        name="smtp_from"
                        type="email"
                        required
                    />

                    <div className="flex justify-end pt-4">
                        <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto">
                            <Save className="w-4 h-4 mr-2" />
                            設定を保存する
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
