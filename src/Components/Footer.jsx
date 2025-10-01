import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer-wrap">
        <div className="main-footer">
          <div className="container">
            <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1">
              {/* Logo + About */}
              <div className="col">
                <div className="footer-box">
                  <div className="footer-logo">
                    <Link to="/">
                      <img src="media/logo_dark.png" alt="Logo" />
                    </Link>
                  </div>
                  <p>
                    Dorem ipsum dolor sit amet consec adipisicing elit sed do
                    eiusmod por incidiut labore et loreLorem ipsum kelly amieo
                    dolorey.
                  </p>
                </div>
              </div>

              {/* Important Links */}
              <div className="col d-flex justify-content-lg-center">
                <div className="footer-box">
                  <h3 className="footer-title">Important Links</h3>
                  <div className="footer-link">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about-us">About us</Link>
                      </li>
                      <li>
                        <Link to="/blog">Blog</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contacts</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col d-flex justify-content-lg-center">
                <div className="footer-box">
                  <h3 className="footer-title">Quick Links</h3>
                  <div className="footer-link">
                    <ul>
                      <li>
                        <Link to="/why-choose-us">Why Choose Us</Link>
                      </li>
                      <li>
                        <Link to="/how-it-works">How It Works</Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/terms">Terms & Conditions</Link>
                      </li>
                      <li>
                        <Link to="/support">Support</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Followers (External Links - keep <a>) */}
              <div className="col d-flex justify-content-lg-center">
                <div className="footer-box">
                  <h3 className="footer-title">Followers</h3>
                  <div className="footer-link">
                    <ul>
                      <li>
                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                          YouTube
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            Copy© cirkle 2021. All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
