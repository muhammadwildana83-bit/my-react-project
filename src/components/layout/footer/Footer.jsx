import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img
              src="https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1j3t5flapg4rc5e7458g7veuc.png"
              alt="Logo Aksara Tiga"
            />
            <div>
              <h2>Aksara Tiga</h2>
              <p>Minimal, refined products with thoughtful craftsmanship for modern living.</p>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <nav className="footer-menu">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact Us</Link>
          </nav>
        </div>

        <div className="footer-contact">
          <h3>Connect</h3>
          <p className="contact-line">hello@aksaratiga.com</p>
          <p className="contact-line">+62 812 3456 7890</p>
          <div className="footer-social">
            <a href="https://facebook.com/namaakunmu" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/_aksaratiga/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://twitter.com/namaakunmu" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://behance.net/namaakunmu" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-behance"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} <strong>Aksara Tiga</strong>. Designed for calm, modern shopping.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
