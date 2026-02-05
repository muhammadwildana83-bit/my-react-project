import { useMemo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "./ProductSection.css";

export default function ProductSection({ products = [], searchTerm = "" }) {
  // ================= STATE =================
  const [notif, setNotif] = useState({ show: false, message: "" });

  // ================= SAFE FILTER =================
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    const lowerSearchTerm = searchTerm.toLowerCase();

    return products.filter((p) =>
      p?.name?.toLowerCase().includes(lowerSearchTerm)
    );
  }, [products, searchTerm]);

  // ================= HANDLER =================
  const handleSetNotif = useCallback((newNotif) => {
    setNotif(newNotif);
  }, []);

  return (
    <section className="products section">
      <h2>Web Font & Graphic Assets</h2>
      <p className="p-sec">
        Inspirational designs, illustrations, and graphic elements from the
        world’s best designers. Browse our curated search results below.
      </p>

      {/* ================= NO RESULT ================= */}
      {filteredProducts.length === 0 && (
        <p className="no-result">
          <i className="fa-solid fa-triangle-exclamation"></i>
          Produk tidak ditemukan untuk "{searchTerm}"...
        </p>
      )}

      {/* ================= PRODUCT LIST ================= */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            setNotif={handleSetNotif}
          />
        ))}
      </div>

      {/* ================= NOTIFICATION ================= */}
      {notif.show && <div className="cart-notif show">{notif.message}</div>}
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
