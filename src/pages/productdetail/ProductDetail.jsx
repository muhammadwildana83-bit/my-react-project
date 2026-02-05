import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import MainImage from "../../components/mainimage/MainImage";
import Gallery from "../../components/gallery/Gallery";
import LicenseOptions from "../../components/licenseoption/LicenseOptions";
import QuantityControls from "../../components/quantitycontrols/QuantityControls";
import AddToCartButton from "../../components/addtocartbutton/AddToCartButton";
import ProductInfo from "../../components/productinfo/ProductInfo";
import Footer from "../../components/layout/footer/Footer";

import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  // ================= STATE =================
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState("Standard License");
  const [quantity, setQuantity] = useState(1);

  // ================= FETCH =================
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          setProduct(res.data);
          setMainImage(
            res.data.image
              ? `http://localhost:5000/${res.data.image}`
              : "/img/default.png",
          );
        } else {
          setProduct(null);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  // ================= DERIVED DATA (HARUS DI ATAS) =================
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
  }, [cartItems]);

  const gallery = [];

  // ================= HANDLERS =================
  const handleImageLoad = useCallback(() => setImgLoaded(true), []);
  const handleThumbnailClick = useCallback((img) => {
    setMainImage(img);
    setImgLoaded(false);
  }, []);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = useCallback(() => {
    addToCart(product, quantity);
    navigate("/cart");
  }, [addToCart, product, quantity, navigate]);

  const navigateBack = useCallback(() => navigate(-1), [navigate]);

  // ================= EARLY RETURN (SETELAH SEMUA HOOK) =================
  if (loading) {
    return <p style={{ padding: 40 }}>Loading product...</p>;
  }

  if (!product) {
    return (
      <div className="product-detail-not-found">
        <h1>Produk tidak ditemukan</h1>
        <button onClick={navigateBack}>Kembali</button>
      </div>
    );
  }

  // ================= RENDER =================
  return (
    <>
      <div className="detail-header">
        <span className="back-btn" onClick={navigateBack}>
          <i className="fa-solid fa-arrow-left"></i>
        </span>
      </div>

      <div className="product-detail">
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

        <div className="product-right">
          <ProductInfo product={product} />

          <LicenseOptions
            options={[
              "Standard License",
              "Webfont License",
              "Digital License",
              "App/Game License",
              "Extended License",
            ]}
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

      <Footer />
    </>
  );
};

export default ProductDetail;
