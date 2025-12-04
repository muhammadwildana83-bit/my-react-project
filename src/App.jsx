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

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  // Tambahkan route lain di sini jika perlu
];

function AppWrapper() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    if (path.endsWith(".html")) {
      navigate(path.replace(".html", ""), { replace: true });
    }
  }, [navigate]);

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
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
