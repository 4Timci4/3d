import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Hakkımızda" };

export default function AboutPage() {
  return (
    <div className="shell page-shell editorial-page">
      <header className="page-intro">
        <span className="eyebrow">ATÖLYE HAKKINDA</span>
        <h1>Seri üretim hızından çok, iyi çalışan küçük serilere odaklanan bir tasarım atölyesi.</h1>
      </header>
      <div className="about-grid">
        <section>
          <h2>Neden küçük seri?</h2>
          <p>Küçük seri üretim; ürünü kullanım geri bildirimine göre geliştirmeye, gereksiz stok oluşturmamaya ve kişiselleştirme seçeneklerini yönetmeye alan açar.</p>
        </section>
        <section>
          <h2>Neden katman izi?</h2>
          <p>3D baskının üretim izini saklamak yerine yüzey karakteri olarak ele alırız. Ancak bu yaklaşım ölçü, dayanım ve kullanım kalitesinden ödün vermek anlamına gelmez.</p>
        </section>
        <section>
          <h2>Ne üretmiyoruz?</h2>
          <p>Telif riski taşıyan karakter kopyaları, sahte lisanslı ürünler veya kullanım amacı açıklanmayan dekoratif dolgu ürünler kataloğa alınmaz.</p>
        </section>
      </div>
      <div className="editorial-cta">
        <span className="eyebrow">ATÖLYEYİ ÜRÜNLERLE TANI</span>
        <Link href="/urunler" className="button button--primary">Mağazayı Aç</Link>
      </div>
    </div>
  );
}
