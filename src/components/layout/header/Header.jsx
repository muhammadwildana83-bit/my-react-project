import { Link } from "react-router-dom";
import "./Header.css";
import { useCart } from "../../../context/CartContext";
import Nav from "../nav/Nav";

function Header({ searchTerm, setSearchTerm }) {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <div className="header-overlay">
        <div className="header-logo">
          <img
            src="https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1j3t5flapg4rc5e7458g7veuc.png"
            alt="Aksara Tiga Logo"
          />
          <h1>Aksara Tiga</h1>
        </div>

        <Nav />
      </div>

      <div className="header-search">
        <input
          type="text"
          placeholder=" "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="placeholder-bubble">Search products…</span>
      </div>
    </header>
  );
}

export default Header;
