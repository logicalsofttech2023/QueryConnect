import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaCheckCircle,
  FaEdit,
  FaCamera,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Profile.css";
import axios from "axios";

const Profile = () => {
  const Base_URL = import.meta.env.VITE_BASE_URL;

  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    userEmail: "",
    gender: "",
    location: "",
    dateOfBirth: "",
    profileImage: "",
  });

  // ✅ Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${Base_URL}getUserById`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("API Response:", response.data);

      const { user, totalActiveQueries, totalInActiveQueries } = response.data.data;

      const combinedData = {
        ...user,
        totalActiveQueries,
        totalInActiveQueries,
      };

      console.log("Combined Data:", response);

      setUserData(combinedData);
      setFormData({
        fullName: user.fullName || "",
        userEmail: user.userEmail || "",
        gender: user.gender || "",
        location: user.location || "",
        dateOfBirth: user.dateOfBirth || "",
        profileImage: user.profileImage || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserData((prev) => ({ ...prev, ...formData }));
    setIsEditing(false);
    console.log("Profile updated:", formData);
  };

  const handleCancelEdit = () => {
    setFormData({
      fullName: userData.fullName,
      userEmail: userData.userEmail,
      gender: userData.gender,
      location: userData.location,
      dateOfBirth: userData.dateOfBirth,
      profileImage: userData.profileImage,
    });
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          profileImage: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) return <p>Loading...</p>;
  console.log(userData);
  

  return (
    <div id="wrapper" className="wrapper">
      <div className="page-content">
        <div className="container-fluid">
          {/* Profile Header */}
          <div className="banner-user">
            <div className="banner-content">
              <div className="media">
                <div className="item-img">
                  <img
                    src={formData.profileImage}
                    alt="User"
                    style={{ width: "150px", borderRadius: "50%" }}
                  />
                  <div className="image-overlay">
                    <label htmlFor="profileImageUpload" className="camera-icon">
                      <FaCamera />
                      <input
                        id="profileImageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>

                <div className="media-body">
                  <div className="header-top">
                    <div>
                      <h3 className="item-title" style={{ color: "#fff" }}>{userData.fullName}</h3>
                    </div>
                  </div>

                  <div className="user-stats">
                    <div className="stat-item">
                      <span className="stat-number" style={{ color: "#fff" }}>
                        {userData.totalActiveQueries}
                      </span>
                      <span className="stat-label" style={{ color: "#fff" }}>
                        Active Query
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number" style={{ color: "#fff" }}>
                        {userData.totalInActiveQueries}
                      </span>
                      <span className="stat-label" style={{ color: "#fff" }}>
                        Inactive Query
                      </span>
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
                className={`tab-btn ${
                  activeTab === "personal" ? "active" : ""
                }`}
                onClick={() => setActiveTab("personal")}
              >
                <FaUser />
                Personal Info
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "personal" && (
                <div className="tab-pane active">
                  <div className="section-header">
                    <h3>Personal Information</h3>
                    <button
                      className="btn btn-edit"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <FaEdit />
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>

                  <form onSubmit={handleSaveProfile}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>
                          <FaUser /> Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <FaEnvelope /> Email Address
                        </label>
                        <input
                          type="email"
                          name="userEmail"
                          value={formData.userEmail}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          <FaUser /> Gender
                        </label>
                        <input
                          type="text"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>

                      

                      <div className="form-group">
                        <label>
                          <FaCalendarAlt /> Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="form-actions">
                        <button
                          type="button"
                          className="btn btn-cancel"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-save">
                          <FaCheckCircle /> Save Changes
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
