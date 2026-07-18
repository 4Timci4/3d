import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";

export const metadata: Metadata = { title: "Hesabım" };

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/giris");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, created_at")
    .eq("id", user.id)
    .single();

  const joinDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const displayName = profile?.full_name?.trim() || user.email;

  return (
    <div className="shell page-shell account">
      <header className="account__head">
        <div className="account__head-main">
          <span className="brand-mark__layer account__mark" aria-hidden="true" />
          <span className="eyebrow">HESABIM</span>
          <h1>{displayName}</h1>
          {joinDate && <p className="account__meta">Üyelik başlangıcı — {joinDate}</p>}
        </div>
        <form action={logout} className="account__logout">
          <button type="submit" className="button button--secondary">
            Çıkış Yap
          </button>
        </form>
      </header>

      <div className="account__grid">
        <section className="account__card">
          <span className="account__card-label">
            <span aria-hidden="true" className="account__card-tick" />
            Hesap Bilgileri
          </span>
          <dl className="account__dl">
            <div>
              <dt>Ad Soyad</dt>
              <dd>{profile?.full_name?.trim() || "—"}</dd>
            </div>
            <div>
              <dt>E-posta</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Telefon</dt>
              <dd>{profile?.phone?.trim() || "—"}</dd>
            </div>
          </dl>
        </section>

        <section className="account__card">
          <span className="account__card-label">
            <span aria-hidden="true" className="account__card-tick" />
            Siparişlerim
          </span>
          <div className="account__empty">
            <p>Henüz bir siparişin bulunmuyor.</p>
            <Link href="/urunler" className="text-link">
              Ürünleri keşfet →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
