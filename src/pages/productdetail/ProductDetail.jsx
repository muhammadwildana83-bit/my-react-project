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
  const { cartItems, addToCart } = useCart();

  // ================= STATE =================
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState("Standard License");
  const [quantity, setQuantity] = useState(1);

  // Alamat Backend (Hardcoded biar aman di deploy maupun lokal)
  const backendUrl = "https://backend-project-production-6368.up.railway.app";

  // ================= FETCH DATA =================
  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/products/${id}`);
        if (res.data.success) {
          const data = res.data.data;
          setProduct(data);

          // Set Foto Utama saat pertama kali load
          const fotoUtama = data.image
            ? data.image.startsWith("http")
              ? data.image
              : `${backendUrl}/${data.image}`
            : "/placeholder.png";

          setMainImage(fotoUtama);
        }
      } catch (err) {
        console.error("Gagal narik data:", err);
      } finally {
        setLoading(false);
      }
    };
    getDetail();
  }, [id]);

  // ================= LOGIKA GALLERY (BIAR MUNCUL BERJEJER) =================
  const galleryList = useMemo(() => {
    if (!product) return [];
    let list = [];

    // 1. Masukkan foto utama ke gallery
    const mainUrl = product.image
      ? product.image.startsWith("http")
        ? product.image
        : `${backendUrl}/${product.image}`
      : "";
    if (mainUrl) list.push(mainUrl);

    // 2. Masukkan array gallery dari backend jika ada
    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach((img) => {
        const url = img.startsWith("http") ? img : `${backendUrl}/${img}`;
        list.push(url);
      });
    }

    // Hapus duplikat URL
    return [...new Set(list)];
  }, [product]);

  // ================= HANDLERS =================
  const handleImageLoad = useCallback(() => setImgLoaded(true), []);

  const handleThumbnailClick = useCallback((img) => {
    setMainImage(img);
    setImgLoaded(false); // Reset loading state biar skeleton main image muncul bentar
  }, []);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart(product, quantity);
    navigate("/cart");
  }, [addToCart, product, quantity, navigate]);

  const navigateBack = useCallback(() => navigate(-1), [navigate]);

  // ================= EARLY RETURN =================
  if (loading)
    return (
      <p style={{ padding: 40, textAlign: "center" }}>Loading product...</p>
    );
  if (!product)
    return (
      <div
        className="product-detail-not-found"
        style={{ padding: 40, textAlign: "center" }}
      >
        <h1>Produk tidak ditemukan</h1>
        <button onClick={navigateBack}>Kembali</button>
      </div>
    );

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
          <div className="product-left">
            {/* BUNGKUS KEDUANYA DI SINI */}
            <div className="main-image-viewport">
              <MainImage
                mainImage={mainImage}
                imgLoaded={imgLoaded}
                handleImageLoad={handleImageLoad}
              />

              {/* Gallery sekarang satu rumah dengan foto gede */}
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
              ]} // Kirim Array-nya di sini!
              selectedLicense={selectedLicense}
              setSelectedLicense={setSelectedLicense}
            />
            <div className="action-area">
              <QuantityControls
                quantity={quantity}
                onChange={(d) => setQuantity((q) => Math.max(1, q + d))}
              />
              <AddToCartButton onClick={() => addToCart(product, quantity)} />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
