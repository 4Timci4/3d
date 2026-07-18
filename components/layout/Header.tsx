"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { siteConfig } from "@/config/site";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navigation = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Üretim Süreci", href: "/uretim-sureci" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "SSS", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__main shell">
        <Link href="/" className="brand-mark" aria-label={`${siteConfig.name} ana sayfa`} onClick={() => setMenuOpen(false)}>
          <span className="brand-mark__layer" aria-hidden="true" />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Ana navigasyon">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setSearchOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button"
            onClick={() => setSearchOpen((value) => !value)}
            aria-expanded={searchOpen}
            aria-controls="header-search"
            aria-label="Aramayı aç"
          >
            <Search size={21} />
          </button>
          <Link
            href={user ? "/hesabim" : "/giris"}
            className="icon-button"
            aria-label={user ? "Hesabım" : "Giriş yap"}
          >
            <User size={21} />
          </Link>
          <button type="button" className="cart-trigger" onClick={openCart} aria-label={`Sepeti aç, ${itemCount} ürün`}>
            <ShoppingBag size={21} />
            <span>Sepet</span>
            <b aria-live="polite">{itemCount}</b>
          </button>
          <button
            type="button"
            className="icon-button mobile-menu-trigger"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div id="header-search" className="header-search shell">
          <form action="/urunler" role="search">
            <label htmlFor="site-search">Ürün ara</label>
            <input id="site-search" name="q" placeholder="Saksı, düzenleyici, lamba…" autoFocus />
            <button type="submit" className="button button--primary">
              Ara
            </button>
          </form>
        </div>
      ) : null}

      {menuOpen ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobil navigasyon">
          {navigation.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
