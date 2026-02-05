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
        
        <h1>Order Berhasil!</h1>
        <p>Pesananmu sudah masuk sistem dan sedang kami siapkan.</p>

        {/* Badge Order ID */}
        <div className="order-id-badge">
          Order ID: <strong>{id}</strong>
        </div>

        {/* Tombol dengan class btn-home */}
        <button className="btn-home" onClick={() => navigate("/")}>
          Kembali ke Home
        </button>
      </div>
    </div>
  );
}