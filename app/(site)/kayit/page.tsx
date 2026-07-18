import type { Metadata } from "next";
import AuthTabs from "../giris/AuthTabs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Kayıt Ol" };

export default function RegisterPage() {
  return (
    <div className="shell page-shell auth-page">
      <AuthTabs initialTab="register" />
      <p className="auth-page-footer">© {new Date().getFullYear()} {siteConfig.name}</p>
    </div>
  );
}
