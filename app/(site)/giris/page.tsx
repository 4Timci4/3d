import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Giriş Yap" };

export default function LoginPage() {
  return (
    <div className="shell page-shell auth-page">
      <div className="auth-page-grid">
        <section className="auth-page-intro">
          <span className="brand-mark__layer auth-page-intro__mark" aria-hidden="true" />
          <span className="eyebrow">HOŞ GELDİNİZ</span>
          <h1>
            Tekrar<br />
            <em>hoş geldiniz.</em>
          </h1>
          <p>Hesabınıza giriş yapın, siparişlerinizi ve kaydedilmiş adreslerinizi tek yerden yönetin.</p>

          <ul className="auth-page-features">
            <li><span>01</span>Sipariş takibi</li>
            <li><span>02</span>Kaydedilmiş adresler</li>
            <li><span>03</span>Özel indirimler</li>
          </ul>
        </section>

        <section className="auth-page-card">
          <header className="auth-page-header">
            <h2>Giriş Yap</h2>
            <p>Hesabınıza erişmek için bilgilerinizi girin.</p>
          </header>

          <LoginForm />

          <p className="auth-page-switch">
            Hesabınız yok mu? <Link href="/kayit">Kayıt olun →</Link>
          </p>
          <p className="auth-page-switch">
            <Link href="/sifremi-unuttum">Şifrenizi mi unuttunuz?</Link>
          </p>
        </section>
      </div>

      <p className="auth-page-footer">© {new Date().getFullYear()} {siteConfig.name}</p>
    </div>
  );
}
