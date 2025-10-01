import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div id="rt-sticky-placeholder" />
        <div id="header-menu" className="header-menu menu-layout1">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-2">
                <div className="temp-logo">
                  <a href="index.html">
                    <img src="media/logo.png" alt="Logo" />
                  </a>
                </div>
              </div>
              <div className="col-xl-6 col-lg-7 col-sm-7 col-8 d-flex justify-content-xl-start justify-content-center">
                <div className="mobile-nav-item hide-on-desktop-menu">
                  <div className="mobile-toggler">
                    <button type="button" className="mobile-menu-toggle">
                      <i className="icofont-navigation-menu" />
                    </button>
                  </div>
                  <div className="mobile-logo">
                    <a href="index.html">
                      <img src="media/mobile_logo.png" alt="Logo" />
                    </a>
                  </div>
                </div>
                <nav id="dropdown" className="template-main-menu">
                  <button
                    type="button"
                    className="mobile-menu-toggle mobile-toggle-close"
                  >
                    <i className="icofont-close" />
                  </button>
                  <ul className="menu-content">
                    <li className="header-nav-item">
                      <a href="index.html" className="menu-link active">
                        Home
                      </a>
                    </li>
                    <li className="header-nav-item">
                      <a href="about.html" className="menu-link">
                        About Us
                      </a>
                    </li>
                    <li className="header-nav-item">
                      <a href="services.html" className="menu-link">
                        Services
                      </a>
                    </li>
                    <li className="header-nav-item">
                      <a href="blog.html" className="menu-link">
                        Blog
                      </a>
                    </li>
                    <li className="header-nav-item">
                      <a href="contact.html" className="menu-link">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-xl-4 col-lg-3 col-sm-5 col-4 d-flex justify-content-end">
                <div className="header-action">
                  <ul>
                    <li className="header-social">
                      <a href="#">
                        <i className="icofont-facebook" />
                      </a>
                      <a href="#">
                        <i className="icofont-twitter" />
                      </a>
                      <a href="#">
                        <i className="icofont-linkedin" />
                      </a>
                      <a href="#">
                        <i className="icofont-pinterest" />
                      </a>
                      <a href="#">
                        <i className="icofont-skype" />
                      </a>
                    </li>
                    
                    <li className="login-btn">
                      <Link to="/login" className="item-btn">
                        <i className="fas fa-user" />
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
