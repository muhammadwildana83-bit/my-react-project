import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

// PAGES
import Home from "./pages/Home";
import About from "./components/home/about/About";
import ProductDetail from "./pages/productdetail/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/productdetail/OrderSuccess";
import Login from "./pages/admin/LoginAdmin";
import Register from "./pages/admin/Register";

// ADMIN PAGES
import AddProduct from "./pages/admin/AddProduct";
import AdminProducts from "./pages/admin/AdminProducts";
import EditProduct from "./pages/admin/EditProduct";

// COMPONENT ADMIN
import AdminLayout from "./components/admin/AdminLayout";

// CONTEXT
import { CartProvider } from "./context/CartContext";

function AppWrapper() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // 🔐 SATPAM UTAMA (dibaca ulang tiap render)
  const isAuthenticated = Boolean(localStorage.getItem("adminToken"));

  // 🔁 Fix URL .html (AMAN)
  useEffect(() => {
    const path = window.location.pathname;
    if (path.endsWith(".html")) {
      navigate(path.replace(".html", ""), { replace: true });
    }
  }, [navigate]);

  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route
        path="/"
        element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success/:id" element={<OrderSuccess />} />

      {/* ================= ADMIN ================= */}

      {/* /admin → dashboard */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/products" replace />}
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin/products"
        element={
          isAuthenticated ? (
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />

      <Route
        path="/admin/add-product"
        element={
          isAuthenticated ? (
            <AdminLayout>
              <AddProduct />
            </AdminLayout>
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />

      <Route
        path="/admin/edit-product/:id"
        element={
          isAuthenticated ? (
            <AdminLayout>
              <EditProduct />
            </AdminLayout>
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />

      {/* LOGIN */}
      <Route
        path="/admin/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/products" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* REGISTER */}
      <Route path="/admin/register" element={<Register />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppWrapper />
      </CartProvider>
    </BrowserRouter>
  );
}

console.log("Cek Jembatan API:", import.meta.env.VITE_API_URL);