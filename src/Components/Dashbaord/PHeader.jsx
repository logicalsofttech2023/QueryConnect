import React from "react";
import { Link } from "react-router-dom";

const PHeader = () => {
  return (
    <div>
      <header className="fixed-header">
        <div className="header-menu">
          <div className="navbar" style={{ justifyContent: "space-between" }}>
            <div className="nav-item d-sm-block">
              <div className="header-logo">
                <Link to="/">
                  <img
                    src="media/newLogo.png"
                    alt="QueryConnect"
                    style={{ maxWidth: "140px" }}
                  />
                </Link>
              </div>
            </div>

            <nav id="dropdown" className="template-main-menu">
                  <button
                    type="button"
                    className="mobile-menu-toggle mobile-toggle-close"
                    onClick={() => setIsOpen(false)}
                  >
                    <i className="icofont-close" />
                  </button>
                  <ul className="menu-content">
                    <li className="header-nav-item">
                      <Link to="/dashboard" className="menu-link active">
                        Dashbaord
                      </Link>
                    </li>
                    
                  </ul>
                </nav>

            <div className="nav-item header-control">
              <div className="inline-item d-flex align-items-center">
                {/* Messages Dropdown */}
                <div className="dropdown dropdown-message">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="icofont-speech-comments" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <div className="item-heading">
                      <h6 className="heading-title">Message</h6>
                     
                    </div>
                    <div className="item-body">
                      <Link to="/messages" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title ">Rahul Sharma</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>
                            when an unknown printer...
                          </p>
                        </div>
                      </Link>
                      <Link to="/messages" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title">Priya Verma</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>
                            when an unknown printer took galley of types ...
                          </p>
                        </div>
                      </Link>
                      <Link to="/messages" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title">Amit Patel</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>
                            when an unknown printer took galley of types ...
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="item-footer">
                      <Link to="/messages" className="view-btn">
                        View All Messages
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Notifications Dropdown */}
                <div className="dropdown dropdown-notification">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="icofont-notification" />
                    <span className="notify-count">3</span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <div className="item-heading">
                      <h6 className="heading-title">Notifications</h6>
                      
                    </div>
                    <div className="item-body">
                      <Link to="/notifications" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title">Neha Singh</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>
                            when an unknown printer took galley of types ...
                          </p>
                        </div>
                      </Link>
                      <Link to="/notifications" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title">Vikram Mehta</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>
                            when an unknown printer took galley of types ...
                          </p>
                        </div>
                      </Link>
                      <Link to="/notifications" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title">Anita Iyer</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>
                            when an unknown printer took galley of types ...
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="item-footer">
                      <Link to="/notifications" className="view-btn">
                        View All Notification
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Dropdown */}
              <div className="inline-item">
                <div className="dropdown dropdown-admin">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="media">
                      <span className="item-img">
                        <img src="media/figure/chat_5.jpg" alt="Chat" />
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <ul className="admin-options">
                      
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/support">Support</Link>
                      </li>
                      
                      <li>
                        <Link to="/inactiveQueries">Inactive Queries</Link>
                      </li>
                      <li>
                        <Link to="/login">Log Out</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default PHeader;
