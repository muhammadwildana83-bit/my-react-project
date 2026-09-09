import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "./ProductSection.css";

export default function ProductSection({ products = [], searchTerm = "" }) {
  // ================= STATE =================
  const [notif, setNotif] = useState({ show: false, message: "" });
  const timeoutRef = useRef(null);

  // ================= SAFE FILTER =================
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    const term = String(searchTerm || "").toLowerCase().trim();
    if (!term) return products;
    return products.filter((p) => p?.name?.toLowerCase().includes(term));
  }, [products, searchTerm]);

  // ================= NOTIFICATION HELPERS =================
  const showNotif = useCallback((message, duration = 3000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setNotif({ show: true, message });
    timeoutRef.current = setTimeout(() => {
      setNotif({ show: false, message: "" });
      timeoutRef.current = null;
    }, duration);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // expose a simple setter for child usage (keeps API same as before)
  const handleSetNotif = useCallback((payload) => {
    if (!payload) return;
    if (typeof payload === "string") showNotif(payload);
    else showNotif(payload.message || "", payload.duration || 3000);
  }, [showNotif]);

  return (
    <section className="products section clay">
      <h2>Web Font & Graphic Assets</h2>
      <p className="p-sec">
        Inspirational designs, illustrations, and graphic elements from the
        world’s best designers. Browse our curated search results below.
      </p>

      {/* ================= NO RESULT ================= */}
      {filteredProducts.length === 0 && (
        <p className="no-result">
          <i className="fa-solid fa-triangle-exclamation" /> Produk tidak ditemukan untuk "{searchTerm}"...
        </p>
      )}

      {/* ================= PRODUCT LIST ================= */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={product}
            setNotif={handleSetNotif}
          />
        ))}
      </div>

      {/* ================= NOTIFICATION ================= */}
      <div className={`cart-notif ${notif.show ? "show" : ""}`} aria-live="polite">
        {notif.message}
      </div>
    </section>
  );
}

// ================= PROPTYPES =================
ProductSection.propTypes = {
  products: PropTypes.array,
  searchTerm: PropTypes.string,
};

// ================= DEFAULT PROPS =================
ProductSection.defaultProps = {
  products: [],
  searchTerm: "",
};
