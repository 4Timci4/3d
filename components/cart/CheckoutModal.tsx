"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart/CartProvider";

export function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout } = useCart();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isCheckoutOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeCheckout();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [closeCheckout, isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  return (
    <div className="modal-layer" role="presentation">
      <button className="modal-backdrop" type="button" onClick={closeCheckout} aria-label="Bilgi penceresini kapat" />
      <div
        ref={dialogRef}
        className="checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
        aria-describedby="checkout-modal-description"
      >
        <button ref={closeRef} type="button" className="icon-button checkout-modal__close" onClick={closeCheckout} aria-label="Kapat">
          <X size={22} />
        </button>
        <span className="eyebrow">ÖDEME BİLGİSİ</span>
        <h2 id="checkout-modal-title">Online ödeme yakında</h2>
        <p id="checkout-modal-description">
          Online ödeme altyapımız yakında aktif olacak. Sipariş vermek için şimdilik bizimle iletişime geçebilirsiniz.
        </p>
        <div className="checkout-modal__actions">
          <button type="button" className="button button--secondary" onClick={closeCheckout}>
            Alışverişe Devam Et
          </button>
          <Link href="/iletisim" className="button button--primary" onClick={closeCheckout}>
            İletişime Geç
          </Link>
        </div>
      </div>
    </div>
  );
}
