import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = { title: "Sepet" };

export default function CartPage() {
  return <div className="shell page-shell"><CartPageClient /></div>;
}
