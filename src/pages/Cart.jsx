import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 700, margin: "3rem auto", padding: 24, background: "#fff", borderRadius: 18 }}>
      <h2>Keranjang Belanja</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Keranjang kosong.</p>
          <button onClick={() => navigate("/")}>Kembali ke Home</button>
        </div>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
                <img src={item.img} alt={item.name} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, marginRight: 18 }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: 0 }}>Qty: {item.qty}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 12 }}>Hapus</button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart} style={{ marginRight: 16 }}>Kosongkan Keranjang</button>
          <button onClick={() => navigate("/")}>Lanjut Belanja</button>
        </>
      )}
    </div>
  );
}
