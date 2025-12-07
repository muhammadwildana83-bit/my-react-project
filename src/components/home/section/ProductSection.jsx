import { useMemo, useCallback } from "react"; // Import useCallback
import PropTypes from "prop-types"; // Import PropTypes for validation
import ProductCard from "./ProductCard";
import "./ProductSection.css";

/**
 * ProductSection component displays a list of products, filtered by a search term.
 * It also manages the display of a notification for actions like adding to cart.
 */
export default function ProductSection({ products, searchTerm, notif, setNotif }) {
  // 1. Optimized Filtering (already done, but kept robust)
  // Use useMemo to filter products only when 'products' or 'searchTerm' changes.
  const filteredProducts = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    return products.filter((p) => {
      // 1a. Search by product name
      if (p.name.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }
      
      // 1b. Search by product tags (using optional chaining for safety)
      return (p.tags || []).some((tag) =>
        tag.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }, [products, searchTerm]);

  // 2. Optimization: Memoize the setNotif handler for ProductCard
  // This is crucial if ProductCard is memoized (using React.memo) to prevent unnecessary re-renders.
  const handleSetNotif = useCallback((newNotif) => {
    setNotif(newNotif);
  }, [setNotif]);

  return (
    <section className="products section">
      {/* 3. Content Area: Use a relevant heading */}
      <h2>Web Font & Graphic Assets</h2>
      <p className="p-sec">
        Inspirational designs, illustrations, and graphic elements from the
        world’s best designers. Browse our curated search results below.
      </p>

      {/* 4. Display Feedback */}
      {filteredProducts.length === 0 && (
        <p className="no-result">
          <i className="fa-solid fa-triangle-exclamation"></i>
          Produk tidak ditemukan untuk "{searchTerm}"...
        </p>
      )}

      {/* 5. Product List */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            // Pass the memoized handler
            setNotif={handleSetNotif} 
          />
        ))}
      </div>

      {/* 6. Notification Display */}
      {notif.show && (
        <div className={`cart-notif ${notif.show ? "show" : ""}`}>
          {notif.message}
        </div>
      )}
    </section>
  );
}

// 7. Component Robustness: Add PropTypes for type checking
ProductSection.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            name: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string),
        })
    ).isRequired,
    searchTerm: PropTypes.string,
    notif: PropTypes.shape({
        show: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
    }).isRequired,
    setNotif: PropTypes.func.isRequired,
};