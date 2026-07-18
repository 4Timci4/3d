import type { Metadata } from "next";
import Link from "next/link";
import ResetPasswordForm from "./ResetPasswordForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Şifre Yenile" };

export default function ResetPasswordPage() {
  return (
    <div className="shell page-shell auth-page">
      <div className="auth-page-grid">
        <section className="auth-page-intro">
          <span className="brand-mark__layer auth-page-intro__mark" aria-hidden="true" />
          <span className="eyebrow">YENİ ŞİFRE</span>
          <h1>
            Yeni bir<br />
            <em>başlangıç.</em>
          </h1>
          <p>Hesabınız için yeni bir şifre belirleyin. Bu bağlantı yalnızca bir kez kullanılabilir.</p>

          <ul className="auth-page-features">
            <li><span>01</span>En az 8 karakter</li>
            <li><span>02</span>Şifrenizi doğrulayın</li>
            <li><span>03</span>Hesabınıza yönlendirilin</li>
          </ul>
        </section>

        <section className="auth-page-card">
          <header className="auth-page-header">
            <h2>Şifre Yenile</h2>
            <p>Hesabınız için yeni bir şifre belirleyin.</p>
          </header>

          <ResetPasswordForm />

          <p className="auth-page-switch">
            <Link href="/giris">Girişe dön →</Link>
          </p>
        </section>
      </div>

      <p className="auth-page-footer">© {new Date().getFullYear()} {siteConfig.name}</p>
    </div>
  );
}
