"use client";

import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { ProductVisual } from "@/components/product/ProductVisual";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ productId: product.id, color: product.colors[0], size: product.sizes?.[0], quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="product-detail">
      <section className="product-gallery" aria-label={`${product.name} ürün galerisi`}>
        <ProductVisual
          productName={product.name}
          imageLabel={product.images[activeImage]}
          className="product-gallery__main"
          priorityNote="Gerçek fotoğraf sağlandığında bu alan data dosyasındaki görsel yolunu kullanacak."
        />
        <div className="product-gallery__thumbs">
          {product.images.map((image, index) => (
            <button
              type="button"
              key={image}
              onClick={() => setActiveImage(index)}
              aria-pressed={activeImage === index}
              aria-label={`${image} görselini seç`}
            >
              <ProductVisual productName={product.name} imageLabel={image} />
            </button>
          ))}
        </div>
      </section>

      <section className="product-purchase" aria-labelledby="product-title">
        <div className="product-purchase__topline">
          <span>{product.category}</span>
        </div>
        <h1 id="product-title">{product.name}</h1>
        <p className="product-purchase__description">{product.shortDescription}</p>
        <strong className="product-price">{formatCurrency(product.price)}</strong>

        <div className="purchase-row">
          <div className="quantity-control quantity-control--large" aria-label="Adet seçimi">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Adedi azalt">
              <Minus size={17} />
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Adedi artır">
              <Plus size={17} />
            </button>
          </div>
          <button type="button" className="button button--primary purchase-button" onClick={handleAdd}>
            {added ? <Check size={19} /> : <ShoppingBag size={19} />}
            {added ? "Sepete Eklendi" : "Sepete Ekle"}
          </button>
        </div>

        <div className="mobile-purchase-bar">
          <strong>{formatCurrency(product.price * quantity)}</strong>
          <button type="button" className="button button--primary" onClick={handleAdd}>
            Sepete Ekle
          </button>
        </div>
      </section>
    </div>
  );
}
