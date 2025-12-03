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
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/CartContext";

import Cart from "./pages/Cart";

function AppWrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path.endsWith(".html")) {
      navigate(path.replace(".html", ""), { replace: true });
    }
  }, [navigate]);

  const [searchTerm, setSearchTerm] = useState("");
  // Hapus cartCount, gunakan dari context

  return (
    <Routes>
      {/* HOME */}
      <Route
        path="/"
        element={
          <Home
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        }
      />

      {/* ABOUT */}
      <Route
        path="/about"
        element={<About />}
      />

      {/* PRODUCT DETAIL */}
      <Route
        path="/product/:id"
        element={<ProductDetail />}
      />

        {/* CART */}
      <Route path="/cart" element={<Cart />} />

      {/* REDIRECT UNKNOWN ROUTES */}
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
