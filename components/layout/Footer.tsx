import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div className="site-footer__brand">
          <span className="eyebrow">KÜÇÜK SERİ / YEREL ÜRETİM</span>
          <h2>{siteConfig.name}</h2>
          <p>{siteConfig.description}</p>
        </div>
        <div>
          <h3>Keşfet</h3>
          <Link href="/urunler">Ürünler</Link>
          <Link href="/uretim-sureci">Üretim Süreci</Link>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/sss">SSS</Link>
        </div>
        <div>
          <h3>İletişim</h3>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
          <span>{siteConfig.address}</span>
        </div>
        <div>
          <h3>Politikalar</h3>
          {siteConfig.legal.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <span>3D baskı katmanları görünür bırakıldı.</span>
      </div>
    </footer>
  );
}
