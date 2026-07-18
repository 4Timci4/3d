import type { Metadata } from "next";
import FaqList from "./FaqList";

export const metadata: Metadata = { title: "Sık Sorulan Sorular" };

const faqs = [
  ["Ürünler hazır stokta mı?", "Bazı ürünler stokta, bazıları sipariş üzerine üretilir. Durum her ürün kartında ve detay sayfasında belirtilir."],
  ["Kişiselleştirme nasıl çalışıyor?", "Uygun ürünlerde renk, ölçü veya kısa metin seçebilirsiniz. Üretimden önce notunuzu iletişim yoluyla doğrularız."],
  ["Üretim ne kadar sürer?", "Ürüne göre değişir. Tahmini süre ürün detayında düzenlenebilir bir alan olarak gösterilir."],
  ["PLA ve PETG arasındaki fark nedir?", "PLA iç mekân ve detaylı yüzeylerde; PETG ise daha dayanıklı işlevsel parçalarda tercih edilir. Kesin seçim ürünün kullanımına bağlıdır."],
  ["Online ödeme yapabilir miyim?", "Henüz değil. Ödemeye geç butonu mevcut sipariş yöntemini açıklayan bilgi penceresini açar; kart bilgisi istemez."],
  ["İade koşulları nedir?", "Yasal iade metni henüz placeholder durumunda. Yayına alınmadan önce işletme bilgileri ve geçerli mevzuata göre tamamlanmalıdır."],
];

export default function FaqPage() {
  return (
    <div className="shell page-shell narrow-page">
      <header className="page-intro">
        <span className="eyebrow">SSS</span>
        <h1>Siparişten malzemeye, sık sorulanlar.</h1>
      </header>
      <FaqList faqs={faqs} />
    </div>
  );
}