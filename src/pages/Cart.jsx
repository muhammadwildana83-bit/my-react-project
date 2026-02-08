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
    <div className="cart-container">
      <h2 className="cart-title">Keranjang Belanja</h2>

      {/* Jika keranjang kosong tampilkan pesan dan tombol cari produk */}
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Keranjang masih kosong.</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Cari Produk
          </button>
        </div>
      ) : (
        <>
          {/* Daftar item di keranjang */}
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <div className="cart-item-left">
                  <img
                    src={
                      item.image
                        ? item.image.startsWith("http")
                          ? item.image
                          : `https://backend-project-production-6368.up.railway.app/${item.image}`
                        : "/img/default.png"
                    }
                    alt={item.name}
                    className="cart-img"
                  />

                  <div>
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-qty">Qty: {item.qty}</p>
                    <p className="item-price">
                      Rp {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Tombol hapus item dari keranjang */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-delete"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>

          {/* Total harga keranjang */}
          <div className="cart-total">Total: Rp {total.toLocaleString()}</div>

          {/* Tombol aksi keranjang */}
          <div className="cart-actions">
            <button onClick={clearCart} className="btn-secondary">
              Kosongkan
            </button>

            <button
              onClick={() => navigate("/checkout")}
              className="btn-primary"
            >
              Checkout
            </button>
          </div>

          {/* Tombol lanjut belanja */}
          <button onClick={() => navigate("/")} className="btn-outline">
            Lanjut Belanja
          </button>
        </>
      )}
    </div>
  );
}
