/* =====================================================
   CART PAGE
   Halaman keranjang belanja, menampilkan dan mengelola item di keranjang
====================================================== */
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

/* =========================
   FUNGSI UTAMA HALAMAN CART
   Menampilkan daftar produk di keranjang dan aksi terkait
========================= */
export default function Cart() {
  /* =========================
     STATE DAN FUNGSI KERANJANG
  ========================= */
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Hitung total harga semua item di keranjang
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  /* =========================
     RENDER HALAMAN KERANJANG
  ========================= */
  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h2 className="cart-title">Your Cart</h2>
          <span className="cart-count">{cartItems.length} Items</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <p>Your cart is currently empty.</p>
            <button onClick={() => navigate("/")} className="btn-primary">
              Explore Products
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item._id} className="cart-item">
                  <div className="cart-item-left">
                    <img
                      src={
                        item.image
                          ? `http://localhost:5000/uploads/${item.image.split("/").pop()}`
                          : "/img/default.png"
                      }
                      alt={item.name}
                      className="cart-img"
                    />
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-price">
                        Rp {item.price.toLocaleString()}
                      </p>
                      <p className="item-qty">Quantity: {item.qty}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn-delete"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="total-section">
                <span>Total Amount:</span>
                <span className="total-amount">
                  Rp {total.toLocaleString()}
                </span>
              </div>

              <div className="cart-actions">
                <button onClick={clearCart} className="btn-clear">
                  Clear All
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="btn-checkout"
                >
                  Checkout Now
                </button>
              </div>

              <button onClick={() => navigate("/")} className="btn-continue">
                <i className="fa-solid fa-arrow-left"></i> Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
