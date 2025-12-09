import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./components/home/about/About";
import ProductDetail from "./pages/productdetail/ProductDetail";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";

function AppWrapper() {
  const navigate = useNavigate();

  // 🔥 SearchTerm harus didefinisikan di sini
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    if (path.endsWith(".html")) {
      navigate(path.replace(".html", ""), { replace: true });
    }
  }, [navigate]);

  return (
    <Routes>
      {/* 🔥 Kirim searchTerm ke Home */}
      <Route
        path="/"
        element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      />

      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />

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
