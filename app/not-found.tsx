import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell not-found-page">
      <span className="not-found-page__code">404</span>
      <div>
        <span className="eyebrow">KATMAN BULUNAMADI</span>
        <h1>Bu sayfa baskı tablasında yok.</h1>
        <p>Bağlantı değişmiş veya sayfa kaldırılmış olabilir.</p>
        <Link href="/" className="button button--primary">Ana Sayfaya Dön</Link>
      </div>
    </div>
  );
}
