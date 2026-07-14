# Bilgi Mimarisi ve Component Yapısı

## Akış

`Ana Sayfa → Mağaza/Filtre → Ürün Detayı → Sepet Drawer/Sepet Sayfası → Checkout Bilgi Modalı`

Destek içerikleri header ve footer üzerinden üretim süreci, hakkımızda, SSS, iletişim ve yasal placeholder sayfalarına bağlanır.

## Katmanlar

- `config/site.ts`: marka, duyuru, iletişim, sosyal bağlantılar, yasal bağlantılar
- `data/products.ts`: sekiz ürün ve bütün filtrelenebilir alanlar; "Hediyelik Ürünler" kategorisi henüz ürün içermiyor
- `components/cart/*`: localStorage sepet state'i, drawer, modal, satır bileşenleri
- `components/product/*`: ürün görsel placeholder'ı, kart ve detay etkileşimleri
- `components/shop/*`: arama, sıralama, masaüstü/mobil filtreler, boş sonuç
- `components/home/*`: `NewsletterForm` (anasayfada kullanımda), `FeaturedShowcase` (öne çıkan 5 ürünlü interaktif seçki — mevcut anasayfada kullanılmıyor, hazır bileşen)
- `components/layout/*`: duyuru, header, mobil menü, footer
- `app/*`: App Router sayfaları ve metadata

## Sonradan Bağlanacak Sınırlar

- `CartProvider` ödeme veya üyelik servisine bağlı değil.
- Checkout butonu yalnızca erişilebilir bilgi modalı açar.
- Marka adı ve iletişim tek config dosyasından değişir.
- Görsel yolları ürün data dosyasından değiştirilir.
