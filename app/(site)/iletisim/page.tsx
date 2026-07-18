import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "İletişim" };

export default function ContactPage() {
  return (
    <div className="shell page-shell contact-page">
      <div className="contact-grid">
        <section>
          <header className="contact-header">
            <span className="eyebrow">İLETİŞİM</span>
            <h1>Bir ürün, ölçü veya fikri konuşalım.</h1>
            <p>Kişiselleştirme talebi, sipariş sorusu veya başka bir konu — yanıt genellikle 1 iş günü içinde gelir.</p>
          </header>

          <form className="contact-form">
            <div className="form-field">
              <label htmlFor="name">Ad soyad</label>
              <input id="name" name="name" autoComplete="name" />
            </div>
            <div className="form-field">
              <label htmlFor="email">E-posta</label>
              <input id="email" name="email" type="email" autoComplete="email" />
            </div>
            <div className="form-field">
              <label htmlFor="subject">Konu</label>
              <select id="subject" name="subject">
                <option>Ürün hakkında</option>
                <option>Kişiselleştirme</option>
                <option>Sipariş</option>
                <option>Diğer</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="message">Mesaj</label>
              <textarea id="message" name="message" rows={5} />
            </div>
            <button type="button" className="button button--primary">
              Gönder
            </button>
          </form>
        </section>

        <aside className="contact-details">
          <span className="eyebrow">ATÖLYE</span>
          <dl>
            <div>
              <dt>E-posta</dt>
              <dd><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd>
            </div>
            <div>
              <dt>Telefon</dt>
              <dd><a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></dd>
            </div>
            <div>
              <dt>Adres</dt>
              <dd>{siteConfig.address}</dd>
            </div>
          </dl>

          <div className="contact-social">
            <span className="eyebrow">SOSYAL</span>
            <div className="contact-social__links">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={siteConfig.social.pinterest} target="_blank" rel="noopener noreferrer">Pinterest</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}