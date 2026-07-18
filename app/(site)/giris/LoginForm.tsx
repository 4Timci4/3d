"use client";

import { useState, useTransition } from "react";
import { login, resendConfirmation } from "@/app/auth/actions";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isResending, startResendTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    setNeedsConfirmation(null);
    setResendMessage(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.needsConfirmation) {
        setNeedsConfirmation(result.message ?? "E-posta adresin henüz doğrulanmadı.");
      } else if (result?.error) {
        setError(result.error);
      }
    });
  }

  function handleResend() {
    if (!email) return;
    setResendMessage(null);
    startResendTransition(async () => {
      const formData = new FormData();
      formData.set("email", email);
      const result = await resendConfirmation(formData);
      setResendMessage(result.message);
    });
  }

  return (
    <form className="auth-page-form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="auth-page-form__error" role="alert">
          <span>⚠</span> {error}
        </div>
      )}

      {needsConfirmation && (
        <div className="auth-page-form__notice" role="status">
          <span aria-hidden="true">!</span>
          <div>
            <p>{needsConfirmation}</p>
            <p>
              <button
                type="button"
                className="text-button"
                onClick={handleResend}
                disabled={isResending || !email}
              >
                {isResending ? "Gönderiliyor…" : "Doğrulama e-postasını tekrar gönder"}
              </button>
            </p>
            {resendMessage && <p>{resendMessage}</p>}
          </div>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="password">Şifre</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
          disabled={isPending}
        />
      </div>

      <button type="submit" className="button button--primary button--full" disabled={isPending}>
        {isPending ? "Giriş yapılıyor…" : "Giriş Yap"}
      </button>
    </form>
  );
}
