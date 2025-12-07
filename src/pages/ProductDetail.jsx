import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import "./ProductDetail.css";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  // 1. Data Retrieval and Memoization
  const product = useMemo(
    () => products.find((p) => p.id === parseInt(id)),
    [id]
  );

  // Early return if product is not found
  if (!product) {
    return (
      <div className="product-detail-not-found">
        <h1>Produk tidak ditemukan</h1>
        <button onClick={() => navigate(-1)}>Kembali</button>
      </div>
    );
  }

  // 2. State Initialization
  const [mainImage, setMainImage] = useState(product.mainImg);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState("Standard License");
  const [quantity, setQuantity] = useState(1);

  const gallery = Array.isArray(product.gallery) ? product.gallery : [];

  // 3. Optimized Cart Count Calculation
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );

  // 4. Optimized Image Handlers
  const handleImageLoad = useCallback(() => {
    setImgLoaded(true);
  }, []);

  const handleThumbnailClick = useCallback((imgSrc) => {
    setMainImage(imgSrc);
    setImgLoaded(false);
  }, []);

  // 5. Optimized Navigation Handlers
  const navigateToCart = useCallback(() => navigate("/cart"), [navigate]);
  const navigateBack = useCallback(() => navigate(-1), [navigate]);

  // Quantity Handler
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // Add to Cart
  const handleAddToCart = useCallback(
    () => addToCart(product, quantity),
    [addToCart, product, quantity]
  );

  const licenseOptions = [
    "Standard License",
    "Webfont License",
    "Digital License",
    "App/Game License",
    "Extended License",
  ];

  return (
    <>
      {/* 🚀 Floating Cart */}
      <div className="floating-cart" onClick={navigateToCart}>
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="count">{cartCount}</span>
      </div>

      <div className="product-detail">
        <div className="detail-header">
          {/* back-btn disembunyikan via CSS */}
          <span className="back-btn" onClick={navigateBack}>
            <i className="fa-solid fa-arrow-left"></i>
          </span>
        </div>

        {/* LEFT SIDE */}
        <div className="product-left">
          <div className="main-img-container">
            {/* Skeleton loader */}
            {!imgLoaded && (
              <div className="img-skeleton-loader">
                <i className="fa-solid fa-image"></i>
                <span>Loading gambar...</span>
              </div>
            )}

            {/* Main Image */}
            <img
              src={mainImage}
              alt={product.name}
              className="main-img"
              style={{ opacity: imgLoaded ? 1 : 0 }}
              onLoad={handleImageLoad}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "placeholder-image-url-here";
                handleImageLoad();
              }}
            />
          </div>

          {/* GALLERY */}
          {gallery.length > 0 && (
            <div className="gallery-section">
              <div className="gallery-scroll">
                {gallery.map((imgSrc, i) => (
                  <img
                    key={i}
                    src={imgSrc}
                    className={`gallery-thumb ${
                      imgSrc === mainImage ? "active" : ""
                    }`}
                    onClick={() => handleThumbnailClick(imgSrc)}
                    alt={`${product.name} preview ${i + 1}`}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="product-right">
          <h1 className="product-name-hayatica">{product.name}</h1>

          <div className="gold-separator"></div>

          <p className="price price-aksaratiga">
            {product.price
              ? `$${product.price.toLocaleString("en-US")}`
              : "$15"}
          </p>

          {/* License Options */}
          <div className="license-options-container">
            <p className="license-type-heading">
              <span className="required-star">*</span> License Type
            </p>

            {licenseOptions.map((license, index) => (
              <label key={index} className="license-option-item">
                <input
                  type="radio"
                  name="license"
                  value={license}
                  checked={selectedLicense === license}
                  onChange={(e) => setSelectedLicense(e.target.value)}
                />
                {license}
              </label>
            ))}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="cart-controls-aksaratiga">
            <div className="quantity-control-aksaratiga">
              <button
                className="qty-btn-hayatica"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>

              <input
                type="text"
                readOnly
                value={quantity}
                className="qty-input-aksaratiga"
              />

              <button
                className="qty-btn-aksaratiga"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>

            <button
              className="add-btn add-to-cart-aksaratiga"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
