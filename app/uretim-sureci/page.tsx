import type { Metadata } from "next";
import Image from "next/image";
import { LayerSim } from "@/components/product/LayerSim";

export const metadata: Metadata = { title: "Üretim Süreci" };

export default function ProductionPage() {
  return (
    <div className="shell page-shell editorial-page production-page">
      <LayerSim />
      <section className="layer-ref" aria-label="Katmanlar örneği">
        <figure className="layer-ref__fig">
          <div className="layer-ref__crop">
            <Image
              src="/katmanlar-ornek.png"
              alt="Katmanların üst üste binerek bir kompozisyon oluşturduğu kağıt örneği."
              fill
              sizes="(max-width: 600px) 100vw, 280px"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                filter: "grayscale(0.6) contrast(1.03) brightness(1.03)",
              }}
            />
            <span className="layer-ref__tint" aria-hidden="true" />
            <span className="layer-ref__badge">ÖRNEK</span>
          </div>
          <figcaption className="layer-ref__cap">
            <span className="eyebrow">ÖRNEK / İLHAM</span>
            <p>
              Katmanların üst üste binme fikri — kağıt örneği. Aynı mantığı 3D
              baskıda, her parçayı katman katman kurarak uyguluyoruz.
            </p>
          </figcaption>
        </figure>
      </section>
      <section className="editorial-note">
        <span className="eyebrow">TOLERANS NOTU</span>
        <h2>Küçük yüzey ve ton farkları üretim sürecinin doğal sonucudur.</h2>
        <p>Katman çizgileri, birleşim izleri ve malzeme tonundaki küçük değişimler kusur gibi gizlenmez; ürün açıklamasında beklenen sınırlar açıkça belirtilir.</p>
      </section>
    </div>
  );
}
