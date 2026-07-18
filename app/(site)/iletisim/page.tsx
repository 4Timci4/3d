import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "İletişim" };

export default function ContactPage() {
  return (
    <div className="shell page-shell contact-page">
      <header className="contact-header">
        <span className="brand-mark__layer contact-mark" aria-hidden="true" />
        <span className="eyebrow">İLETİŞİM</span>
        <h1>Bir ürün, ölçü veya fikri konuşalım.</h1>
        <p>
          Kişiselleştirme talebi, sipariş sorusu ya da başka bir konu — yanıt genellikle 1 iş günü
          içinde gelir.
        </p>
      </header>

      <div className="contact-grid">
        <ContactForm />

        <aside className="contact-details">
          <span className="eyebrow">ATÖLYE</span>
          <dl>
            <div>
              <dt>E-posta</dt>
              <dd>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </dd>
            </div>
            <div>
              <dt>Telefon</dt>
              <dd>
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Adres</dt>
              <dd>{siteConfig.address}</dd>
            </div>
          </dl>

          <div className="contact-social">
            <span className="eyebrow">SOSYAL</span>
            <div className="contact-social__links">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href={siteConfig.social.pinterest} target="_blank" rel="noopener noreferrer">
                Pinterest
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
