import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { ProductVisual } from "@/components/product/ProductVisual";
import { categories } from "@/data/products";

const productionSteps = [
  { number: "01", title: "Tasarım", text: "Form, kullanım senaryosu ve üretilebilirlik birlikte değerlendirilir." },
  { number: "02", title: "Malzeme seçimi", text: "Parçanın kullanımına göre PLA veya PETG tercih edilir." },
  { number: "03", title: "3D baskı", text: "Katman yüksekliği ve doluluk ayarları ürüne özel belirlenir." },
  { number: "04", title: "Kalite kontrol", text: "Yüzey, birleşim, ölçü ve kullanım testi tamamlanır." },
  { number: "05", title: "Paketleme", text: "Ürün korunur; bakım ve kullanım notlarıyla hazırlanır." },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero shell">
        <div className="home-hero__copy">
          <span className="eyebrow">BAĞIMSIZ TASARIM / KÜÇÜK SERİ ÜRETİM</span>
          <h1>Katman katman tasarlandı. Senin için üretildi.</h1>
          <p>Küçük seriler halinde üretilen, işlevsel ve kişiselleştirilebilir 3D baskı ürünler.</p>
          <div className="button-row">
            <Link className="button button--primary" href="/urunler">
              Ürünleri İncele <ArrowRight size={18} />
            </Link>
            <Link className="button button--secondary" href="/uretim-sureci">
              Nasıl Üretiyoruz?
            </Link>
          </div>
        </div>
        <ProductVisual
          productName="Modüler Masaüstü Düzenleyici"
          imageLabel="büyük hero fotoğrafı"
          className="home-hero__visual"
          priorityNote="Gerçek ürün fotoğrafı sağlanana kadar dürüst placeholder."
        />
        <dl className="hero-specs">
          <div><dt>Üretim</dt><dd>Küçük seri</dd></div>
          <div><dt>Malzeme</dt><dd>PLA / PETG</dd></div>
          <div><dt>Yaklaşım</dt><dd>İşlev + karakter</dd></div>
        </dl>
        <div className="home-categories home-hero__cat-row" aria-labelledby="home-categories-title">
          <header>
            <h2 id="home-categories-title">Neye yer açıyoruz?</h2>
          </header>
          <nav aria-label="Ürün kategorileri">
            {categories.map((category, index) => (
              <Link href={`/urunler?category=${encodeURIComponent(category)}`} key={category}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{category}</strong>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="workshop-ledger">
        <div className="shell">
          <header className="workshop-ledger__header">
            <div className="workshop-ledger__header-title">
              <span className="eyebrow" style={{ color: "var(--green)" }}>ÜRETİM SÜRECİ</span>
              <h2>Ekrandaki modelden<br />elde tutulan ürüne.</h2>
            </div>
            <div className="workshop-ledger__header-meta">
              <p>Tasarım, malzeme ve baskı kararı aynı bütünün parçaları.</p>
              <Link href="/uretim-sureci" className="text-link">
                Süreci ayrıntılı incele <ArrowRight size={16} />
              </Link>
            </div>
          </header>

          <div className="workshop-ledger__body">
            <ol className="workshop-ledger__steps">
              {productionSteps.map((step) => (
                <li key={step.number} className="workshop-ledger__step">
                  <span className="workshop-ledger__step-num">{step.number}</span>
                  <div className="workshop-ledger__step-content">
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <aside className="workshop-ledger__notes" aria-label="Malzeme ve kişiselleştirme notları">
              <article className="workshop-ledger__note">
                <span className="eyebrow">MALZEME / PLA</span>
                <h3>İç mekân ve detaylı yüzeyler</h3>
                <p>Hassas baskı, pürüzsüz yüzey. Masa üstü ve dekoratif ürünler için ideal.</p>
              </article>
              <article className="workshop-ledger__note">
                <span className="eyebrow">MALZEME / PETG</span>
                <h3>Daha dayanıklı günlük kullanım</h3>
                <p>Nem ve darbeye karşı dayanıklı. Işığa maruz kalan veya yoğun kullanılan parçalar için.</p>
              </article>
              <article className="workshop-ledger__note workshop-ledger__note--custom">
                <span className="eyebrow">SANA GÖRE</span>
                <h3>Bazı parçalar sabit değil.</h3>
                <p>Renk, ölçü veya kısa metin seçenekleri.</p>
                <Link href="/urunler?category=Kişiselleştirilebilir%20Ürünler" className="workshop-ledger__note-link">
                  Kişiselleştirilebilir ürünler <ArrowRight size={15} />
                </Link>
              </article>
            </aside>
          </div>
        </div>
      </section>

      <section className="newsletter-strip">
        <div className="shell newsletter-strip__grid">
          <div>
                        <h2>Yeni küçük seri hazır olduğunda haber verelim.</h2>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
