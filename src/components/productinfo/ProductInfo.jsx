import "./ProductInfo.css";

const ProductInfo = ({ product }) => {
  const formatPrice = (p) => {
    if (p == null) return "Price not available";
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(p);
    } catch (err) {
      console.warn("Price format failed", err);
      return `$${p}`;
    }
  };

  return (
    <div className="product-info-card">
      <div className="product-header">
        <h1 className="product-name">{product?.name}</h1>

        <div className="product-price">{formatPrice(product?.price)}</div>
      </div>

      <div className="gold-separator" />

      {product?.shortDescription && (
        <p className="product-desc">{product.shortDescription}</p>
      )}

      <div className="product-meta">
        {product?.sku && <span className="meta-item">SKU: {product.sku}</span>}
        {product?.category && <span className="meta-item">{product.category}</span>}
        {product?.tags && (
          <span className="meta-item">{product.tags.slice(0,3).join(", ")}</span>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
