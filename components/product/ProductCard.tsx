"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { ProductVisual } from "@/components/product/ProductVisual";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      productId: product.id,
      color: product.colors[0],
      size: product.sizes?.[0],
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="product-card">
      <Link href={`/urunler/${product.slug}`} className="product-card__visual-link">
        <ProductVisual productName={product.name} />
      </Link>
      <div className="product-card__body">
        <Link href={`/urunler/${product.slug}`} className="product-card__title">
          {product.name}
        </Link>
        <div className="product-card__footer">
          <strong>{formatCurrency(product.price)}</strong>
          <button
            type="button"
            className="icon-text-button"
            onClick={handleAdd}
            aria-label={`${product.name} ürününü sepete ekle`}
          >
            {added ? <Check size={18} /> : <Plus size={18} />}
            {added ? "Eklendi" : "Sepete Ekle"}
          </button>
        </div>
      </div>
    </article>
  );
}
