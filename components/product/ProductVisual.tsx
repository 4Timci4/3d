type ProductVisualProps = {
  productName: string;
  imageLabel?: string;
  className?: string;
  priorityNote?: string;
};

export function ProductVisual({
  productName,
  imageLabel = "ana görünüm",
  className = "",
  priorityNote,
}: ProductVisualProps) {
  return (
    <div
      className={`product-visual ${className}`}
      role="img"
      aria-label={`${productName} için ${imageLabel} ürün fotoğrafı placeholder'ı`}
    >
      <div className="product-visual__axis" aria-hidden="true" />
      <div className="product-visual__content">
        <span className="eyebrow">ÜRÜN FOTOĞRAFI BEKLENİYOR</span>
        <strong>{productName}</strong>
        <span>{imageLabel}</span>
        {priorityNote ? <small>{priorityNote}</small> : null}
      </div>
      <span className="product-visual__index" aria-hidden="true">
        0.20
      </span>
    </div>
  );
}
