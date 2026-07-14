"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { ProductVisual } from "@/components/product/ProductVisual";
import { useCart, type CartLine } from "@/components/cart/CartProvider";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";

export function CartLineItem({ line, compact = false }: { line: CartLine; compact?: boolean }) {
  const { removeItem, updateQuantity } = useCart();
  const product = products.find((item) => item.id === line.productId);
  if (!product) return null;

  return (
    <article className={`cart-line ${compact ? "cart-line--compact" : ""}`}>
      <ProductVisual productName={product.name} imageLabel="sepet küçük görseli" />
      <div className="cart-line__content">
        <div>
          <h3>{product.name}</h3>
          <p>
            {line.color}
            {line.size ? ` · ${line.size}` : ""}
          </p>
          {line.note ? <p className="cart-line__note">Not: {line.note}</p> : null}
        </div>
        <div className="cart-line__actions">
          <div className="quantity-control" aria-label={`${product.name} adet seçimi`}>
            <button
              type="button"
              onClick={() => updateQuantity(line.key, line.quantity - 1)}
              aria-label="Adedi azalt"
            >
              <Minus size={16} />
            </button>
            <span aria-live="polite">{line.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(line.key, line.quantity + 1)}
              aria-label="Adedi artır"
            >
              <Plus size={16} />
            </button>
          </div>
          <strong>{formatCurrency(product.price * line.quantity)}</strong>
          <button
            type="button"
            className="remove-button"
            onClick={() => removeItem(line.key)}
            aria-label={`${product.name} ürününü sepetten çıkar`}
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
