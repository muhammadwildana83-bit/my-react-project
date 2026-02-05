/* =====================================================
   CHECKOUT PAGE
===================================================== */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../api/axios";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    payment: "transfer",
  });
  const [isLoading, setIsLoading] = useState(false);

  /* =========================
     HITUNG TOTAL
  ========================= */
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const isDisabled =
    !form.name || !form.email || !form.whatsapp || cartItems.length === 0;

  const formatPrice = (price) =>
    price.toLocaleString("id-ID");

  /* =========================
     SUBMIT ORDER (FINAL)
  ========================= */
  const handleSubmit = async () => {
    try {
       if (isDisabled) return;
      const orderPayload = {
        customer: {
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          paymentMethod: form.payment,
        },
        items: cartItems.map((item) => ({
          productId: item._id,   // ✅ backend expects productId
          quantity: item.qty,     // ✅ backend expects quantity
        })),
        totalPrice,
      };

      console.log("ORDER PAYLOAD:", orderPayload);

      const res = await API.post("/orders", orderPayload);

      console.log("ORDER RESPONSE:", res.data);

      clearCart();

      // ✅ redirect ke halaman sukses
      navigate(`/order-success/${res.data.data._id}`);
    } catch (error) {
      console.error("Gagal membuat order:", error);
      alert("Gagal membuat order ❌");
    }
  };

  /* =========================
     CART KOSONG
  ========================= */
  if (cartItems.length === 0) {
    return (
      <div className="checkout-wrapper">
        <h2>Your cart is empty 🛒</h2>
      </div>
    );
  }

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="checkout-wrapper">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-grid">
        {/* LEFT */}
        <div className="checkout-left">
          <h2 className="section-title">Billing Details</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>WhatsApp</label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) =>
                setForm({ ...form, whatsapp: e.target.value })
              }
            />
          </div>

          <h3 className="section-subtitle">Payment Method</h3>

          <div className="payment-grid">
            {["gopay", "ovo", "dana", "transfer"].map((method) => (
              <div
                key={method}
                className={`payment-card ${
                  form.payment === method ? "active" : ""
                }`}
                onClick={() =>
                  setForm({ ...form, payment: method })
                }
              >
                {method.toUpperCase()}
              </div>
            ))}
          </div>

          <button
            className="btn-primary full-btn"
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Place Order
          </button>
        </div>

        {/* RIGHT */}
        <div className="checkout-right">
          <div className="summary-card">
            <h2 className="section-title">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item._id} className="summary-item">
                <span>{item.name}</span>
                <span>
                  {item.qty} × Rp {formatPrice(item.price)}
                </span>
              </div>
            ))}

            <div className="summary-total">
              <span>Total</span>
              <span>Rp {formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
