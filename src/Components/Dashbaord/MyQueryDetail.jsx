import React, { useState } from "react";
import {
  FaEye,
  FaEllipsisV,
  FaClock,
  FaStar,
  FaExpand,
  FaTimes,
  FaEdit,
  FaCheck,
} from "react-icons/fa";
import "./MyQueryDetail.css";
import { FaEyeSlash } from "react-icons/fa";

const MyQueryDetail = () => {
  const [query, setQuery] = useState({
    id: 1,
    description:
      "I'm trying to implement a drag and drop feature for file uploads in my React application. I've tried using the HTML5 drag and drop API but facing issues with React's synthetic events. The drag events are not firing properly and I'm having trouble managing the state during drag operations. Can someone help me with the best approach and maybe suggest some good libraries?",
    images: ["media/figure/sample1.jpg", "media/figure/sample1.jpg"],
    videos: [],
    queryType: "technical",
    status: "active",
    user: {
      name: "Rahul Mehta",
      avatar: "media/figure/chat_5.jpg",
    },
    timestamp: "2 hours ago",
    startTime: "06:00",
    endTime: "20:00",

    agentsList: [
      {
        id: 1,
        user: {
          name: "Neha Sharma",
          avatar: "media/figure/chat_5.jpg",
        },
        text: "You can use react-dnd library for this. It's well maintained and has great documentation. I've used it in multiple projects and it handles most drag and drop scenarios very well.",
        timestamp: "1 hour ago",
        rating: 4.5,
        images: ["media/figure/sample1.jpg", "media/figure/sample1.jpg"],
      },
      {
        id: 2,
        user: {
          name: "Amit Verma",
          avatar: "media/figure/chat_5.jpg",
        },
        text: "Another good option is react-beautiful-dnd. It's specifically designed for beautiful and accessible drag and drop in React. Works great with lists.",
        timestamp: "30 mins ago",
        rating: 4.5,
        images: ["media/figure/sample1.jpg", "media/figure/sample1.jpg"],
      },
      {
        id: 3,
        user: {
          name: "Priya Singh",
          avatar: "media/figure/chat_5.jpg",
        },
        text: "If you want a simpler solution without external libraries, you can use the native HTML5 drag and drop with React refs. But I'd recommend starting with react-dnd as it's more React-friendly.",
        timestamp: "15 mins ago",
        rating: 3.5,
        images: null,
      },
    ],

    commentsList: [
      {
        id: 1,
        text: "You can use react-dnd library for this. It's well maintained and has great documentation. I've used it in multiple projects and it handles most drag and drop scenarios very well.",
        timestamp: "1 hour ago",
      },
    ],
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [tempStartTime, setTempStartTime] = useState(query.startTime);
  const [tempEndTime, setTempEndTime] = useState(query.endTime);
  const [isExpanded, setIsExpanded] = useState(false);

  const openImagePopup = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  const toggleStatus = () => {
    setQuery((prev) => ({
      ...prev,
      status: prev.status === "active" ? "inactive" : "active",
    }));
  };

  const startEditingTime = () => {
    setTempStartTime(query.startTime);
    setTempEndTime(query.endTime);
    setIsEditingTime(true);
  };

  const saveActiveHours = () => {
    setQuery((prev) => ({
      ...prev,
      startTime: tempStartTime,
      endTime: tempEndTime,
    }));
    setIsEditingTime(false);
  };

  const cancelEditingTime = () => {
    setTempStartTime(query.startTime);
    setTempEndTime(query.endTime);
    setIsEditingTime(false);
  };

  const handleStartTimeChange = (e) => {
    setTempStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setTempEndTime(e.target.value);
  };

  // Format time from 24h to 12h format for display
  const formatTimeForDisplay = (time24h) => {
    const [hours, minutes] = time24h.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes}${ampm}`;
  };

  const getDisplayTime = () => {
    return `${formatTimeForDisplay(query.startTime)} to ${formatTimeForDisplay(
      query.endTime
    )}`;
  };

  // Component for rendering each agent
  const AgentItem = ({ agent }) => {
    return (
      <li className="main-comments">
        <div className="each-comment">
          <div className="post-header">
            <div className="media">
              <div className="user-img">
                <img src={agent.user.avatar} alt={agent.user.name} />
              </div>
              <div className="media-body">
                <div className="user-title">
                  <a>{agent.user.name}</a>
                </div>
                <ul className="entry-meta">
                  <li className="meta-time">
                    <FaClock className="meta-icon" />
                    {agent.timestamp}
                  </li>
                  <li className="meta-rating">
                    <FaStar className="star-icon" />
                    {agent.rating}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="post-body">
            <p>{agent.text}</p>
            {agent.images && agent.images.length > 0 && (
              <div className="comment-images">
                {agent.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="comment-image-container"
                    onClick={() => openImagePopup(img)}
                  >
                    <img
                      src={img}
                      alt={`agent-${agent.id}-${idx}`}
                      className="comment-image"
                    />
                    <div className="image-overlay">
                      <FaExpand className="expand-icon" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </li>
    );
  };

  const CommentItem = ({ comment }) => {
    return (
      <li className="main-comments">
        <div className="each-comment">
          <div className="post-header">
            <div className="media">
              <div className="media-body"></div>
            </div>
          </div>
          <div className="post-body">
            <p>{comment.text}</p>
            <div className="comment-timestamp">{comment.timestamp}</div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div id="wrapper" className="wrapper">
      {/* Image Popup Modal */}
      {selectedImage && (
        <div className="image-popup-overlay" onClick={closeImagePopup}>
          <div
            className="image-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-popup-btn" onClick={closeImagePopup}>
              <FaTimes />
            </button>
            <img src={selectedImage} alt="Full size" className="popup-image" />
          </div>
        </div>
      )}

      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Filter Section */}
              <div className="filter-section">
                <div className="filter-header">
                  <h3>Your Query</h3>
                  <div className="status-controls">
                    <span
                      className={`status-badge ${query.status}`}
                      onClick={toggleStatus}
                      style={{ cursor: "pointer" }}
                    >
                      {query.status}
                    </span>
                  </div>
                </div>
                <div className="active-time-control">
                  {isEditingTime ? (
                    <div className="time-edit-container">
                      <div className="time-inputs-group">
                        <div className="time-input-wrapper">
                          <label className="time-label">From</label>
                          <input
                            type="time"
                            value={tempStartTime}
                            onChange={handleStartTimeChange}
                            className="time-input"
                          />
                        </div>
                        <div className="time-input-wrapper">
                          <label className="time-label">To</label>
                          <input
                            type="time"
                            value={tempEndTime}
                            onChange={handleEndTimeChange}
                            className="time-input"
                          />
                        </div>
                      </div>
                      <div className="time-edit-buttons">
                        <button
                          className="save-time-btn"
                          onClick={saveActiveHours}
                          title="Save"
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="cancel-time-btn"
                          onClick={cancelEditingTime}
                          title="Cancel"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="time-display-container">
                      <span className="active-time">
                        Active {getDisplayTime()}
                      </span>
                      <button
                        className="edit-time-btn"
                        onClick={startEditingTime}
                        title="Edit time"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Query Detail */}
              <div className="query-detail-card">
                <div className="query-header p-0"></div>

                <div className="query-content">
                  <p
                    className={isExpanded ? "expanded" : ""}
                    style={{
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {isExpanded
                      ? query.description
                      : `${query.description.slice(0, 180)}${
                          query.description.length > 180 ? "..." : ""
                        }`}
                  </p>
                  {query.description.length > 180 && (
                    <button
                      className={`read-more-btn`}
                      onClick={() => {
                        setIsExpanded(!isExpanded);
                      }}
                      data-tooltip={isExpanded ? "Show less" : "Show more"}
                      aria-label={isExpanded ? "Collapse text" : "Expand text"}
                    >
                      {isExpanded ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  )}
                </div>

                <div className="comments-section">
                  <div className="section-header">
                    <h4>Your Comments</h4>
                  </div>

                  <ul className="comment-list">
                    {query.commentsList.map((comment) => (
                      <CommentItem key={comment.id} comment={comment} />
                    ))}
                  </ul>
                </div>

                {/* Comments Section */}
                <div className="comments-section">
                  <div className="section-header">
                    <h4>Agent Replies</h4>
                  </div>

                  <ul className="comment-list">
                    {query.agentsList.map((agent) => (
                      <AgentItem key={agent.id} agent={agent} />
                    ))}
                  </ul>

                  <div className="load-more-btn">
                    <a className="item-btn">
                      Load More Agents <span>4+</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQueryDetail;
