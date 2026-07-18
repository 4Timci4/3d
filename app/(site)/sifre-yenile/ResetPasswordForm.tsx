"use client";

import { useState, useTransition } from "react";
import { updatePassword } from "@/app/auth/password";

export default function ResetPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await updatePassword(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form className="auth-page-form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="auth-page-form__error" role="alert">
          <span>⚠</span> {error}
        </div>
      )}

      <div className="form-field">
        <label htmlFor="password">Yeni Şifre <small>(min. 8 karakter)</small></label>
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
        <label htmlFor="confirm">Yeni Şifre Tekrar</label>
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

      <button type="submit" className="button button--primary button--full" disabled={isPending}>
        {isPending ? "Kaydediliyor…" : "Şifreyi Güncelle →"}
      </button>
    </form>
  );
}
