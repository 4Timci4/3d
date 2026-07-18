"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/format";

export function CartDrawer() {
  const { items, isCartOpen, closeCart, openCheckout } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const subtotal = items.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.productId);
    return sum + (product?.price ?? 0) * line.quantity;
  }, 0);

  useEffect(() => {
    if (!isCartOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [closeCart, isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="drawer-layer" role="presentation">
      <button className="drawer-backdrop" type="button" onClick={closeCart} aria-label="Sepeti kapat" />
      <aside
        ref={panelRef}
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="cart-drawer__header">
          <div>
            <span className="eyebrow">ALIŞVERİŞ SEPETİ</span>
            <h2 id="cart-drawer-title">Sepetiniz</h2>
          </div>
          <button ref={closeRef} type="button" className="icon-button" onClick={closeCart} aria-label="Sepeti kapat">
            <X size={22} />
          </button>
        </div>

        {items.length ? (
          <>
            <div className="cart-drawer__items">
              {items.map((line) => (
                <CartLineItem line={line} compact key={line.key} />
              ))}
            </div>
            <div className="cart-drawer__summary">
              <div>
                <span>Ara toplam</span>
                <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <p>Kargo ve teslimat bilgisi sipariş öncesinde netleştirilir.</p>
              <button type="button" className="button button--primary button--full" onClick={openCheckout}>
                Ödemeye Geç <ArrowRight size={18} />
              </button>
              <Link href="/sepet" className="button button--secondary button--full" onClick={closeCart}>
                Sepet Sayfasını Aç
              </Link>
            </div>
          </>
        ) : (
          <div className="empty-state cart-drawer__empty">
            <ShoppingBag size={34} strokeWidth={1.4} />
            <span className="eyebrow">SEPET</span>
            <h3>Sepetiniz boş</h3>
            <p>Beğendiğiniz ürünleri sepete ekleyin; burada görünecek.</p>
            <Link href="/urunler" className="button button--primary" onClick={closeCart}>
              Ürünleri İncele →
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
