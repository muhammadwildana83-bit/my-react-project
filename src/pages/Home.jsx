/* =====================================================
  HOME PAGE
  Halaman utama, menampilkan produk, hero, marquee, dan footer
====================================================== */
import { useEffect, useState } from "react";

import Header from "../components/layout/header/Header";
import ProductSection from "../components/home/section/ProductSection";
import Hero from "../components/home/hero/Hero";
import Marquee from "../components/home/marquee/Marquee";
import Footer from "../components/layout/footer/Footer";
import API from "../api/axios"; // Import API dengan baseURL yang sudah diatur

export default function Home({ searchTerm, setSearchTerm }) {
  /* =========================
     STATE
  ========================= */
  const [products, setProducts] = useState([]);
  const [notif, setNotif] = useState({ show: false, message: "" });

  /* =========================
     FETCH DATA PRODUK
  ========================= */
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      console.log("DATA BACKEND:", res.data);

      if (res.data.success && Array.isArray(res.data.data)) {
        setProducts(res.data.data); // ✅ ARRAY
      } else {
        setProducts([]); // safety
      }
    } catch (error) {
      console.error("Gagal ambil produk:", error);
      setProducts([]);
    }
  };

  fetchProducts();
}, []);


  /* =========================
     RENDER
  ========================= */
  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ProductSection
        products={products}
        searchTerm={searchTerm || ""}
        notif={notif}
        setNotif={setNotif}
      />

      <Hero />
      <Marquee />
      <Footer />
    </>
  );
}
