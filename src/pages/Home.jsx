import React, { useState } from "react";
import Header from "../components/layout/header/Header";
import ProductSection from "../components/home/section/ProductSection";
import Hero from "../components/home/hero/Hero";
import Marquee from "../components/home/marquee/Marquee";
import Footer from "../components/layout/footer/Footer";
import productsData from "../data/products";

export default function Home({ cartCount, setCartCount, searchTerm, setSearchTerm }) {
  const [products] = useState(productsData);
  const [notif, setNotif] = useState({ show: false, message: "" });

  return (
    <>
      <Header
        cartCount={cartCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ProductSection
        products={products}
        searchTerm={searchTerm}
        notif={notif}
        setNotif={setNotif}
      />

      <Hero />
      <Marquee />
      <Footer />
    </>
  );
}
