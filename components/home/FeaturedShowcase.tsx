"use client";

import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { ProductVisual } from "@/components/product/ProductVisual";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/product";

export function FeaturedShowcase({ products }: { products: Product[] }) {
  const [selectedId, setSelectedId] = useState(products[0]?.id);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCart();
  const selected = useMemo(
    () => products.find((product) => product.id === selectedId) ?? products[0],
    [products, selectedId],
  );

  if (!selected) return null;

  function handleAdd(product: Product) {
    addItem({
      productId: product.id,
      color: product.colors[0],
      size: product.sizes?.[0],
    });
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 1400);
  }

  return (
    <section className="featured-showcase shell" aria-label="Atölye ürün seçkisi">
      <div className="featured-showcase__stage">
        <div className="featured-showcase__active">
          <ProductVisual
            productName={selected.name}
            imageLabel={selected.images[0]}
            className="featured-showcase__visual"
          />
          <div className="featured-showcase__details">
            <div>
              <span className="eyebrow">{selected.category}</span>
              <h3>{selected.name}</h3>
              <p>{selected.shortDescription}</p>
            </div>
            <div className="featured-showcase__buy">
              <span>{selected.material} · {selected.stockStatus}</span>
              <strong>{formatCurrency(selected.price)}</strong>
              <div>
                <Link href={`/urunler/${selected.slug}`} className="button button--secondary">
                  Ürünü İncele <ArrowRight size={17} />
                </Link>
                <button type="button" className="button button--primary" onClick={() => handleAdd(selected)}>
                  {addedId === selected.id ? <Check size={17} /> : <Plus size={17} />}
                  {addedId === selected.id ? "Eklendi" : "Sepete Ekle"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <ol className="featured-showcase__index" aria-label="Öne çıkan ürünler">
          {products.map((product, index) => (
            <li key={product.id}>
              <button
                type="button"
                className={product.id === selected.id ? "is-active" : ""}
                onClick={() => setSelectedId(product.id)}
                onMouseEnter={() => setSelectedId(product.id)}
                onFocus={() => setSelectedId(product.id)}
                aria-pressed={product.id === selected.id}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{product.name}</strong>
                <small>{formatCurrency(product.price)}</small>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
