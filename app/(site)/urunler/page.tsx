import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Ürünler",
  description: "3D baskı masaüstü, ev ve kişiselleştirilebilir ürünleri filtreleyin.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = "", category = "" } = await searchParams;
  return (
    <div className="shell page-shell">
      <header className="page-intro">
        <h1>Ürünler</h1>
        <p>Malzeme, renk ve üretim durumuna göre seçkiyi daraltın.</p>
      </header>
      <ShopClient initialQuery={q} initialCategory={category} />
    </div>
  );
}
