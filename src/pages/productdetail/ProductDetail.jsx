import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import API from "../../api/axios";

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
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState("Standard License");
  const [quantity, setQuantity] = useState(1);

  const backendUrl = "https://backend-project-production-6368.up.railway.app";

  // ================= FETCH DATA =================
  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/products/${id}`);
        const productData = res?.data?.data;

        if (!productData) {
          setProduct(null);
          return;
        }

        setProduct(productData);

        const fotoUtama =
          productData.image ||
          (productData.gallery?.length ? productData.gallery[0] : "");

        setMainImage(fotoUtama);
      } catch (err) {
        console.error("Gagal narik data:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getDetail();
  }, [id]);

  // ================= GALLERY =================
  const galleryList = useMemo(() => {
    if (!product) return [];

    const list = [];

    if (product.image) list.push(product.image);

    if (Array.isArray(product.gallery)) {
      product.gallery.forEach((img) => list.push(img));
    }

    return [...new Set(list)];
  }, [product]);

  // ================= HANDLERS =================
  const handleImageLoad = useCallback(() => setImgLoaded(true), []);

  const handleThumbnailClick = useCallback((img) => {
    setMainImage(img);
    setImgLoaded(false);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart(product, quantity);
    navigate("/cart");
  }, [addToCart, product, quantity, navigate]);

  // ================= RENDER =================
  return (
    <>
      <div className="product-page-container">
        <div className="detail-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>

        <main className="product-detail">
          {loading && <div className="product-loading">Loading product...</div>}

          {!loading && !product && (
            <div className="product-detail-not-found">
              <h1>Produk tidak ditemukan</h1>
              <button onClick={() => navigate(-1)}>Kembali</button>
            </div>
          )}

          {!loading && product && (
            <>
              <div className="product-left">
                <div className="main-image-viewport">
                  <MainImage
                    mainImage={mainImage}
                    imgLoaded={imgLoaded}
                    handleImageLoad={handleImageLoad}
                  />

                  <Gallery
                    gallery={galleryList}
                    mainImage={mainImage}
                    handleThumbnailClick={handleThumbnailClick}
                  />
                </div>
              </div>

              <div className="product-right">
                <ProductInfo product={product} />

                <LicenseOptions
                  options={[
                    "Standard License",
                    "Webfont License",
                    "Digital License",
                  ]}
                  selectedLicense={selectedLicense}
                  setSelectedLicense={setSelectedLicense}
                />

                <div className="action-area">
                  <QuantityControls
                    quantity={quantity}
                    onChange={(d) =>
                      setQuantity((q) => Math.max(1, q + d))
                    }
                  />
                  <AddToCartButton onClick={handleAddToCart} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
