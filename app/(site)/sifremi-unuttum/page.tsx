import type { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Şifremi Unuttum" };

export default function ForgotPasswordPage() {
  return (
    <div className="shell page-shell auth-page">
      <div className="auth-page-grid">
        <section className="auth-page-intro">
          <span className="brand-mark__layer auth-page-intro__mark" aria-hidden="true" />
          <span className="eyebrow">ŞİFRE SIFIRLAMA</span>
          <h1>
            Olur böyle<br />
            <em>şeyler.</em>
          </h1>
          <p>E-posta adresinizi girin, hesabınıza ait şifre sıfırlama bağlantısını gönderelim.</p>

          <ul className="auth-page-features">
            <li><span>01</span>E-posta adresinizi girin</li>
            <li><span>02</span>Gelen bağlantıya tıklayın</li>
            <li><span>03</span>Yeni şifrenizi belirleyin</li>
          </ul>
        </section>

        <section className="auth-page-card">
          <header className="auth-page-header">
            <h2>Şifremi Unuttum</h2>
            <p>Kayıtlı e-posta adresinizi girin.</p>
          </header>

          <ForgotPasswordForm />

          <p className="auth-page-switch">
            Şifrenizi hatırladınız mı? <Link href="/giris">Giriş yapın →</Link>
          </p>
        </section>
      </div>

      <p className="auth-page-footer">© {new Date().getFullYear()} {siteConfig.name}</p>
    </div>
  );
}
