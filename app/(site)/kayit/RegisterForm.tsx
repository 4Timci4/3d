"use client";

import { useState, useTransition } from "react";
import { register } from "@/app/auth/actions";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
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
