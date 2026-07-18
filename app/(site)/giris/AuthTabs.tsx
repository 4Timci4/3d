"use client";

import { useState } from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";
import RegisterForm from "../kayit/RegisterForm";

export default function AuthTabs({ initialTab = "login" }: { initialTab?: "login" | "register" }) {
  const [tab, setTab] = useState<"login" | "register">(initialTab);
  const isLogin = tab === "login";

  return (
    <div className="auth-page-grid">
      <section className="auth-page-intro">
        <span className="brand-mark__layer auth-page-intro__mark" aria-hidden="true" />
        <span className="eyebrow">{isLogin ? "HOŞ GELDİNİZ" : "YENİ HESAP"}</span>
        <h1>
          {isLogin ? (
            <>
              Tekrar<br />
              <em>hoş geldiniz.</em>
            </>
          ) : (
            <>
              Her ürün<br />
              <em>bir hikaye.</em>
            </>
          )}
        </h1>
        <p>
          {isLogin
            ? "Hesabınıza giriş yapın, siparişlerinizi ve kaydedilmiş adreslerinizi tek yerden yönetin."
            : "Birkaç saniyede hesabınızı oluşturun, siparişlerinizi ve kaydedilmiş adreslerinizi tek yerden yönetin."}
        </p>

        <ul className="auth-page-features">
          <li><span>01</span>Sipariş takibi</li>
          <li><span>02</span>Kaydedilmiş adresler</li>
          <li><span>03</span>Özel indirimler</li>
        </ul>
      </section>

      <section className="auth-page-card">
        <div className="auth-tabs" role="tablist" aria-label="Giriş veya kayıt">
          <button
            type="button"
            role="tab"
            aria-selected={isLogin}
            className={`auth-tab${isLogin ? " is-active" : ""}`}
            onClick={() => setTab("login")}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isLogin}
            className={`auth-tab${!isLogin ? " is-active" : ""}`}
            onClick={() => setTab("register")}
          >
            Kayıt Ol
          </button>
        </div>

        {isLogin ? (
          <>
            <LoginForm />
            <p className="auth-page-switch">
              <Link href="/sifremi-unuttum">Şifrenizi mi unuttunuz?</Link>
            </p>
          </>
        ) : (
          <RegisterForm />
        )}
      </section>
    </div>
  );
}
