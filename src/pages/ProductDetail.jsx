import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import "./ProductDetail.css";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart(); // <-- ambil cartItems juga
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return <div>Produk tidak ditemukan</div>;

  return (
    <>
      <div
        className="floating-cart"
        onClick={(e) => {
          console.log('clicked')
          navigate("/cart");
        }}
      >
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="count">{cartCount}</span>
      </div>

      <div className="product-detail">
        <div className="detail-header">
          <span className="back-btn" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </span>
        </div>

        <div className="product-left">
          <img src={product.img} alt={product.name} className="main-img" loading="lazy" />
        </div>

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

      <div className="related-section">
        <h2>Produk Terkait</h2>
        <div className="related-scroll">
          {products
            .filter(
              (p) => p.category === product.category && p.id !== product.id
            )
            .map((item) => (
              <div
                className="related-item"
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.img} alt={item.name} loading="lazy" />
                <p>{item.name}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
