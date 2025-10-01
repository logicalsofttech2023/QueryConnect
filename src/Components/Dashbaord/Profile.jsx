import React, { useState } from "react";

const Profile = () => {
  return (
    <div id="wrapper" className={`wrapper`}>
      <div className="page-content">
        <div className="container">
          <div className="banner-user">
            <div className="banner-content">
              <div className="media">
                <div className="item-img">
                  <img src="media/banner/user_1.jpg" alt="User" />
                </div>
                <div className="media-body">
                  <h3 className="item-title">Rebeca Powel</h3>
                  <div className="item-subtitle">United State of America</div>
                  <ul className="item-social">
                    <li>
                      <a href="#" className="bg-fb">
                        <i className="icofont-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-twitter">
                        <i className="icofont-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-dribble">
                        <i className="icofont-dribbble" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-youtube">
                        <i className="icofont-brand-youtube" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-behance">
                        <i className="icofont-behance" />
                      </a>
                    </li>
                  </ul>
                  <ul className="user-meta">
                    <li>
                      Posts: <span>30</span>
                    </li>
                    <li>
                      Comments: <span>12</span>
                    </li>
                    <li>
                      Views: <span>1.2k</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
