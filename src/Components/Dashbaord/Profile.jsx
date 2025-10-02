import React, { useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt, 
  FaClock, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaCheckCircle,
  FaEdit,
  FaCamera,
  FaMapMarkerAlt,
  FaShareAlt,
  FaBell,
  FaArrowLeft
} from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordResetMethod, setPasswordResetMethod] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Sample user data - in real app, this would come from props or context
  const [userData, setUserData] = useState({
    name: "Rebeca Powel",
    email: "rebeca.powel@example.com",
    mobile: "+1 (555) 123-4567",
    location: "United State of America",
    joinDate: "2024-01-15",
    dateOfBirth: "1990-05-15",
    preferredTime: "14:30",
    profileImage: "media/banner/user_1.jpg",
    test: "eye-test"
  });

  const [formData, setFormData] = useState({ 
  ...userData,
  test: userData.test || "" // Ensure test has a value
});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserData(formData);
    setIsEditing(false);
    console.log("Profile updated:", formData);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    if (passwordResetMethod === "currentPassword" && !passwordData.currentPassword) {
      alert("Please enter your current password");
      return;
    }

    if (passwordResetMethod === "forgotPassword" && !otpVerified) {
      alert("Please verify OTP first");
      return;
    }

    console.log("Password reset successful:", {
      method: passwordResetMethod,
      newPassword: passwordData.newPassword
    });

    // Reset all password states
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      otp: ""
    });
    setPasswordResetMethod(null);
    setOtpSent(false);
    setOtpVerified(false);
    
    alert("Password updated successfully!");
  };

  const handleSendOTP = () => {
    // Simulate OTP sending
    console.log("OTP sent to:", userData.mobile);
    setOtpSent(true);
    alert("OTP has been sent to your registered mobile number");
  };

  const handleVerifyOTP = () => {
    if (passwordData.otp.length === 6) {
      // Simulate OTP verification
      setOtpVerified(true);
      alert("OTP verified successfully!");
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  const handleCancelEdit = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetPasswordFlow = () => {
    setPasswordResetMethod(null);
    setOtpSent(false);
    setOtpVerified(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      otp: ""
    });
  };

  return (
    <div id="wrapper" className="wrapper">
      <div className="page-content">
        <div className="container">
          {/* Profile Header */}
          <div className="banner-user">
            <div className="banner-content">
              <div className="media">
                <div className="item-img">
                  <img src={formData.profileImage} alt="User" />
                  <div className="image-overlay">
                    <label htmlFor="profileImageUpload" className="camera-icon">
                      <FaCamera />
                      <input
                        id="profileImageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>
                <div className="media-body">
                  <div className="header-top">
                    <div>
                      <h3 className="item-title">{userData.name}</h3>
                      <div className="item-subtitle">
                        <FaMapMarkerAlt />
                        {userData.location}
                      </div>
                    </div>
                    
                  </div>
                  
                  <div className="user-stats">
                    <div className="stat-item">
                      <span className="stat-number">30</span>
                      <span className="stat-label">Query</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">12</span>
                      <span className="stat-label">Comments</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">1.2k</span>
                      <span className="stat-label">Views</span>
                    </div>
                    
                  </div>

                  <div className="member-since">
                    Member since {new Date(userData.joinDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="profile-content">
            <div className="profile-tabs">
              <button 
                className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                <FaUser />
                Personal Info
              </button>
              <button 
                className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <FaLock />
                Security
              </button>
              <button 
                className={`tab-btn ${activeTab === 'scheduler' ? 'active' : ''}`}
                onClick={() => setActiveTab('scheduler')}
              >
                <FaClock />
                Scheduler
              </button>
            </div>

            <div className="tab-content">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="tab-pane active">
                  <div className="section-header">
                    <h3>Personal Information</h3>
                    <button 
                      className="btn btn-edit"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <FaEdit  />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  <form onSubmit={handleSaveProfile}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>
                          <FaUser style={{ marginRight: '9px', marginBottom: '6px' }} />
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={!isEditing ? 'disabled' : ''}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <FaEnvelope style={{ marginRight: '9px', marginBottom: '6px' }} />
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={!isEditing ? 'disabled' : ''}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <FaPhone style={{ marginRight: '9px', marginBottom: '6px' }} />
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={userData.mobile}
                          disabled
                          className="disabled"
                        />
                        <div className="field-note">Mobile number cannot be changed</div>
                      </div>

                      <div className="form-group">
                        <label>
                          <FaMapMarkerAlt style={{ marginRight: '9px', marginBottom: '6px' }} />
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={!isEditing ? 'disabled' : ''}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <FaCalendarAlt style={{ marginRight: '9px', marginBottom: '6px' }} />
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={!isEditing ? 'disabled' : ''}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="form-actions">
                        <button type="button" className="btn btn-cancel" onClick={handleCancelEdit}>
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-save">
                          <FaCheckCircle />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="tab-pane active">
                  <div className="section-header">
                    <h3>Password & Security</h3>
                  </div>

                  <div className="security-options">
                    {!passwordResetMethod ? (
                      <div className="reset-options">
                        <h4>Choose how you want to reset your password:</h4>
                        <div className="option-cards">
                          <div 
                            className="option-card"
                            onClick={() => setPasswordResetMethod("currentPassword")}
                          >
                            <div className="card-icon">
                              <FaLock />
                            </div>
                            <h5>I know my current password</h5>
                            <p>Reset using your existing password</p>
                            <div className="card-arrow">→</div>
                          </div>
                          
                          <div 
                            className="option-card"
                            onClick={() => setPasswordResetMethod("forgotPassword")}
                          >
                            <div className="card-icon">
                              <FaPhone />
                            </div>
                            <h5>I forgot my password</h5>
                            <p>Verify with OTP sent to your mobile</p>
                            <div className="card-arrow">→</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="password-reset-flow">
                        {/* Back Button */}
                        <button 
                          className="back-button"
                          onClick={resetPasswordFlow}
                        >
                          <FaArrowLeft />
                          Back to Options
                        </button>

                        <form onSubmit={handlePasswordReset}>
                          {/* Current Password Method */}
                          {passwordResetMethod === "currentPassword" && (
                            <div className="method-section">
                              <h4>Reset with Current Password</h4>
                              <div className="form-group">
                                <label>Current Password</label>
                                <div className="password-input">
                                  <input
                                    type={showOldPassword ? "text" : "password"}
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your current password"
                                    required
                                    style={{ width: '100%' }}
                                  />
                                  <button 
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                  >
                                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Forgot Password Method */}
                          {passwordResetMethod === "forgotPassword" && (
                            <div className="method-section">
                              <h4>Reset with OTP Verification</h4>
                              <div className="otp-info">
                                <p>We'll send a verification code to your registered mobile number:</p>
                                <div className="mobile-display">
                                  <strong>{userData.mobile}</strong>
                                </div>
                              </div>

                              {!otpSent ? (
                                <div className="form-group">
                                  <button 
                                    type="button" 
                                    className="btn btn-send-otp"
                                    onClick={handleSendOTP}
                                  >
                                    Send OTP
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <div className="form-group">
                                    <label>Enter OTP</label>
                                    <div className="otp-input-section">
                                      <input
                                        type="text"
                                        name="otp"
                                        value={passwordData.otp}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter 6-digit OTP"
                                        maxLength="6"
                                        disabled={otpVerified}
                                      />
                                      {!otpVerified && (
                                        <button 
                                          type="button" 
                                          className="btn btn-verify-otp"
                                          onClick={handleVerifyOTP}
                                          disabled={passwordData.otp.length !== 6}
                                        >
                                          Verify OTP
                                        </button>
                                      )}
                                    </div>
                                    {otpVerified && (
                                      <div className="verification-success">
                                        <FaCheckCircle />
                                        OTP verified successfully!
                                      </div>
                                    )}
                                    <div className="resend-otp">
                                      Didn't receive OTP?{" "}
                                      <button type="button" onClick={handleSendOTP}>
                                        Resend OTP
                                      </button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          {/* New Password Section (Common for both methods) */}
                          {(passwordResetMethod === "currentPassword" || 
                            (passwordResetMethod === "forgotPassword" && otpVerified)) && (
                            <div className="new-password-section">
                              <h4>Set New Password</h4>
                              <div className="form-group">
                                <label>New Password</label>
                                <div className="password-input">
                                  <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                    required
                                    style={{ width: "100%" }}
                                  />
                                  <button 
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                  >
                                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                </div>
                              </div>

                              <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  value={passwordData.confirmPassword}
                                  onChange={handlePasswordChange}
                                  placeholder="Confirm new password"
                                  required
                                />
                                {passwordData.newPassword && passwordData.confirmPassword && 
                                passwordData.newPassword !== passwordData.confirmPassword && (
                                  <div className="password-error">Passwords don't match</div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Submit Button */}
                          <div className="form-actions">
                            <button 
                              type="submit" 
                              className="btn btn-save"
                              disabled={
                                !passwordData.newPassword ||
                                passwordData.newPassword !== passwordData.confirmPassword ||
                                (passwordResetMethod === "currentPassword" && !passwordData.currentPassword) ||
                                (passwordResetMethod === "forgotPassword" && !otpVerified)
                              }
                            >
                              <FaLock />
                              Update Password
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Scheduler Tab */}
              {activeTab === 'scheduler' && (
                <div className="tab-pane active">
                  <div className="section-header">
                    <h3>Scheduler</h3>
                  </div>

                  <form>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>
                          <FaCalendarAlt style={{ marginRight: '9px', marginBottom: '6px' }} />
                          Day
                        </label>
                        <input
                          type="date"
                          name="preferredDay"
                          value={formData.preferredDay || ''}
                          onChange={handleInputChange}
                        />
                        <div className="field-note">
                          Select your preferred day for scheduling
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          <FaClock style={{ marginRight: '9px', marginBottom: '6px' }} />
                          Time
                        </label>
                        <input
                          type="time"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                        />
                        <div className="field-note">
                          Select your preferred time slot
                        </div>
                      </div>
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <label>Select Test (optional)</label>
                        <select
                          name="test"
                          className="form-control"
                          value={formData.test || ''}
                          onChange={handleInputChange}
                        >
                          <option value="">-- Select Test --</option>
                          <option value="eye-test">Eye Test</option>
                          <option value="vision-test">Vision Test</option>
                          <option value="color-blind-test">Color Blind Test</option>
                        </select>
                      </div>
                    </div>

                    

                    <div className="form-actions">
                      <button type="button" className="btn btn-save">
                        <FaCheckCircle />
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;