"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

type LoginResult = { error?: string; needsConfirmation?: boolean; message?: string };

export async function login(formData: FormData): Promise<LoginResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    const code = (error as { code?: string }).code ?? "";
    const msg = (error.message ?? "").toLowerCase();

    if (code === "email_not_confirmed" || msg.includes("email not confirmed")) {
      return {
        needsConfirmation: true,
        message:
          "E-posta adresin henüz doğrulanmadı. Giriş yapmadan önce gelen kutundaki (ve spam) doğrulama bağlantısına tıkla.",
      };
    }

    return { error: "E-posta veya şifre hatalı." };
  }

  revalidatePath("/", "layout");
  redirect("/hesabim");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RegisterResult = { error?: string; success?: boolean; message?: string };

export async function register(formData: FormData): Promise<RegisterResult> {
  const supabase = await createClient();

  // Girdileri normalize et
  const fullName = ((formData.get("full_name") as string | null) ?? "").trim();
  const email = ((formData.get("email") as string | null) ?? "").trim().toLowerCase();
  const password = (formData.get("password") as string | null) ?? "";
  const confirm = (formData.get("confirm") as string | null) ?? "";

  // ── Sunucu tarafı doğrulama (istemci atlanırsa da korur) ──
  if (!fullName) {
    return { error: "Lütfen ad soyadınızı girin." };
  }
  if (fullName.length < 2) {
    return { error: "Ad soyad en az 2 karakter olmalı." };
  }
  if (!email) {
    return { error: "Lütfen e-posta adresinizi girin." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "Geçerli bir e-posta adresi girin." };
  }
  if (!password) {
    return { error: "Lütfen bir şifre belirleyin." };
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

  // Doğrulama bağlantısının döneceği site içi adres
  const h = await headers();
  const origin = h.get("origin") ?? (h.get("host") ? `https://${h.get("host")}` : "");
  const emailRedirectTo = origin
    ? `${origin}/auth/confirm?next=/dogrulama-basarili`
    : undefined;

  // ── Supabase kayıt ──
  let result;
  try {
    result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo,
      },
    });
  } catch {
    // Ağ / beklenmeyen istisna
    return { error: "Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edip tekrar deneyin." };
  }

  const { data, error } = result;

  if (error) {
    return { error: mapRegisterError(error) };
  }

  // E-posta doğrulama açıkken (veya e-posta zaten kayıtlıyken) Supabase
  // session döndürmez. Bu durumda /hesabim'e yönlendirmek /giris'e geri atar.
  if (!data.session) {
    // Güvenlik: zaten kayıtlı e-postalarda Supabase, numaralandırmayı önlemek
    // için identities'i boş döndürür — yine de kullanıcıya nötr mesaj veriyoruz.
    return {
      success: true,
      message:
        "Kaydınız alındı! Hesabınızı etkinleştirmek için e-postanıza gönderdiğimiz doğrulama bağlantısına tıklayın. Bağlantıyı onayladıktan sonra giriş yapabilirsiniz. E-postayı göremiyorsanız spam klasörünü kontrol edin.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/hesabim");
}

function mapRegisterError(error: { message?: string; code?: string; status?: number }): string {
  const code = error.code ?? "";
  const msg = (error.message ?? "").toLowerCase();
  const status = error.status ?? 0;

  // E-posta gönderim hız sınırı — doğrulama maili büyük olasılıkla zaten gönderildi
  if (
    code === "over_email_send_rate_limit" ||
    code === "over_request_rate_limit" ||
    status === 429 ||
    msg.includes("rate limit") ||
    msg.includes("for security purposes")
  ) {
    return "Doğrulama e-postası kısa süre önce gönderildi. Lütfen gelen kutunuzu ve spam klasörünüzü kontrol edin. Yeni bir bağlantı istemek için birkaç dakika bekleyip tekrar deneyin.";
  }

  // Zaten kayıtlı
  if (
    code === "user_already_exists" ||
    code === "email_exists" ||
    msg.includes("already registered") ||
    msg.includes("already been registered") ||
    msg.includes("user already exists")
  ) {
    return "Bu e-posta zaten kayıtlı. Giriş yapmayı deneyin.";
  }

  // Zayıf şifre (Supabase şifre politikası)
  if (code === "weak_password" || msg.includes("password should") || msg.includes("weak password")) {
    return "Şifreniz çok zayıf. Daha uzun ve karmaşık bir şifre seçin.";
  }

  // Geçersiz e-posta
  if (
    code === "email_address_invalid" ||
    msg.includes("invalid email") ||
    msg.includes("unable to validate email")
  ) {
    return "E-posta adresi geçersiz görünüyor. Lütfen kontrol edin.";
  }

  // Kayıt kapalı
  if (code === "signup_disabled" || msg.includes("signups not allowed") || msg.includes("signup is disabled")) {
    return "Şu anda yeni kayıtlar kapalı. Lütfen daha sonra tekrar deneyin.";
  }

  // E-posta gönderimi başarısız (SMTP / sağlayıcı hatası)
  if (
    code === "email_provider_disabled" ||
    code === "unexpected_failure" ||
    status === 500 ||
    msg.includes("error sending") ||
    msg.includes("sending confirmation") ||
    msg.includes("smtp")
  ) {
    return "Doğrulama e-postası gönderilemedi. E-posta ayarlarında bir sorun olabilir; lütfen daha sonra tekrar deneyin.";
  }

  return "Kayıt sırasında beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.";
}

type ResendResult = { success?: boolean; message: string };

export async function resendConfirmation(formData: FormData): Promise<ResendResult> {
  const email = ((formData.get("email") as string | null) ?? "").trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return {
      message: "Doğrulama e-postasını yeniden göndermek için önce geçerli bir e-posta adresi gir.",
    };
  }

  const supabase = await createClient();

  const h = await headers();
  const origin = h.get("origin") ?? (h.get("host") ? `https://${h.get("host")}` : "");
  const emailRedirectTo = origin ? `${origin}/auth/confirm?next=/dogrulama-basarili` : undefined;

  try {
    await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo },
    });
  } catch {
    // Ağ hatası olsa dahi kullanıcıya nötr mesaj döneriz (numaralandırmayı önlemek için)
  }

  return {
    success: true,
    message:
      "Doğrulama bağlantısını e-posta adresine tekrar gönderdik. Birkaç dakika içinde gelmezse spam klasörünü kontrol et.",
  };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}