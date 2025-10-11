import React, { useState } from "react";
import { FaArrowLeft, FaFacebook, FaGoogle } from "react-icons/fa";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("registration");
  const [registrationStep, setRegistrationStep] = useState(1);
  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
    name: "",
    email: "",
    password: "",
    cpassword: "",
    terms: false,
    day: "",
    time: "",
    test: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (formData.mobile.length === 10) {
      console.log("OTP sent to:", formData.mobile);
      setRegistrationStep(2);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (formData.otp.length === 6) {
      console.log("OTP verified");
      navigate("/dashboard");
    }
  };

  // Social login handlers
  const handleFacebookLogin = () => {
    console.log("Facebook login initiated");
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
  };

  const resetRegistration = () => {
    setRegistrationStep(1);
    setFormData({
      mobile: "",
      otp: "",
      name: "",
      email: "",
      password: "",
      cpassword: "",
      terms: false,
      day: "",
      time: "",
      test: "",
    });
  };

  return (
    <div className="login-page-wrap">
      <div className="content-wrap">
        <div className="login-content">
          <div className="item-logo">
            <a>
              <img
                src="media/newLogo.png"
                alt="logo"
                style={{ maxWidth: "190px" }}
              />
            </a>
          </div>

          <div className="login-form-wrap">
            

            <div className="tab-content">
              <div
                className={`tab-pane registration-tab fade ${
                  activeTab === "registration" ? "show active" : ""
                }`}
                id="registration-tab"
                role="tabpanel"
              >
                {/* Registration Steps */}
                {/* <div className="registration-steps">
                  <div
                    className={`step ${registrationStep >= 1 ? "active" : ""}`}
                  >
                    <div className="step-number">1</div>
                    <span>Mobile</span>
                  </div>
                  <div
                    className={`step ${registrationStep >= 2 ? "active" : ""}`}
                  >
                    <div className="step-number">2</div>
                    <span>OTP</span>
                  </div>
                </div> */}

                <h3 className="item-title">
                  {registrationStep === 1 && "Sign In or Continue with"}
                  {registrationStep === 2 && "Verify OTP"}
                </h3>

                {/* --- 🟦 SOCIAL LOGIN AT TOP --- */}
                {registrationStep === 1 && (
                  <>
                    <div className="social-login-buttons top-social">
                      <button
                        type="button"
                        className="social-btn facebook-btn"
                        onClick={handleFacebookLogin}
                        style={{ fontSize: "11px" }}
                      >
                        <FaFacebook className="social-icon" />
                        Continue with Facebook
                      </button>
                      <button
                        type="button"
                        className="social-btn google-btn"
                        onClick={handleGoogleLogin}
                        style={{ fontSize: "11px" }}
                      >
                        <FaGoogle className="social-icon" />
                        Continue with Google
                      </button>
                    </div>

                    <div className="social-login-divider">
                      <span>Or</span>
                    </div>
                  </>
                )}

                {/* --- FORM --- */}
                <form
                  onSubmit={
                    registrationStep === 1
                      ? handleSendOTP
                      : registrationStep === 2
                      ? handleVerifyOTP
                      : () => {}
                  }
                >
                  {/* STEP 1: Mobile Number */}
                  {registrationStep === 1 && (
                    <div className="step-content">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            type="tel"
                            name="mobile"
                            className="form-control"
                            placeholder="Enter Mobile Number"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            maxLength="10"
                            pattern="[0-9]{10}"
                            required
                          />
                        </div>
                        <div className="input-hint">
                          We'll send a verification code to this number
                        </div>
                      </div>

                      <div className="form-group">
                        <button type="submit" className="submit-btn">
                          Send OTP
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: OTP Verification */}
                  {registrationStep === 2 && (
                    <div className="step-content">
                      <div className="otp-info">
                        <p>OTP sent to +91 {formData.mobile}</p>
                        <button
                          type="button"
                          className="resend-otp"
                          onClick={() => console.log("Resend OTP")}
                        >
                          Resend OTP
                        </button>
                      </div>

                      <div className="form-group">
                        <div className="otp-input-group">
                          <input
                            type="text"
                            name="otp"
                            className="form-control otp-input"
                            placeholder="Enter 6-digit OTP"
                            value={formData.otp}
                            onChange={handleInputChange}
                            maxLength="6"
                            pattern="[0-9]{6}"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <button type="submit" className="submit-btn">
                          Verify OTP
                        </button>
                      </div>

                      <div className="back-to-mobile">
                        <button
                          type="button"
                          className="back-btn"
                          onClick={() => setRegistrationStep(1)}
                        >
                          <FaArrowLeft /> Change Mobile Number
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="map-line">
          <img src="media/banner/map_line.png" alt="map" />
          <ul className="map-marker">
            <li>
              <img src="media/banner/marker_1.png" alt="marker" />
            </li>
            <li>
              <img src="media/banner/marker_2.png" alt="marker" />
            </li>
            <li>
              <img src="media/banner/marker_3.png" alt="marker" />
            </li>
            <li>
              <img src="media/banner/marker_4.png" alt="marker" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
