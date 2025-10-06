import React, { useState, useEffect } from "react";
import {
  FiEye,
  FiEdit,
  FiActivity,
  FiPause,
  FiMessageSquare,
  FiUser,
  FiPlus,
  FiInbox
} from "react-icons/fi";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaComment,
  FaUserCircle,
} from "react-icons/fa";
import { Skeleton, Box } from "@mui/material";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalQueries: 0,
    activeQueries: 0,
    inactiveQueries: 0,
    notifications: 0,
    unreadQueries: 0,
    blockedAgents: 0,
  });
  const [recentQueries, setRecentQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalQueries: 156,
        activeQueries: 42,
        inactiveQueries: 114,
        notifications: 23,
        unreadQueries: 8,
        blockedAgents: 3,
      });

      setRecentQueries([
        {
          id: 1,
          title: "Payment gateway integration issue",
          status: "active",
          description: "Unable to process payments through the gateway",
          createdAt: "2024-01-15T10:30:00",
          agents: [
            {
              id: 1,
              name: "John Doe",
              profile: "media/figure/chat_5.jpg",
              lastMessage: "We're looking into the payment gateway issue",
              lastMessageTime: "2024-01-15T14:20:00",
              isOnline: true,
            },
            {
              id: 2,
              name: "Sarah Wilson",
              profile: "media/figure/chat_5.jpg",
              lastMessage: "Can you share the error screenshot?",
              lastMessageTime: "2024-01-15T13:45:00",
              isOnline: false,
            },
          ],
          comments: [
            {
              id: 1,
              text: "Facing this issue since morning",
              timestamp: "2024-01-15T10:30:00",
              type: "user",
            },
          ],
        },
        {
          id: 2,
          title: "Account verification problem",
          status: "active",
          description: "Documents not getting verified automatically",
          createdAt: "2024-01-14T09:15:00",
          agents: [
            {
              id: 3,
              name: "Mike Johnson",
              profile: "media/figure/chat_5.jpg",
              lastMessage: "Your documents are under review",
              lastMessageTime: "2024-01-15T11:30:00",
              isOnline: true,
            },
          ],
          comments: [
            {
              id: 1,
              text: "Uploaded all required documents",
              timestamp: "2024-01-14T09:15:00",
              type: "user",
            },
          ],
        },
        {
          id: 3,
          title: "Feature request - Dark mode",
          status: "inactive",
          description: "Request for dark mode theme implementation",
          createdAt: "2024-01-10T16:45:00",
          agents: [
            {
              id: 4,
              name: "Emily Chen",
              profile: "media/figure/chat_5.jpg",
              lastMessage: "Feature added to roadmap",
              lastMessageTime: "2024-01-12T10:15:00",
              isOnline: true,
            },
          ],
          comments: [],
        },
        {
          id: 4,
          title: "Bug report - Login page",
          status: "active",
          description: "Login button not working on mobile devices",
          createdAt: "2024-01-15T08:20:00",
          agents: [
            {
              id: 5,
              name: "David Brown",
              profile: "media/figure/chat_5.jpg",
              lastMessage: "We've identified the CSS issue",
              lastMessageTime: "2024-01-15T15:45:00",
              isOnline: true,
            },
            {
              id: 6,
              name: "Lisa Wang",
              profile: "media/figure/chat_5.jpg",
              lastMessage: "Fix will be deployed tomorrow",
              lastMessageTime: "2024-01-15T14:30:00",
              isOnline: false,
            },
          ],
          comments: [],
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const toggleQueryStatus = (queryId) => {
    setRecentQueries((prevQueries) =>
      prevQueries.map((query) =>
        query.id === queryId
          ? {
              ...query,
              status: query.status === "active" ? "inactive" : "active",
            }
          : query
      )
    );
  };

  const addComment = (queryId) => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      text: newComment,
      timestamp: new Date().toISOString(),
      type: "user",
    };

    setRecentQueries((prevQueries) =>
      prevQueries.map((query) =>
        query.id === queryId
          ? {
              ...query,
              comments: [...query.comments, comment],
            }
          : query
      )
    );

    setNewComment("");
    setSelectedQuery(null);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const StatCard = ({ title, value, icon, color, description }) => (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        {loading ? (
          <Skeleton variant="text" width={60} height={30} />
        ) : (
          <h3 className="stat-value">{value}</h3>
        )}
        <p className="stat-title">{title}</p>
        {description && <p className="stat-description">{description}</p>}
      </div>
    </div>
  );

  const StatusBadge = ({ status, onClick }) => (
    <span
      className={`status-badge ${status} ${onClick ? "clickable" : ""}`}
      onClick={onClick}
    >
      {status === "active" ? <FaCheckCircle /> : <FaTimesCircle />}
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );

  const AgentCard = ({ agent }) => (
    <div className="agent-card">
      <div className="agent-profile">
        <img src={agent.profile} alt={agent.name} />
        <span
          className={`online-status ${agent.isOnline ? "online" : "offline"}`}
        ></span>
      </div>
      <div className="agent-info">
        <h5 className="agent-name">
          {" "}
          <Link className="agent-name" to={`/messages`}>
            {agent.name}
          </Link>{" "}
        </h5>
        <p className="agent-last-message">{agent.lastMessage}</p>
        <span className="agent-last-time">
          {formatDateTime(agent.lastMessageTime)}
        </span>
      </div>
    </div>
  );

  const EmptyQueriesState = () => (
    <div className="empty-queries-state">
      <div className="empty-state-icon">
        <FiInbox />
      </div>
      <h3>No Queries Yet</h3>
      <p>You haven't created any queries yet. Start by creating your first query to get help from our support team.</p>
      <button 
        className="btn-primary large"
        onClick={() => navigate("/newQueries")}
      >
        <FiPlus className="icon" />
        Create Your First Query
      </button>
      <div className="empty-state-features">
        <div className="feature-item">
          <FaCheckCircle className="feature-icon" />
          <span>Get instant support from our agents</span>
        </div>
        <div className="feature-item">
          <FaCheckCircle className="feature-icon" />
          <span>Track your query progress in real-time</span>
        </div>
        <div className="feature-item">
          <FaCheckCircle className="feature-icon" />
          <span>Communicate directly with assigned agents</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard Overview</h1>
          <p>Manage your queries and track their progress</p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        <StatCard
          title="Active Queries"
          value={stats.activeQueries}
          icon={<FiActivity className="stat-icon-svg" />}
          color="green"
          description="Currently active"
        />

        <StatCard
          title="Inactive Queries"
          value={stats.inactiveQueries}
          icon={<FiPause className="stat-icon-svg" />}
          color="orange"
          description="Resolved queries"
        />
      </div>

      <div className="dashboard-content">
        {/* Recent Queries Section */}
        <div className="content-section">
          <div className="section-header">
            <h2>My Active Queries</h2>
            {recentQueries.length > 0 && (
              <button
                className="btn-action view"
                onClick={() => navigate("/newQueries")}
                style={{
                  marginLeft: "17px",
                  borderRadius: "25px",
                  padding: "6px 16px",
                }}
              >
                <FiPlus className="icon" />
                Add New Query
              </button>
            )}
          </div>

          <div className="recent-queries">
            {loading ? (
              // Loading skeletons
              Array.from(new Array(3)).map((_, index) => (
                <Box
                  key={index}
                  className="dashboard-query-item"
                  sx={{ display: "flex", gap: 2, alignItems: "center" }}
                >
                  <Skeleton variant="rectangular" width={60} height={60} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="80%" height={20} />
                    <Skeleton variant="text" width="40%" height={15} />
                  </Box>
                  <Skeleton variant="circular" width={30} height={30} />
                </Box>
              ))
            ) : recentQueries.length > 0 ? (
              // Queries list
              recentQueries.map((query) => (
                <div key={query.id} className="dashboard-query-item">
                  <div className="query-main">
                    <div className="query-title-section">
                      <div className="query-header">
                        <h4 className="query-title">{query.title}</h4>
                        <StatusBadge
                          status={query.status}
                          onClick={() => toggleQueryStatus(query.id)}
                        />
                        <button
                          className="btn-action view"
                          onClick={() => setSelectedQuery(query)}
                          style={{
                            marginLeft: "17px",
                            borderRadius: "25px",
                            padding: "6px 16px",
                          }}
                        >
                          Add Comment
                        </button>
                      </div>

                      {/* Comments Section */}
                      {query.comments.length > 0 && (
                        <div className="query-comments">
                          <h5 className="comments-title">
                            <FaComment className="icon" />
                            Your Comments ({query.comments.length})
                          </h5>
                          <div className="comments-list">
                            {query.comments.map((comment) => (
                              <div key={comment.id} className="comment-item">
                                <p className="comment-text">{comment.text}</p>
                                <span className="comment-time">
                                  {formatDateTime(comment.timestamp)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Agents Section */}
                      <div className="query-agents">
                        <h5 className="agents-title">
                          <FiUser className="icon" />
                          Assigned Agents ({query.agents.length})
                        </h5>
                        <div className="agents-list">
                          {query.agents.map((agent) => (
                            <AgentCard key={agent.id} agent={agent} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Empty state
              <EmptyQueriesState />
            )}
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      {selectedQuery && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Comment to Query</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedQuery(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="query-preview">{selectedQuery.title}</p>
              <textarea
                className="comment-textarea"
                placeholder="Type your comment here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="4"
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setSelectedQuery(null)}
              >
                Cancel
              </button>
              <button
                className="btn-submit"
                onClick={() => addComment(selectedQuery.id)}
                disabled={!newComment.trim()}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
