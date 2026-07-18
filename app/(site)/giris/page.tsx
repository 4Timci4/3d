import type { Metadata } from "next";
import AuthTabs from "./AuthTabs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Giriş Yap" };

export default function LoginPage() {
  return (
    <div className="shell page-shell auth-page">
      <AuthTabs initialTab="login" />
      <p className="auth-page-footer">© {new Date().getFullYear()} {siteConfig.name}</p>
    </div>
  );
}
