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
                      <div className="heading-btn">
                        <Link to="#">Settings</Link>
                        <Link to="#">Mark all as Read</Link>
                      </div>
                    </div>
                    <div className="item-body">
                      <Link to="#" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title">Rahul Sharma</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>when an unknown printer took galley of types ...</p>
                        </div>
                      </Link>
                      <Link to="#" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title">Priya Verma</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>when an unknown printer took galley of types ...</p>
                        </div>
                      </Link>
                      <Link to="#" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title">Amit Patel</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>when an unknown printer took galley of types ...</p>
                        </div>
                      </Link>
                    </div>
                    <div className="item-footer">
                      <Link to="#" className="view-btn">
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
                      <div className="heading-btn">
                        <Link to="#">Settings</Link>
                        <Link to="#">Mark all as Read</Link>
                      </div>
                    </div>
                    <div className="item-body">
                      <Link to="#" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title">Neha Singh</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>when an unknown printer took galley of types ...</p>
                        </div>
                      </Link>
                      <Link to="#" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title">Vikram Mehta</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>when an unknown printer took galley of types ...</p>
                        </div>
                      </Link>
                      <Link to="#" className="media">
                        <div className="item-img">
                          <img src="media/figure/chat_5.jpg" alt="Notify" />
                        </div>
                        <div className="media-body">
                          <h6 className="item-title">Anita Iyer</h6>
                          <div className="item-time">15 mins ago</div>
                          <p>when an unknown printer took galley of types ...</p>
                        </div>
                      </Link>
                    </div>
                    <div className="item-footer">
                      <Link to="#" className="view-btn">
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
                        <span className="acc-verified">
                          <i className="icofont-check" />
                        </span>
                      </span>
                      <span className="media-body">
                        <span className="item-title">Kiran Rao</span>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <ul className="admin-options">
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/support">Support</Link>
                      </li>
                      <li>
                        <Link to="/messages">Messages</Link>
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
