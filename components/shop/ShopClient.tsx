"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { categories, colorOptions, materials, products } from "@/data/products";

type ShopClientProps = {
  initialQuery?: string;
  initialCategory?: string;
};

type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "popular";

export function ShopClient({ initialQuery = "", initialCategory = "" }: ShopClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [stockOnly, setStockOnly] = useState(false);
  const [customizableOnly, setCustomizableOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    const result = products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        [product.name, product.shortDescription, product.category, product.material]
          .join(" ")
          .toLocaleLowerCase("tr-TR")
          .includes(normalizedQuery);
      const matchesCategory = !category || product.category === category;
      const matchesMaterial = !material || product.material === material;
      const matchesColor = !color || product.colors.includes(color);
      const matchesPrice = product.price <= maxPrice;
      const matchesStock = !stockOnly || product.stockStatus === "Stokta";
      const matchesCustom = !customizableOnly || product.customizable;
      return matchesQuery && matchesCategory && matchesMaterial && matchesColor && matchesPrice && matchesStock && matchesCustom;
    });

    return [...result].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "newest") return b.id.localeCompare(a.id);
      if (sort === "popular") return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "tr");
      return Number(b.featured) - Number(a.featured);
    });
  }, [category, color, customizableOnly, material, maxPrice, query, sort, stockOnly]);

  const activeFilterCount = [category, material, color, stockOnly, customizableOnly, maxPrice < 1500].filter(Boolean).length;

  function clearFilters() {
    setCategory("");
    setMaterial("");
    setColor("");
    setMaxPrice(1500);
    setStockOnly(false);
    setCustomizableOnly(false);
  }

  const filterContent = (prefix: string) => (
    <>
      <div className="filter-group">
        <label htmlFor={`${prefix}-filter-category`}>Kategori</label>
        <select id={`${prefix}-filter-category`} value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">Tüm kategoriler</option>
          {categories.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor={`${prefix}-filter-material`}>Malzeme</label>
        <select id={`${prefix}-filter-material`} value={material} onChange={(event) => setMaterial(event.target.value)}>
          <option value="">Tüm malzemeler</option>
          {materials.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor={`${prefix}-filter-color`}>Renk</label>
        <select id={`${prefix}-filter-color`} value={color} onChange={(event) => setColor(event.target.value)}>
          <option value="">Tüm renkler</option>
          {colorOptions.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor={`${prefix}-filter-price`}>En yüksek fiyat: {maxPrice.toLocaleString("tr-TR")} TL</label>
        <input
          id={`${prefix}-filter-price`}
          type="range"
          min="250"
          max="1500"
          step="50"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
        />
      </div>
      <label className="check-row">
        <input type="checkbox" checked={stockOnly} onChange={(event) => setStockOnly(event.target.checked)} />
        <span>Yalnızca stokta</span>
      </label>
      <label className="check-row">
        <input
          type="checkbox"
          checked={customizableOnly}
          onChange={(event) => setCustomizableOnly(event.target.checked)}
        />
        <span>Kişiselleştirilebilir</span>
      </label>
      <button type="button" className="text-button" onClick={clearFilters} disabled={!activeFilterCount}>
        Aktif filtreleri temizle
      </button>
    </>
  );

  return (
    <div className="shop-layout">
      <aside className="shop-filters" aria-label="Ürün filtreleri">
        <div className="shop-filters__title">
          <span className="eyebrow">FİLTRELER</span>
          <b>{activeFilterCount}</b>
        </div>
        {filterContent("desktop")}
      </aside>

      <section className="shop-results" aria-live="polite">
        <div className="shop-toolbar">
          <div className="shop-search">
            <label htmlFor="shop-search">Ürün ara</label>
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ürün adı veya malzeme"
            />
          </div>
          <button
            type="button"
            className="button button--secondary mobile-filter-button"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal size={18} /> Filtreler {activeFilterCount ? `(${activeFilterCount})` : ""}
          </button>
          <div className="sort-control">
            <label htmlFor="sort">Sırala</label>
            <select id="sort" value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
              <option value="featured">Öne çıkanlar</option>
              <option value="price-asc">Fiyat: düşükten yükseğe</option>
              <option value="price-desc">Fiyat: yüksekten düşüğe</option>
              <option value="newest">En yeniler</option>
              <option value="popular">Popülerlik</option>
            </select>
          </div>
        </div>

        <div className="results-count">
          <strong>{filteredProducts.length}</strong> ürün bulundu
        </div>

        {filteredProducts.length ? (
          <div className="product-grid product-grid--shop">
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state empty-state--results">
            <span className="eyebrow">SONUÇ YOK</span>
            <h2>Bu ölçütlerde ürün bulunamadı.</h2>
            <p>Arama ifadesini kısaltın veya filtrelerden birini kaldırın.</p>
            <button type="button" className="button button--primary" onClick={clearFilters}>
              Filtreleri Temizle
            </button>
          </div>
        )}
      </section>

      {mobileFiltersOpen ? (
        <div className="drawer-layer mobile-filter-layer" role="presentation">
          <button className="drawer-backdrop" type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Filtreleri kapat" />
          <aside className="mobile-filter-drawer" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title">
            <div className="cart-drawer__header">
              <h2 id="mobile-filter-title">Filtreler</h2>
              <button type="button" className="icon-button" onClick={() => setMobileFiltersOpen(false)} aria-label="Filtreleri kapat">
                <X size={22} />
              </button>
            </div>
            <div className="mobile-filter-drawer__body">{filterContent("mobile")}</div>
            <button type="button" className="button button--primary button--full" onClick={() => setMobileFiltersOpen(false)}>
              {filteredProducts.length} Ürünü Göster
            </button>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
