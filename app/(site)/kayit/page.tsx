import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Kayıt Ol" };

export default function RegisterPage() {
  return (
    <div className="shell page-shell auth-page">
      <div className="auth-page-grid">
        <section className="auth-page-intro">
          <span className="brand-mark__layer auth-page-intro__mark" aria-hidden="true" />
          <span className="eyebrow">YENİ HESAP</span>
          <h1>
            Her ürün<br />
            <em>bir hikaye.</em>
          </h1>
          <p>Birkaç saniyede hesabınızı oluşturun, siparişlerinizi ve kaydedilmiş adreslerinizi tek yerden yönetin.</p>

          <ul className="auth-page-features">
            <li><span>01</span>Sipariş takibi</li>
            <li><span>02</span>Kaydedilmiş adresler</li>
            <li><span>03</span>Özel indirimler</li>
          </ul>
        </section>

        <section className="auth-page-card">
          <header className="auth-page-header">
            <h2>Kayıt Ol</h2>
            <p>Birkaç saniyede hesabınızı oluşturun.</p>
          </header>

          <RegisterForm />

          <p className="auth-page-switch">
            Zaten hesabınız var mı? <Link href="/giris">Giriş yapın →</Link>
          </p>
        </section>
      </div>

      <p className="auth-page-footer">© {new Date().getFullYear()} {siteConfig.name}</p>
    </div>
  );
}
