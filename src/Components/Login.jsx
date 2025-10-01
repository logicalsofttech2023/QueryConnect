import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaUser,
  FaLock,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [registrationStep, setRegistrationStep] = useState(1);
  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
    name: "",
    email: "",
    password: "",
    cpassword: "",
    terms: false,
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
      // Simulate OTP sending
      console.log("OTP sent to:", formData.mobile);
      setRegistrationStep(2);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (formData.otp.length === 6) {
      // Simulate OTP verification
      console.log("OTP verified");
      setRegistrationStep(3);
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    if (formData.password === formData.cpassword && formData.terms) {
      console.log("Registration data:", formData);
      navigate("/dashboard");
      // Handle registration logic here
    }
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
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    navigate("/dashboard");
  };

  return (
    <div className="login-page-wrap">
      <div className="content-wrap">
        <div className="login-content">
          <div className="item-logo">
            <a href="#">
              <img src="media/logo_large.png" alt="logo" />
            </a>
          </div>

          <div className="login-form-wrap">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "login" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("login")}
                >
                  <i className="icofont-users-alt-4" /> Sign In
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "registration" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab("registration");
                    resetRegistration();
                  }}
                >
                  <i className="icofont-download" /> Registration
                </button>
              </li>
            </ul>

            <div className="tab-content">
              {/* LOGIN TAB */}
              <div
                className={`tab-pane login-tab fade ${
                  activeTab === "login" ? "show active" : ""
                }`}
                id="login-tab"
                role="tabpanel"
              >
                <h3 className="item-title">
                  Sign Into <span>Your Account</span>
                </h3>

                <div className="google-signin">
                  <a href="#">
                    <img src="media/figure/google-icon.png" alt="Google" />
                    Continue with Google
                  </a>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <div className="input-with-icon">
                      <input
                        type="tel"
                        className="form-control"
                        name="mobile"
                        placeholder="Mobile Number"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-with-icon">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group reset-password">
                    <a href="#">Forgot Password?</a>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="submit-btn">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>

              {/* REGISTRATION TAB */}
              <div
                className={`tab-pane registration-tab fade ${
                  activeTab === "registration" ? "show active" : ""
                }`}
                id="registration-tab"
                role="tabpanel"
              >
                {/* Registration Progress Steps */}
                <div className="registration-steps">
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
                  <div
                    className={`step ${registrationStep >= 3 ? "active" : ""}`}
                  >
                    <div className="step-number">3</div>
                    <span>Details</span>
                  </div>
                </div>

                <h3 className="item-title">
                  {registrationStep === 1 && "Enter Your Mobile Number"}
                  {registrationStep === 2 && "Verify OTP"}
                  {registrationStep === 3 && "Complete Your Profile"}
                </h3>

                <form
                  onSubmit={
                    registrationStep === 1
                      ? handleSendOTP
                      : registrationStep === 2
                      ? handleVerifyOTP
                      : handleRegistration
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

                  {/* STEP 3: Personal Details */}
                  {registrationStep === 3 && (
                    <div className="step-content">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Create Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-with-icon">
                          <input
                            type="password"
                            name="cpassword"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={formData.cpassword}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        {formData.password &&
                          formData.cpassword &&
                          formData.password !== formData.cpassword && (
                            <div className="password-error">
                              Passwords don't match
                            </div>
                          )}
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          className="submit-btn"
                          disabled={formData.password !== formData.cpassword}
                        >
                          Complete Registration
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
