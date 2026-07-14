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
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ productId: product.id, color, size, note: note.trim() || undefined, quantity });
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
          <span>{product.stockStatus}</span>
        </div>
        <h1 id="product-title">{product.name}</h1>
        <p className="product-purchase__description">{product.shortDescription}</p>
        <strong className="product-price">{formatCurrency(product.price)}</strong>

        <fieldset className="option-fieldset">
          <legend>Renk</legend>
          <div className="option-grid">
            {product.colors.map((item) => (
              <label key={item} className={color === item ? "is-selected" : ""}>
                <input type="radio" name="color" value={item} checked={color === item} onChange={() => setColor(item)} />
                <span>{item}</span>
                {color === item ? <Check size={16} /> : null}
              </label>
            ))}
          </div>
        </fieldset>

        {product.sizes ? (
          <fieldset className="option-fieldset">
            <legend>Ölçü</legend>
            <div className="option-grid option-grid--sizes">
              {product.sizes.map((item) => (
                <label key={item} className={size === item ? "is-selected" : ""}>
                  <input type="radio" name="size" value={item} checked={size === item} onChange={() => setSize(item)} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {product.customizable ? (
          <div className="form-field">
            <label htmlFor="customization-note">Kişiselleştirme notu</label>
            <textarea
              id="customization-note"
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="İsim, kısa metin veya ölçü notunuzu yazın."
            />
            <small>Üretimden önce detayları iletişim yoluyla doğrularız.</small>
          </div>
        ) : null}

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

        <div className="production-note">
          <span className="eyebrow">ÜRETİM BİLGİSİ</span>
          <p>
            {product.stockStatus}. Tahmini hazırlık süresi <strong>{product.productionTime}</strong>.
          </p>
        </div>

        <div className="product-accordions">
          <details open>
            <summary>Açıklama</summary>
            <p>{product.description}</p>
          </details>
          <details>
            <summary>Teknik bilgiler</summary>
            <dl className="technical-list">
              <div><dt>Malzeme</dt><dd>{product.material}</dd></div>
              <div><dt>Boyutlar</dt><dd>{product.dimensions}</dd></div>
              <div><dt>Ağırlık</dt><dd>{product.weight}</dd></div>
              <div><dt>Katman yüksekliği</dt><dd>{product.layerHeight}</dd></div>
              <div><dt>Kutu içeriği</dt><dd>{product.boxContents}</dd></div>
            </dl>
          </details>
          <details>
            <summary>Bakım</summary>
            <p>{product.care}</p>
          </details>
          <details>
            <summary>Teslimat ve iade</summary>
            <p>Teslimat ve iade koşulları, yasal metinler tamamlandığında bu alana bağlanacaktır.</p>
          </details>
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
