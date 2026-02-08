import { useParams, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="order-container">
      <div className="order-card">
        {/* Lingkaran Hijau & Centang */}
        <div className="icon-box">
          <span className="icon-check">✓</span>
        </div>
        
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase. Your order ID is</p>

        {/* Badge Order ID */}
        <div className="order-id-badge">
          Order ID: <strong>{id}</strong>
        </div>

        {/* Tombol dengan class btn-home */}
        <button className="btn-home" onClick={() => navigate("/")}>
         Back to Home
        </button>
      </div>
    </div>
  );
}