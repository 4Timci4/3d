# Tasarım Spec'i

## Proje

3D yazıcıyla küçük seriler halinde üretilen fiziksel ürünleri sergileyen ve frontend sepet deneyimiyle satışa hazırlayan Türkçe e-ticaret sitesi. Marka adı henüz kesin değil; bütün marka, iletişim ve sosyal medya bilgileri `config/site.ts` dosyasında tutulur.

## Varsayımlar

- Kullanıcı gerçek logo, ürün fotoğrafı, iletişim bilgisi ve yasal metin sağlamadı.
- Marka metni geçici olarak `[MARKA ADI]` kalır.
- Ürün fotoğrafları uydurulmaz. Görsel alanları açıkça etiketlenmiş, düzeni bozmayan dürüst placeholder kullanır.
- Checkout, üyelik, backend, ödeme formu ve sahte sosyal kanıt uygulanmaz.
- Ürün fiyatları başlangıç kataloğunu çalıştırmak için düzenlenebilir örnek değerlerdir.

## Konum Dört Sorusu

1. **Anlatı rolü:** Ana sayfa vitrin ve atölye manifestosu; mağaza karar verme aracı; ürün detayı teknik satış sayfası; sepet görev ekranı.
2. **İzleyici mesafesi:** 10 cm mobil ve 1 m dizüstü öncelikli. Büyük başlıklar geniş fakat mobilde kısa satırlı; gövde en az 16 px.
3. **Görsel sıcaklık:** Sıcak, dokunsal, kontrollü, teknik. Premium ama steril veya lüksçü değil.
4. **Kapasite:** Bölümler kart yığınına dönüşmez. Ürün fotoğrafı alanları geniş; teknik metinler çizgi, kolon ve mono etiketlerle ayrılır.

## Tasarım Sistemi

- Zemin: `#F1DEC4`
- Ticari vurgu: `#BD4444`
- İkincil aksiyon/durum: `#73976A`
- Metin/koyu yüzey: `#677E61`
- Display: Bricolage Grotesque
- Gövde: IBM Plex Sans
- Teknik veri: IBM Plex Mono
- Köşeler: 0–14 px; büyük hap kartlar yok.
- Yüzey: ince katman çizgileri, tabla-grid, mat düz renkler; gradient/glow/glassmorphism yok.
- Hareket: 150–300 ms; yalnızca durum ve yön değişimini anlatır.

## Bilgi Mimarisi

- Ana sayfa
- Ürünler / filtreli mağaza
- Dinamik ürün detayları
- Sepet sayfası + global sepet drawer
- Üretim süreci
- Hakkımızda
- SSS
- İletişim
- Yasal placeholder sayfaları
- 404

## Görsel Asset Durumu

Gerçek ürün fotoğrafları eksik. Her görsel bileşeninde “ürün fotoğrafı bekleniyor” etiketi bulunur. `products.ts` içindeki `images` alanları daha sonra `/public/products/...` yollarıyla değiştirilebilir.

## Bileşen Kullanım Durumu

- `FeaturedShowcase`: Hazır, öne çıkan 5 ürün için interaktif seçki bileşeni. Anasayfa mevcut haliyle sabit kalıyor; bu bileşen ileride anasayfaya veya ayrı bir sayfaya eklenebilir.
- `NewsletterForm`: Anasayfada aktif kullanımda.
- “Hediyelik Ürünler” kategorisi `categories` listesinde tanımlı ancak `products.ts`'de bu kategoride ürün yok.
