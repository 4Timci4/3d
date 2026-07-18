import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Üretim Süreci" };

export default function ProductionPage() {
  return (
    <div className="shell page-shell editorial-page production-page">
      <header className="process-lead">
        <span className="eyebrow">ÜRETİM SÜRECİ</span>
        <h1 className="process-lead__title">
          Her katman görünür; her karar kullanım amacına bağlı.
        </h1>
      </header>

      <section className="process-notes" aria-label="Örnek ve tolerans notu">
        <figure className="process-notes__ref">
          <div className="process-notes__crop">
            <Image
              src="/katmanlar-ornek.png"
              alt="Katmanların üst üste binerek bir kompozisyon oluşturduğu kağıt örneği."
              fill
              sizes="(max-width: 820px) 100vw, 360px"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                filter: "grayscale(0.6) contrast(1.03) brightness(1.03)",
              }}
            />
            <span className="process-notes__tint" aria-hidden="true" />
            <span className="process-notes__badge">ÖRNEK</span>
          </div>
          <figcaption>
            <span className="eyebrow">ÖRNEK / İLHAM</span>
            <p>
              Katmanların üst üste binme fikri — kağıt örneği. Aynı mantığı 3D
              baskıda uygularız.
            </p>
          </figcaption>
        </figure>

        <aside className="process-notes__tol">
          <span className="eyebrow">TOLERANS NOTU</span>
          <h2>Katman çizgileri ve ton farkları sürecin doğal sonucudur.</h2>
          <p>
            Birleşim izleri ve malzeme tonundaki küçük değişimler kusur gibi
            gizlenmez; ürün açıklamasında beklenen sınırlar açıkça belirtilir.
          </p>
        </aside>
      </section>
    </div>
  );
}
