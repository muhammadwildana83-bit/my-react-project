import { Link } from "react-router-dom";
import "./Header.css";
import Nav from "../nav/Nav";
import { useEffect, useState } from "react";

function Header({ searchTerm, setSearchTerm }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="header">
      <div className={`header-overlay ${scrolled ? "header-overlay--scrolled" : ""}`}>
        <Link to="/" className="header-logo" style={{ textDecoration: "none" }}>
          <img
            src="https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1j3t5flapg4rc5e7458g7veuc.png"
            alt="Aksara Tiga Logo"
          />
          <h1>Aksara Tiga</h1>
        </Link>

        <Nav />

        <button
          className="header-search-toggle"
          onClick={() => setSearchOpen(true)}
          aria-label="Open search"
        >
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#ffffff' }}></i>
        </button>
      </div>

      <div
        className={`search-popup-overlay ${searchOpen ? "active" : ""}`}
        onClick={() => setSearchOpen(false)}
      >
        <div className="search-popup" onClick={(e) => e.stopPropagation()}>
          <button
            className="search-popup-close"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            <i className="fa-solid fa-xmark"  style={{ color: '#ffffff' }}></i>
          </button>

          <h2>Search products</h2>
          <p>Find fonts, assets, and design resources instantly.</p>

          <input
            type="text"
            autoFocus
            placeholder="Type product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
