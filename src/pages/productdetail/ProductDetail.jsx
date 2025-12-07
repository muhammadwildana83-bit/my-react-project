import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../../data/products";
import { useCart } from "../../context/CartContext";

// COMPONENTS
import MainImage from "../mainimage/MainImage";
import Gallery from "../gallery/Gallery";
import LicenseOptions from "../licenseoption/LicenseOptions";
import QuantityControls from "../quantitycontrols/QuantityControls";
import AddToCartButton from "../addtocartbutton/AddToCartButton";
import ProductInfo from "../productinfo/ProductInfo";

// CSS
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  // Product
  const product = useMemo(
    () => products.find((p) => p.id === parseInt(id)),
    [id]
  );

  if (!product) {
    return (
      <div className="product-detail-not-found">
        <h1>Produk tidak ditemukan</h1>
        <button onClick={() => navigate(-1)}>Kembali</button>
      </div>
    );
  }

  // States
  const [mainImage, setMainImage] = useState(product.mainImg);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState("Standard License");
  const [quantity, setQuantity] = useState(1);

  const gallery = Array.isArray(product.gallery) ? product.gallery : [];

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );

  // Handlers
  const handleImageLoad = useCallback(() => setImgLoaded(true), []);
  const handleThumbnailClick = useCallback((img) => {
    setMainImage(img);
    setImgLoaded(false);
  }, []);

  const navigateToCart = useCallback(() => navigate("/cart"), [navigate]);
  const navigateBack = useCallback(() => navigate(-1), [navigate]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

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
      <div className="product-detail">
        {/* HEADER (hidden by CSS) */}
        <div className="detail-header">
          <span className="back-btn" onClick={navigateBack}>
            <i className="fa-solid fa-arrow-left"></i>
          </span>
        </div>

        {/* LEFT SIDE */}
        <div className="product-left">
          <MainImage
            mainImage={mainImage}
            imgLoaded={imgLoaded}
            handleImageLoad={handleImageLoad}
          />

          <Gallery
            gallery={gallery}
            mainImage={mainImage}
            handleThumbnailClick={handleThumbnailClick}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="product-right">

          <ProductInfo product={product} />

          <LicenseOptions
            options={licenseOptions}
            selectedLicense={selectedLicense}
            setSelectedLicense={setSelectedLicense}
          />

          <div className="cart-controls">
            <QuantityControls
              quantity={quantity}
              onChange={handleQuantityChange}
            />

            <AddToCartButton onClick={handleAddToCart} />
          </div>
        </div>

      </div>
    </>
  );
};

export default ProductDetail;
