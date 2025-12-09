import "./ProductInfo.css";

const ProductInfo = ({ product }) => {
  return (
    <>
      <h1 className="product-name-Aksaratiga">{product.name}</h1>

      <div className="gold-separator"></div>

      <p className="price-aksaratiga">
        {product.price
          ? `$${product.price.toLocaleString("en-US")}`
          : "Price not available"}
      </p>
    </>
  );
};

export default ProductInfo;
