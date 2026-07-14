"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";

export function CartPageClient() {
  const { items, clearCart, openCheckout } = useCart();
  const subtotal = items.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.productId);
    return sum + (product?.price ?? 0) * line.quantity;
  }, 0);

  if (!items.length) {
    return (
      <div className="empty-state cart-page-empty">
        <ShoppingBag size={44} strokeWidth={1.3} />
        <span className="eyebrow">SEPET / 00</span>
        <h1>Henüz bir parça seçmediniz.</h1>
        <p>Mağazadaki işlevsel ürünleri inceleyin; seçimleriniz bu cihazda korunur.</p>
        <Link href="/urunler" className="button button--primary">Ürünleri İncele</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-layout">
      <section className="cart-page-items" aria-labelledby="cart-page-title">
        <div className="cart-page-heading">
          <div>
            <span className="eyebrow">SEPET / {String(items.length).padStart(2, "0")}</span>
            <h1 id="cart-page-title">Seçtiğiniz ürünler</h1>
          </div>
          <button type="button" className="text-button" onClick={clearCart}>Sepeti temizle</button>
        </div>
        {items.map((line) => <CartLineItem line={line} key={line.key} />)}
      </section>
      <aside className="order-summary" aria-label="Sipariş özeti">
        <span className="eyebrow">SİPARİŞ ÖZETİ</span>
        <dl>
          <div><dt>Ara toplam</dt><dd>{formatCurrency(subtotal)}</dd></div>
          <div><dt>Kargo</dt><dd>Sipariş öncesi netleşir</dd></div>
          <div className="order-summary__total"><dt>Toplam</dt><dd>{formatCurrency(subtotal)}</dd></div>
        </dl>
        <button type="button" className="button button--primary button--full" onClick={openCheckout}>
          Ödemeye Geç <ArrowRight size={18} />
        </button>
        <p>Bu buton ödeme almaz; mevcut sipariş yöntemini açıklayan bilgi penceresini açar.</p>
      </aside>
    </div>
  );
}
