import type { Metadata } from "next";
import { notFound } from "next/navigation";

const policies: Record<string, { title: string; description: string }> = {
  "mesafeli-satis": { title: "Mesafeli Satış", description: "İşletme bilgileri ve satış koşulları sağlandığında tamamlanacak yasal metin alanı." },
  gizlilik: { title: "Gizlilik Politikası", description: "Veri sorumlusu, çerez ve form servisleri kesinleştiğinde tamamlanacak yasal metin alanı." },
  iade: { title: "İade Politikası", description: "Ürün türleri, kişiselleştirme kapsamı ve geçerli mevzuata göre tamamlanacak yasal metin alanı." },
};

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: policies[slug]?.title ?? "Politika" };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();
  return (
    <div className="shell page-shell narrow-page legal-page">
      <span className="eyebrow">YASAL METİN PLACEHOLDER’I</span>
      <h1>{policy.title}</h1>
      <p>{policy.description}</p>
      <div className="legal-placeholder">
        <strong>Yayına alma öncesi gerekli:</strong>
        <ul>
          <li>Gerçek işletme unvanı, adresi ve vergi bilgileri</li>
          <li>Teslimat, cayma, iade ve kişiselleştirilmiş ürün koşulları</li>
          <li>Kullanılan ödeme, analitik, çerez ve form servisleri</li>
          <li>Yetkili hukuk danışmanı onayı</li>
        </ul>
      </div>
    </div>
  );
}
