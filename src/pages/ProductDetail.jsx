import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import "./ProductDetail.css";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return <div>Produk tidak ditemukan</div>;

  const [mainImage, setMainImage] = useState(product.mainImg);
  const [imgLoaded, setImgLoaded] = useState(false);

  const gallery = Array.isArray(product.gallery) ? product.gallery : [];

  return (
    <>
      {/* Floating Cart */}
      <div className="floating-cart" onClick={() => navigate("/cart")}>
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="count">{cartCount}</span>
      </div>

      <div className="product-detail">
        <div className="detail-header">
          <span className="back-btn" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </span>
        </div>

        {/* LEFT SIDE */}
        <div
          className="product-left"
          style={{ position: "relative", minHeight: 320 }}
        >
          {!imgLoaded && (
            <div className="img-skeleton-loader">Loading gambar...</div>
          )}

          <img
            src={mainImage}
            alt={product.name}
            className="main-img"
            style={imgLoaded ? {} : { visibility: "hidden" }}
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="product-right">
          <h1>{product.name}</h1>

          <p className="description">
            {product.description || "Deskripsi produk..."}
          </p>

          <button className="btn add-btn" onClick={() => addToCart(product)}>
            Tambah ke Keranjang
          </button>
        </div>
      </div>

      {/* GALLERY */}
      {gallery.length > 0 && (
        <div className="gallery-section">
          <h2>Preview Tampilan</h2>
          <div className="gallery-scroll">
            {gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                className="gallery-thumb"
                alt={`preview-${i}`}
                onClick={() => {
                  setMainImage(img);
                  setImgLoaded(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
