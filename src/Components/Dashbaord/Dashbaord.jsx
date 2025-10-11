import React, { useState, useEffect } from "react";
import {
  FiActivity,
  FiPause,
  FiPlus,
  FiInbox,
  FiClock,
  FiSearch,
  FiEye,
} from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { Skeleton, Box, Chip } from "@mui/material";
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
  const [searchTerm, setSearchTerm] = useState("");
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
          title: "Payment Gateway Integration Issue",
          status: "active",
          description:
            "Unable to process payments through the gateway. Customers are reporting failed transactions and error messages when trying to complete purchases.",
          shortDescription: "Unable to process payments through the gateway",
          createdAt: "2024-01-15T10:30:00",
          activeHours: "6:00 AM - 8:00 PM",
          priority: "high",
          category: "Technical",
          agents: [
            {
              id: 1,
              name: "John Doe",
              profile:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
              lastMessage:
                "We're looking into the payment gateway issue and will update you shortly.",
              lastMessageImage:
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
              lastMessageTime: "2024-01-15T14:20:00",
              isOnline: true,
              rating: 4.5,
              totalReviews: 23,
              unreadCount: 3,
              department: "Technical Support",
            },
            {
              id: 2,
              name: "Sarah Wilson",
              profile:
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
              lastMessage:
                "Can you share the error screenshot? This will help us diagnose the issue faster.",
              lastMessageImage: null,
              lastMessageTime: "2024-01-15T13:45:00",
              isOnline: false,
              rating: 4.8,
              totalReviews: 45,
              unreadCount: 1,
              department: "Payment Solutions",
            },
          ],
          comments: [
            {
              id: 1,
              text: "Facing this issue since morning, urgent resolution needed.",
              timestamp: "2024-01-15T10:30:00",
              type: "user",
            },
          ],
          totalUnread: 4,
          total_treads: 2,
          lastUpdated: "2024-01-15T14:20:00",
        },
        {
          id: 2,
          title: "Account Verification Problem",
          status: "active",
          description:
            "Documents not getting verified automatically. The system is rejecting valid ID documents and proof of address. Manual verification works but takes 24-48 hours.",
          shortDescription: "Documents not getting verified automatically",
          createdAt: "2024-01-14T09:15:00",
          activeHours: "6:00 AM - 8:00 PM",
          priority: "medium",
          category: "Account",
          agents: [
            {
              id: 3,
              name: "Mike Johnson",
              profile:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
              lastMessage:
                "Your documents are under review. We'll complete verification within 24 hours.",
              lastMessageImage: null,
              lastMessageTime: "2024-01-15T11:30:00",
              isOnline: true,
              rating: 4.2,
              totalReviews: 12,
              unreadCount: 0,
              department: "Verification Team",
            },
          ],
          comments: [
            {
              id: 1,
              text: "Uploaded all required documents last week but still pending.",
              timestamp: "2024-01-14T09:15:00",
              type: "user",
            },
          ],
          total_treads: 2,
          totalUnread: 0,
          lastUpdated: "2024-01-15T11:30:00",
        },
        {
          id: 3,
          title: "Dark Mode Feature Request",
          status: "active",
          description:
            "Request for dark mode theme implementation to reduce eye strain and improve battery life on mobile devices. Many users have requested this feature.",
          shortDescription: "Request for dark mode theme implementation",
          createdAt: "2024-01-10T16:45:00",
          activeHours: "6:00 AM - 8:00 PM",
          priority: "low",
          category: "Feature Request",
          agents: [
            {
              id: 4,
              name: "Emily Chen",
              profile:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
              lastMessage:
                "Great suggestion! We've added this to our product roadmap for Q2 2024.",
              lastMessageImage:
                "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=300&h=200&fit=crop",
              lastMessageTime: "2024-01-12T10:15:00",
              isOnline: true,
              rating: 4.9,
              totalReviews: 67,
              unreadCount: 2,
              department: "Product Team",
            },
          ],
          total_treads: 2,
          comments: [],
          totalUnread: 2,
          lastUpdated: "2024-01-12T10:15:00",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { class: "status-active", label: "Active", color: "#10b981" },
      inactive: {
        class: "status-inactive",
        label: "Inactive",
        color: "#6b7280",
      },
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span
        className={`status-badge ${config.class}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          color: config.color,
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        <FaCircle size={8} />
        {config.label}
      </span>
    );
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

  const EmptyQueriesState = () => (
    <div className="empty-queries-state">
      <div className="empty-state-icon">
        <FiInbox />
      </div>
      <h3>No Queries Found</h3>
      <p>
        No queries match your current filters. Try adjusting your search or
        create a new query.
      </p>
      <button
        className="btn-primary large"
        onClick={() => navigate("/newQueries")}
      >
        <FiPlus className="icon" />
        Create New Query
      </button>
    </div>
  );

  const handleViewQuery = () => {
    navigate("/myQueryDetail");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 style={{ textAlign: "start" }}>Welcome Suraj</h1>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        <StatCard
          title="Active Queries"
          value={stats.activeQueries}
          icon={<FiActivity className="stat-icon-svg" />}
          color="green"
        />

        <StatCard
          title="Inactive Queries"
          value={stats.inactiveQueries}
          icon={<FiPause className="stat-icon-svg" />}
          color="orange"
        />
      </div>

      <div className="dashboard-content">
        {/* Recent Queries Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">
              <h2>My Active Queries</h2>
            </div>
            {recentQueries.length > 0 && (
              <button
                className="btn-primary"
                onClick={() => navigate("/newQueries")}
              >
                <FiPlus className="icon" />
                New Query
              </button>
            )}
          </div>

          {/* Filters and Search */}
          <div className="table-controls">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Queries Table */}
          <div className="queries-table-container">
            {loading ? (
              // Loading skeletons for table
              <div className="table-skeleton">
                {Array.from(new Array(5)).map((_, index) => (
                  <div key={index} className="table-row-skeleton">
                    <Skeleton variant="text" width="20%" height={20} />
                    <Skeleton variant="text" width="15%" height={20} />
                    <Skeleton variant="text" width="15%" height={20} />
                    <Skeleton variant="text" width="15%" height={20} />
                    <Skeleton variant="text" width="10%" height={20} />
                    <Skeleton variant="text" width="15%" height={20} />
                  </div>
                ))}
              </div>
            ) : recentQueries.length > 0 ? (
              // Queries Table
              <div className="queries-table">
                {/* Table Header */}
                <div className="table-header">
                  <div className="table-cell">Sr No</div>
                  <div className="table-cell">Query</div>
                  <div className="table-cell">Total Treads</div>
                  <div className="table-cell">New Messages</div>
                  <div className="table-cell">Status</div>
                  <div className="table-cell">Last Updated</div>
                  <div className="table-cell">Actions</div>
                </div>

                {/* Table Body */}
                <div className="table-body">
                  {recentQueries.map((query) => (
                    <div
                      key={query.id}
                      className="table-row"
                      onClick={handleViewQuery}
                    >
                      <div className="table-cell">{query.id}</div>
                      <div className="table-cell">
                        <div className="query-title-cell">
                          <p className="query-description">
                            {query.shortDescription}
                          </p>
                        </div>
                      </div>

                      <div className="table-cell">{query.total_treads}</div>

                      <div className="table-cell">{query.totalUnread}</div>

                      <div className="table-cell">
                        {getStatusBadge(query.status)}
                      </div>

                      <div className="table-cell">
                        <div className="date-cell">
                          <FiClock className="date-icon" />
                          {formatDate(query.lastUpdated)}
                        </div>
                      </div>

                      <div className="table-cell">
                        <div className="action-buttons">
                          <button
                            className="action-btn view-btn"
                            onClick={handleViewQuery}
                          >
                            <FiEye size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyQueriesState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
