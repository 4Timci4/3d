import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "E-posta Doğrulama" };

export default async function ConfirmInfoPage({
  searchParams,
}: {
  searchParams: Promise<{ durum?: string }>;
}) {
  const { durum } = await searchParams;
  const hata = durum === "hata";

  return (
    <div className="shell page-shell confirm-page">
      <div className="confirm-card">
        <span
          className={`confirm-card__icon ${hata ? "is-error" : "is-ok"}`}
          aria-hidden="true"
        >
          {hata ? "!" : "✓"}
        </span>

        {hata ? (
          <>
            <span className="eyebrow">DOĞRULAMA</span>
            <h1>Doğrulama tamamlanamadı</h1>
            <p>
              Bağlantı geçersiz ya da süresi dolmuş olabilir. Bağlantılar tek kullanımlıktır ve belirli
              bir süre sonra geçerliliğini yitirir. Lütfen tekrar kayıt olup yeni bir doğrulama
              e-postası isteyin.
            </p>
            <div className="confirm-card__actions">
              <Link className="button button--primary" href="/kayit">
                Tekrar dene
              </Link>
              <Link className="button button--secondary" href="/giris">
                Giriş yap
              </Link>
            </div>
          </>
        ) : (
          <>
            <span className="eyebrow">DOĞRULAMA</span>
            <h1>E-postanız doğrulandı</h1>
            <p>
              Hesabınız başarıyla etkinleştirildi. Artık giriş yaparak siparişlerinizi takip edebilir
              ve alışverişe başlayabilirsiniz.
            </p>
            <div className="confirm-card__actions">
              <Link className="button button--primary" href="/hesabim">
                Hesabıma git
              </Link>
              <Link className="button button--secondary" href="/">
                Ana sayfaya dön
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
