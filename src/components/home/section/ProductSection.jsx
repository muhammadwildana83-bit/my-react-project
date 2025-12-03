import { useMemo } from "react";
import ProductCard from "./ProductCard";
import "./ProductSection.css";

export default function ProductSection({ products, searchTerm, notif, setNotif }) {
  // Filter produk hanya saat products atau searchTerm berubah
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.tags || []).some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [products, searchTerm]);

  return (
    <section className="products section">
      <h2>Web Font</h2>
      <p className="p-sec">
        inspirational designs, illustrations, and graphic elements from the
        world’s best designers. Want more inspiration? Browse our search
        results..
      </p>

      {filteredProducts.length === 0 && (
        <p className="no-result">Produk tidak ditemukan...</p>
      )}

      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setNotif={setNotif} // gunakan satu state notif di parent
          />
        ))}
      </div>

      {notif.show && <div className="cart-notif show">{notif.message}</div>}
    </section>
  );
}
