"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

export default function ContactForm() {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string)?.trim() ?? "";
    const email = (fd.get("email") as string)?.trim() ?? "";
    const subject = (fd.get("subject") as string) ?? "";
    const message = (fd.get("message") as string)?.trim() ?? "";

    if (!name || !email || !message) {
      setError("Lütfen ad soyad, e-posta ve mesaj alanlarını doldurun.");
      return;
    }
    setError(null);

    const body = `Ad soyad: ${name}\nE-posta: ${email}\n\n${message}`;
    const href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `[${subject}] ${name}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="name">Ad soyad</label>
        <input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="form-field">
        <label htmlFor="email">E-posta</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="form-field">
        <label htmlFor="subject">Konu</label>
        <select id="subject" name="subject" defaultValue="Ürün hakkında">
          <option>Ürün hakkında</option>
          <option>Kişiselleştirme</option>
          <option>Sipariş</option>
          <option>Diğer</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="message">Mesaj</label>
        <textarea id="message" name="message" rows={4} required />
      </div>

      {error && (
        <p className="contact-form__error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="button button--primary">
        Gönder →
      </button>
    </form>
  );
}
