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
    name: "Sneha Patel",
    email: "rebeca.powel@example.com",
    mobile: "+1 (555) 123-4567",
    location: "Indore India",
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
        <div className="container-fluid">
          {/* Profile Header */}
          <div className="banner-user">
            <div className="banner-content">
              <div className="media">
                <div className="item-img">
                  <img src={formData.profileImage} alt="User"  style={{ width: "150px"}}/>
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
                      <span className="stat-number" style={{ color: '#fff' }}>30</span>
                      <span className="stat-label" style={{ color: '#fff' }}>Active Query</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number" style={{ color: '#fff' }}>12</span>
                      <span className="stat-label" style={{ color: '#fff' }}>Inactive Query</span>
                    </div>
                    
                    
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;