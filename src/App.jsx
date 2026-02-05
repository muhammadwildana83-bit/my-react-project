/* =====================================================
   APP.JSX
   Komponen root aplikasi
   - Mengatur routing (React Router)
   - Membungkus Context global (Cart)
====================================================== */

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

/* =========================
   IMPORT HALAMAN & KOMPONEN
========================= */
import Home from "./pages/Home";
import About from "./components/home/about/About";
import ProductDetail from "./pages/productdetail/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/productdetail/OrderSuccess";

/* =========================
   ADMIN PAGES
========================= */
import AddProduct from "./pages/admin/AddProduct";
import AdminProducts from "./pages/admin/AdminProducts";
import EditProduct from "./pages/admin/EditProduct";

/* =========================
   CONTEXT
   CartProvider dipakai agar cart bisa diakses global
========================= */
import { CartProvider } from "./context/CartContext";

/* =====================================================
   APP WRAPPER
   - Harus terpisah karena useNavigate
   - Mengatur semua routing aplikasi
====================================================== */
function AppWrapper() {
  const navigate = useNavigate();

  /* =========================
     STATE SEARCH
     Dipakai di Home (search produk)
  ========================= */
  const [searchTerm, setSearchTerm] = useState("");

  /* =========================
     HANDLE URL .html
     - Kadang hosting / refresh lempar ke *.html
     - Ini auto redirect ke versi tanpa .html
  ========================= */
  useEffect(() => {
    const path = window.location.pathname;
    if (path.endsWith(".html")) {
      navigate(path.replace(".html", ""), { replace: true });
    }
  }, [navigate]);

  /* =========================
     ROUTING UTAMA
  ========================= */
  return (
    <Routes>
      {/* HOME
          - searchTerm & setter dikirim agar search jalan */}
      <Route
        path="/"
        element={
          <Home
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        }
      />

      {/* HALAMAN USER */}
      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success/:id" element={<OrderSuccess />} />

      {/* HALAMAN ADMIN */}
      <Route path="/admin/add-product" element={<AddProduct />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/edit-product/:id" element={<EditProduct />} />

      {/* FALLBACK
          - Jika route tidak ditemukan, redirect ke Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/* =====================================================
   APP ROOT
   - BrowserRouter: enable routing
   - CartProvider: global cart state
====================================================== */
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppWrapper />
      </CartProvider>
    </BrowserRouter>
  );
}
