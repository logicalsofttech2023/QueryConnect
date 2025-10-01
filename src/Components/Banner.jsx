import React from "react";

const Banner = () => {
  return (
    <div>
      <section className="hero-banner">
        <div className="container">
          <div
            className="hero-content sal-animate"
            data-sal="zoom-out"
            data-sal-duration={1000}
          >
            <h1 className="item-title">Cirkle Community</h1>
            <p>
              Having real social contacts can sometimes be difficult FUN,
              everything becomes much simpler!
            </p>
            <div className="item-number">10,95,219</div>
            <div className="conn-people">Connected People</div>
            <a href="newsfeed.html" className="button-slide">
              <span className="btn-text">Discover Now</span>
              <span className="btn-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="21px"
                  height="10px"
                >
                  <path
                    fillRule="evenodd"
                    fill="rgb(255, 255, 255)"
                    d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
        <div className="leftside-image">
          <div
            className="cartoon-image sal-animate"
            data-sal="slide-down"
            data-sal-duration={1000}
            data-sal-delay={100}
          >
            <img src="media/banner/people_1.png" alt="People" />
          </div>
          <div
            className="shape-image sal-animate"
            data-sal="slide-down"
            data-sal-duration={500}
            data-sal-delay={700}
          >
            <img src="media/banner/shape_1.png" alt="shape" />
          </div>
        </div>
        <div className="map-line">
          <img
            src="media/banner/map_line.png"
            alt="map"
            data-sal="slide-up"
            data-sal-duration={500}
            data-sal-delay={800}
            className="sal-animate"
          />
          <ul className="map-marker">
            <li
              data-sal="slide-up"
              data-sal-duration={700}
              data-sal-delay={1000}
              className="sal-animate"
            >
              <img src="media/banner/marker_1.png" alt="marker" />
            </li>
            <li
              data-sal="slide-up"
              data-sal-duration={800}
              data-sal-delay={1000}
              className="sal-animate"
            >
              <img src="media/banner/marker_2.png" alt="marker" />
            </li>
            <li
              data-sal="slide-up"
              data-sal-duration={900}
              data-sal-delay={1000}
              className="sal-animate"
            >
              <img src="media/banner/marker_3.png" alt="marker" />
            </li>
            <li
              data-sal="slide-up"
              data-sal-duration={1000}
              data-sal-delay={1000}
              className="sal-animate"
            >
              <img src="media/banner/marker_4.png" alt="marker" />
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Banner;
