import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "İletişim" };

export default function ContactPage() {
  return (
    <div className="shell page-shell contact-page">
      <header className="page-intro">
        <span className="eyebrow">İLETİŞİM</span>
        <h1>Bir ürün, ölçü veya kişiselleştirme fikrini konuşalım.</h1>
        <p>Form yalnızca arayüz örneğidir; backend servisine bağlı değildir.</p>
      </header>
      <div className="contact-grid">
        <form className="contact-form">
          <div className="form-field"><label htmlFor="name">Ad soyad</label><input id="name" name="name" autoComplete="name" /></div>
          <div className="form-field"><label htmlFor="email">E-posta</label><input id="email" name="email" type="email" autoComplete="email" /></div>
          <div className="form-field"><label htmlFor="subject">Konu</label><select id="subject" name="subject"><option>Ürün hakkında</option><option>Kişiselleştirme</option><option>Sipariş</option><option>Diğer</option></select></div>
          <div className="form-field"><label htmlFor="message">Mesaj</label><textarea id="message" name="message" rows={6} /></div>
          <button type="button" className="button button--primary" aria-describedby="contact-note">Mesajı Hazırla</button>
          <small id="contact-note">Gönderim entegrasyonu yok. Yayına alınmadan önce form servisi bağlanmalı.</small>
        </form>
        <aside className="contact-details">
          <span className="eyebrow">ATÖLYE BİLGİLERİ</span>
          <dl>
            <div><dt>E-posta</dt><dd><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd></div>
            <div><dt>Telefon</dt><dd>{siteConfig.phone}</dd></div>
            <div><dt>Adres</dt><dd>{siteConfig.address}</dd></div>
          </dl>
          <p>Bu bilgiler `config/site.ts` dosyasından tek noktadan değiştirilebilir.</p>
        </aside>
      </div>
    </div>
  );
}
