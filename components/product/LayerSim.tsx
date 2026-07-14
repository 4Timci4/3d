"use client";

import { useEffect, useState } from "react";

// 3D baskı simülasyonu: katmanlar alttan üste, baskı sırasıyla yığılır.
// Dürüst: gerçek ürün fotoğrafı değil, canlı bir şema.
// layers[0] = Taban (en alt, ilk basılan). column-reverse sayede en alta oturur.
const layers = [
  { no: "06", tag: "Taban", text: "İlk katman; yapışma ve taban düzlüğü." },
  { no: "05", tag: "Yapı", text: "Birleşim ve montaj yüzeyleri." },
  { no: "04", tag: "Dolgu", text: "İç dolgu; hafiflik ve mukavemet dengesi." },
  { no: "03", tag: "Duvar", text: "Dış cephe duvarları; taşıyıcı form." },
  { no: "02", tag: "Detay", text: "İnce geometri, kabartma ve yazı." },
  { no: "01", tag: "Üst kapama", text: "Son katman; yüzey düzlüğü ve kapanma." },
];

const total = layers.length;

export function LayerSim() {
  const [built, setBuilt] = useState(0);
  const [playing, setPlaying] = useState(true);

  // prefers-reduced-motion: otomatik oynatma kapalı, dolu göster.
  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPlaying(false);
      setBuilt(total);
    }
  }, []);

  // Döngü: oynatılıyorsa bir sonraki katman; doluysa bekleyip sıfırla.
  useEffect(() => {
    if (!playing) return;
    const full = built >= total;
    const t = setTimeout(() => setBuilt(full ? 0 : built + 1), full ? 1600 : 650);
    return () => clearTimeout(t);
  }, [playing, built]);

  const current = built > 0 ? layers[built - 1] : null;
  const status = !current ? "Bekliyor" : built >= total ? "Tamamlandı" : current.tag;
  const headBottom = `${(built / total) * 100}%`;

  return (
    <section className="layer-sim" aria-labelledby="layer-sim-title">
      <div
        className="layer-sim__chamber"
        role="img"
        aria-label={`Baskı simülasyonu: ${built} / ${total} katman, ${status}.`}
      >
        <span
          className="layer-sim__head"
          aria-hidden="true"
          style={{ bottom: headBottom }}
        />
        {layers.map((layer, i) => {
          const isBuilt = i < built;
          const isActive = playing && i === built - 1;
          return (
            <div
              key={layer.no}
              className={[
                "layer-sim__layer",
                isBuilt ? "is-built" : "",
                isActive ? "is-active" : "",
              ].join(" ").trim()}
            >
              <span>KATMAN {layer.no}</span>
              <span className="layer-sim__layer-tag">{layer.tag}</span>
            </div>
          );
        })}
      </div>

      <aside className="layer-sim__info">
        <span className="eyebrow">3D BASKI SİMÜLASYONU</span>
        <h2 id="layer-sim-title">Bir parça, katman katman kurulur.</h2>
        <p>
          3D baskı bir nesneyi ince katmanlardan kurar. Simülasyon baskı
          sırasını canlı gösterir; gerçek ürün fotoğrafı değil, açıklamalı bir
          şemadır.
        </p>

        <div className="layer-sim__readout" aria-live="polite">
          <span>
            Katman <strong>{Math.min(built, total)}</strong> / {total}
          </span>
          <span>{status}</span>
        </div>
        <div className="layer-sim__bar" aria-hidden="true">
          <span style={{ width: `${(built / total) * 100}%` }} />
        </div>

        <div className="layer-sim__controls">
          <button
            type="button"
            className="button button--secondary"
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? "Beklet" : "Oynat"}
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => {
              setBuilt(0);
              setPlaying(true);
            }}
          >
            Baştan
          </button>
        </div>
      </aside>
    </section>
  );
}
