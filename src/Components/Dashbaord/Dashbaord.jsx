import React, { useState, useEffect } from "react";
import {
  FiEye,
  FiEdit,
  FiStar,
  FiBell,
  FiMail,
  FiUserX,
  FiPieChart,
  FiActivity,
  FiPause,
} from "react-icons/fi";
import {
  FaChartBar,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import "./Dashboard.css";

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
  const [loading, setLoading] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
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
          user: "John Smith",
          status: "active",
          timestamp: "2 mins ago",
          type: "technical",
        },
        {
          id: 2,
          title: "Account verification problem",
          user: "Sarah Johnson",
          status: "active",
          timestamp: "15 mins ago",
          type: "billing",
        },
        {
          id: 3,
          title: "Feature request - Dark mode",
          user: "Mike Chen",
          status: "inactive",
          timestamp: "1 hour ago",
          type: "feature",
        },
        {
          id: 4,
          title: "Bug report - Login page",
          user: "Emily Davis",
          status: "active",
          timestamp: "2 hours ago",
          type: "bug",
        },
      ]);
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon, color, description }) => (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3 className="stat-value">{loading ? "..." : value}</h3>
        <p className="stat-title">{title}</p>
        
        {description && <p className="stat-description">{description}</p>}
      </div>
    </div>
  );

  const QueryTypeBadge = ({ type }) => {
    const typeConfig = {
      technical: {
        label: "Technical",
        class: "technical",
        icon: <FiActivity />,
      },
      billing: { label: "Billing", class: "billing", icon: <FaChartBar /> },
      feature: { label: "Feature", class: "feature", icon: <FiStar /> },
      bug: { label: "Bug", class: "bug", icon: <FaExclamationTriangle /> },
      general: { label: "General", class: "general", icon: <FiPieChart /> },
    };

    const config = typeConfig[type] || typeConfig.general;

    return (
      <span className={`query-type-badge ${config.class}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const StatusBadge = ({ status }) => (
    <span className={`status-badge ${status}`}>
      {status === "active" ? <FaCheckCircle /> : <FaTimesCircle />}
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );

  

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard Overview</h1>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Queries"
          value={stats.totalQueries}
          icon={<FiPieChart className="stat-icon-svg" />}
          color="blue"
          
          description="All time queries"
        />

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

        <StatCard
          title="Notifications"
          value={stats.notifications}
          icon={<FiBell className="stat-icon-svg" />}
          color="purple"
          description="Pending notifications"
        />

        <StatCard
          title="Unread Queries"
          value={stats.unreadQueries}
          icon={<FiMail className="stat-icon-svg" />}
          color="red"
          description="Require attention"
        />

        <StatCard
          title="Blocked Agents"
          value={stats.blockedAgents}
          icon={<FiUserX className="stat-icon-svg" />}
          color="gray"
          description="Blocked service agents"
        />
      </div>

      <div className="dashboard-content">
        {/* Recent Queries Section */}
        <div className="content-section">
          <div className="section-header">
            <h2>Recent Queries</h2>
            <a href="/myQueries" className="view-all-link">
              View All →
            </a>
          </div>
          <div className="recent-queries">
            {recentQueries.map((query) => (
              <div key={query.id} className="dashboard-query-item">
                <div className="query-main">
                  <div className="query-title-section">
                    <h4 className="query-title">{query.title}</h4>
                    <div className="query-meta">
                      <QueryTypeBadge type={query.type} />
                      <StatusBadge status={query.status} />
                    </div>
                  </div>
                  <div className="query-info">
                    <span className="query-user">By {query.user}</span>
                    <span className="query-time">{query.timestamp}</span>
                  </div>
                </div>
                <div className="query-actions">
                  <button className="btn-action view">
                    <FiEye className="icon" />
                  </button>
                  <button className="btn-action edit">
                    <FiEdit className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
