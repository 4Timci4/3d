"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="newsletter-success" role="status">
        <span className="eyebrow">KAYIT ALINDI</span>
        <strong>Teşekkürler.</strong>
        <p>Bu yalnızca frontend durumudur; henüz bir e-posta servisine bağlanmadı.</p>
        <button type="button" className="text-button" onClick={() => setSubmitted(false)}>Farklı e-posta kullan</button>
      </div>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email">E-posta adresi</label>
      <div>
        <input id="newsletter-email" type="email" required placeholder="ornek@eposta.com" />
        <button className="button button--primary" type="submit">Listeye Katıl</button>
      </div>
      <small>Yeni ürün ve küçük seri duyuruları. Backend entegrasyonu henüz yok.</small>
    </form>
  );
}
