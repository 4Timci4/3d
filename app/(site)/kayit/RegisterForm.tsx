"use client";

import { useState, useTransition } from "react";
import { register } from "@/app/auth/actions";

function formatTRPhone(value: string) {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("90")) d = d.slice(2);
  d = d.slice(0, 10);
  const g = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 8), d.slice(8, 10)].filter(Boolean);
  return "+90" + (g.length ? " " + g.join(" ") : " ");
}

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [phone, setPhone] = useState("+90 ");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    setNotice(null);
    startTransition(async () => {
      const result = await register(formData);
      if (result?.error) setError(result.error);
      else if (result?.success) setNotice(result.message ?? null);
    });
  }

  if (notice) {
    return (
      <div className="auth-page-form__notice" role="status">
        <span aria-hidden="true">✓</span>
        <p>{notice}</p>
      </div>
    );
  }

  return (
    <form className="auth-page-form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="auth-page-form__error" role="alert">
          <span>⚠</span> {error}
        </div>
      )}

      <div className="form-field">
        <label htmlFor="full_name">Ad Soyad</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          autoComplete="name"
          placeholder="Adınız Soyadınız"
          required
          disabled={isPending}
        />
      </div>

      <div className="form-field">
        <label htmlFor="email">E-posta</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ornek@mail.com"
          required
          disabled={isPending}
        />
      </div>

      <div className="auth-page-form__row">
        <div className="form-field">
          <label htmlFor="phone">Telefon</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(formatTRPhone(e.target.value))}
            onFocus={(e) => {
              if (!e.target.value) setPhone("+90 ");
            }}
            placeholder="+90 5XX XXX XX XX"
            required
            disabled={isPending}
          />
        </div>

        <div className="form-field">
          <label htmlFor="birth_date">Doğum Tarihi</label>
          <input
            id="birth_date"
            name="birth_date"
            type="date"
            autoComplete="bday"
            required
            disabled={isPending}
          />
        </div>
      </div>

      <div className="auth-page-form__row">
        <div className="form-field">
          <label htmlFor="password">Şifre <small>(min. 8 karakter)</small></label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
            minLength={8}
            disabled={isPending}
          />
        </div>

        <div className="form-field">
          <label htmlFor="confirm">Şifre Tekrar</label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
            disabled={isPending}
          />
        </div>
      </div>

      <button type="submit" className="button button--primary button--full" disabled={isPending}>
        {isPending ? "Kayıt yapılıyor…" : "Hesap Oluştur →"}
      </button>
    </form>
  );
}
