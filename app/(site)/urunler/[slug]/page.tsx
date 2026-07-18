import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { ProductCard } from "@/components/product/ProductCard";
import { getProductBySlug, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.shortDescription };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3);
  const fallbackRelated = related.length >= 2 ? related : products.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <div className="shell page-shell product-page">
      <ProductDetailClient product={product} />
      <section className="related-products" aria-labelledby="related-title">
        <div className="section-heading">
          <span className="eyebrow">BİRLİKTE DÜŞÜNÜLEBİLİR</span>
          <h2 id="related-title">Benzer ürünler</h2>
        </div>
        <div className="product-grid product-grid--related">
          {fallbackRelated.map((item) => <ProductCard product={item} key={item.id} />)}
        </div>
      </section>
    </div>
  );
}
