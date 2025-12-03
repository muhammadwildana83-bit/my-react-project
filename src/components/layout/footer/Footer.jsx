
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img
            src="https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1j3t5flapg4rc5e7458g7veuc.png"
            alt="Logo"
          />
          <h2>Aksara Tiga</h2>
        </div>

        <div className="footer-menu">
           <Link to="/">Home</Link>
           <Link to="/about">About</Link>
           <Link to="/shop">Product</Link>
           <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-social">
          <a
            href="https://facebook.com/namaakunmu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="https://instagram.com/namaakunmu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://twitter.com/namaakunmu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="https://behance.com/namaakunmu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-behance"></i>
          </a>
        </div>
      </div>

      <p className="footer-copy">
        &copy;2025 Aksara Tiga. We use cookies to improve your experience on our
        website. By browsing this website, you agree to use our cookies.
      </p>
    </footer>
  );
}

export default Footer;
