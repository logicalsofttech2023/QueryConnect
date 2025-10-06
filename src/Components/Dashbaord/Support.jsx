import React, { useState } from "react";
import {
  FiHelpCircle,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
} from "react-icons/fi";
import "./Support.css";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    priority: "",
    subject: "",
    description: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        issueType: "",
        priority: "",
        subject: "",
        description: "",
      });
    }, 4000);
  };

  const quickActions = [
    {
      icon: <FiMessageCircle />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: () => alert("Starting live chat..."),
      color: "#3B82F6",
    },
    {
      icon: <FiPhone />,
      title: "Call Us",
      description: "Speak directly with our experts",
      action: () => window.open("tel:+1-555-0123"),
      color: "#10B981",
    },
    {
      icon: <FiMail />,
      title: "Email",
      description: "Send us a detailed message",
      action: () => window.open("mailto:support@company.com"),
      color: "#8B5CF6",
    },
    {
      icon: <FiHelpCircle />,
      title: "Help Center",
      description: "Browse our knowledge base",
      action: () => window.open("/help", "_blank"),
      color: "#F59E0B",
    },
  ];

  const priorityOptions = [
    {
      value: "low",
      label: "Low",
      description: "General questions or minor issues",
      color: "#10B981",
    },
    {
      value: "medium",
      label: "Medium",
      description: "Important but not urgent matters",
      color: "#F59E0B",
    },
    {
      value: "high",
      label: "High",
      description: "Critical issues affecting workflow",
      color: "#EF4444",
    },
  ];

  return (
    <div className="support-container">
      {/* Success Animation Overlay */}
      {isSubmitted && (
        <div className="support-success-overlay">
          <div className="support-success-modal">
            <div className="success-animation">
              <FiCheckCircle className="success-icon" />
              <div className="success-circle"></div>
            </div>
            <h3>Request Submitted Successfully!</h3>
            <p>
              We've received your support request and will get back to you
              within 24 hours. You'll receive a confirmation email shortly.
            </p>
            <button
              className="success-close-btn"
              onClick={() => setIsSubmitted(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Support Form */}
      <div className="support-form-section">
        <div className="form-header">
          <h2>Submit a Support Request</h2>
          <p>Fill out the form below and we'll help you resolve your issue</p>
        </div>

        <div className="support-form-container">
          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-row">
              <div className="support-form-group">
                <label htmlFor="name">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="support-form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="support-form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="support-form-control"
                  placeholder="your.email@example.com"
                  required
                />
                <div className="form-help-text">
                  <FiInfo className="help-icon" />
                  We'll use this to send you updates about your request
                </div>
              </div>
            </div>

           

            <div className="support-form-group">
              <label htmlFor="subject">
                Subject <span className="required">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="support-form-control"
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div className="support-form-group">
              <label htmlFor="description">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="support-form-control"
                placeholder="Please provide as much detail as possible about your issue. Include any error messages, steps to reproduce, or relevant information."
                rows="6"
                required
              />
              <div className="char-counter">
                {formData.description.length}/1000 characters
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className={`support-submit-btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="btn-icon" />
                    Submit Support Request
                  </>
                )}
              </button>

              
            </div>
          </form>
        </div>
      </div>

      {/* Support Info Footer */}
      <div className="support-info-footer">
        <div className="info-grid">
          <div className="info-item">
            <div className="info-icon">
              <FiClock />
            </div>
            <div className="info-content">
              <h4>24/7 Support</h4>
              <p>Round-the-clock assistance for critical issues</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <FiCheckCircle />
            </div>
            <div className="info-content">
              <h4>Expert Team</h4>
              <p>Experienced professionals ready to help</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <FiAlertCircle />
            </div>
            <div className="info-content">
              <h4>Quick Resolution</h4>
              <p>Fast and effective problem solving</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
