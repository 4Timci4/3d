"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PasswordResult = { error?: string; success?: boolean; message?: string };

// Kullanıcı e-postasını girer; Supabase'e sıfırlama bağlantısı isteği gönderilir.
// Güvenlik: e-posta kayıtlı olsun ya da olmasın aynı nötr başarı mesajı döner
// (hesap numaralandırmasını önlemek için).
export async function requestPasswordReset(formData: FormData): Promise<PasswordResult> {
  const email = ((formData.get("email") as string | null) ?? "").trim().toLowerCase();

  if (!email) {
    return { error: "Lütfen e-posta adresinizi girin." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "Geçerli bir e-posta adresi girin." };
  }

  const supabase = await createClient();

  const h = await headers();
  const origin = h.get("origin") ?? (h.get("host") ? `https://${h.get("host")}` : "");
  const redirectTo = origin ? `${origin}/auth/confirm?next=/sifre-yenile` : undefined;

  const neutralMessage =
    "E-posta adresine kayıtlıysa şifre sıfırlama bağlantısını gönderdik. Gelen kutunuzu ve spam klasörünü kontrol edin.";

  try {
    await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  } catch {
    // Ağ / beklenmeyen istisna — yine de numaralandırmayı önlemek için nötr mesaj döndür.
    return { success: true, message: neutralMessage };
  }

  // Supabase hata döndürse bile (ör. e-posta kayıtlı değilse) nötr başarı mesajı döndürüyoruz.
  return { success: true, message: neutralMessage };
}

// Sıfırlama bağlantısından gelen oturumla yeni şifre belirlenir.
export async function updatePassword(formData: FormData): Promise<PasswordResult> {
  const password = (formData.get("password") as string | null) ?? "";
  const confirm = (formData.get("confirm") as string | null) ?? "";

  if (!password) {
    return { error: "Lütfen yeni bir şifre belirleyin." };
  }
  if (password.length < 8) {
    return { error: "Şifre en az 8 karakter olmalı." };
  }
  if (!confirm) {
    return { error: "Lütfen şifrenizi tekrar girin." };
  }
  if (password !== confirm) {
    return { error: "Şifreler eşleşmiyor." };
  }

  const supabase = await createClient();

  let error;
  try {
    ({ error } = await supabase.auth.updateUser({ password }));
  } catch {
    return { error: "Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edip tekrar deneyin." };
  }

  if (error) {
    return { error: mapUpdatePasswordError(error) };
  }

  redirect("/hesabim");
}

function mapUpdatePasswordError(error: { message?: string; code?: string; status?: number }): string {
  const code = error.code ?? "";
  const msg = (error.message ?? "").toLowerCase();

  if (code === "same_password" || msg.includes("should be different") || msg.includes("different from the old")) {
    return "Yeni şifreniz eskisiyle aynı olamaz.";
  }

  if (code === "weak_password" || msg.includes("password should") || msg.includes("weak password")) {
    return "Şifreniz çok zayıf. Daha uzun ve karmaşık bir şifre seçin.";
  }

  if (
    code === "session_not_found" ||
    code === "user_not_found" ||
    msg.includes("auth session missing") ||
    msg.includes("session missing") ||
    msg.includes("session_not_found")
  ) {
    return "Oturum süresi dolmuş. Lütfen şifre sıfırlama bağlantısını tekrar isteyin.";
  }

  return "Şifre güncellenirken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.";
}
