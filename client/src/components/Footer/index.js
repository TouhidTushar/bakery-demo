import "./style.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="fLeft">
          <Link to="/" className="fLogo">
            <em>Bakery</em>
          </Link>
          <ul className="fCont">
            <li>
              <Link to="/" className="fContLink">
                <i className="fab fa-facebook-square"></i>
              </Link>
            </li>
            <li>
              <Link to="/" className="fContLink">
                <i className="fab fa-instagram"></i>
              </Link>
            </li>
            <li>
              <Link to="/" className="fContLink">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link to="/" className="fContLink">
                <i className="fab fa-youtube"></i>
              </Link>
            </li>
            <li>
              <Link to="/" className="fContLink">
                <i className="fas fa-phone-square-alt"></i>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="nav">
          <li>
            <Link to="/" className="fNav">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="fNav">
              Cakes
            </Link>
          </li>
          <li>
            <Link to="/about" className="fNav">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="fNav">
              Contact
            </Link>
          </li>
        </ul>
        <ul className="extras">
          <li>
            <Link to="/contact#location" className="fExtras">
              Locations
            </Link>
          </li>
          <li>
            <Link to="/about#FAQ" className="fExtras">
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/about#terms-conditions" className="fExtras">
              Terms & conditions
            </Link>
          </li>
          <li>
            <Link to="/about#privacy-policy" className="fExtras">
              Privacy policy
            </Link>
          </li>
        </ul>
        <div className="bonus">
          <Link to="/customOrder" className="bLink">
            Custom Order
          </Link>
          <Link to="/" className="bLink">
            Gift & Rewards
          </Link>
        </div>
      </section>
      <section className="license">
        <p>
          Copyright <i className="far fa-copyright"></i> All rights reserved
          2021
        </p>
      </section>
    </>
  );
};

export default Footer;
