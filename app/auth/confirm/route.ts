import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Supabase doğrulama e-postasındaki bağlantı buraya gelir.
// İki akışı da destekler:
//  - token_hash + type  → verifyOtp (önerilen, cihazlar arası çalışır)
//  - code               → exchangeCodeForSession (varsayılan şablon / aynı cihaz)
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next");

  // Açık yönlendirme (open redirect) koruması: yalnızca site içi yollar.
  const next = nextParam && nextParam.startsWith("/") ? nextParam : "/dogrulama-basarili";

  const supabase = await createClient();

  let ok = false;
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    ok = !error;
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    ok = !error;
  }

  const dest = new URL(next, origin);
  if (!ok) dest.searchParams.set("durum", "hata");
  return NextResponse.redirect(dest);
}
