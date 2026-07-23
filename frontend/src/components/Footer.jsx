import "./Footer.css";

import Logo from "../assets/img/logo/ellipse.svg";

import { Link } from "react-router";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-column">
        <div className="logo">
          <Link to="/">
            EduTrack
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="social-icons">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
      </div>
      <div className="footer-column footer-column-links">
        <h4>Links</h4>
        <Link to="/">Home</Link>
        <Link to="#">Courses</Link>
        <Link to="#">About</Link>
        <Link to="#">Contact</Link>
      </div>
      <div className="footer-column footer-column-links">
        <h4>Other</h4>
        <Link to="#">Our Team</Link>
        <Link to="#">Career</Link>
        <Link to="#">Services</Link>
      </div>
      <div className="footer-column footer-contact">
        <div>
          <i className="fa-solid fa-location-arrow"></i>
          <span>Kolaghat, East Midnapore, 721134</span>
        </div>
        <div>
          <i className="fa-solid fa-phone"></i>
          <span>+91 9876543210</span>
        </div>
        <div>
          <i className="fa-regular fa-envelope"></i>
          <span>info@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
