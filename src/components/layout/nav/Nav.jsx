import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <nav className="header-nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/shop">Product</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/blog">Blog</Link>
    </nav>
  );
}
