"use client";

import { useState, useTransition } from "react";
import { requestPasswordReset } from "@/app/auth/password";

export default function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    setNotice(null);
    startTransition(async () => {
      const result = await requestPasswordReset(formData);
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

      <button type="submit" className="button button--primary button--full" disabled={isPending}>
        {isPending ? "Gönderiliyor…" : "Sıfırlama Bağlantısı Gönder →"}
      </button>
    </form>
  );
}
