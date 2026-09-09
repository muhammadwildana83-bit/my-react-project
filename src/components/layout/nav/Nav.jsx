import { Link } from "react-router-dom";
import "./Nav.css";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <Link to="/" onClick={() => setOpen(false)}>Home</Link>
      <Link to="/about" onClick={() => setOpen(false)}>About</Link>
      <Link to="/shop" onClick={() => setOpen(false)}>Product</Link>
      <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
    </>
  );

  return (
    <div className="nav-wrapper">
      <button
        className={`nav-toggle ${open ? "is-open" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="hamburger" />
      </button>

      <nav className={`header-nav ${open ? "is-open" : ""}`}>{links}</nav>

      {/* Mobile panel overlay */}
      <div
        className={`mobile-nav-overlay ${open ? "active" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
          <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">
            ×
          </button>
          {links}
        </div>
      </div>
    </div>
  );
}
