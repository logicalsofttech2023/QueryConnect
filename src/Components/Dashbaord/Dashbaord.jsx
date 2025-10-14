import React, { useState, useEffect } from "react";
import {
  FiActivity,
  FiPause,
  FiPlus,
  FiInbox,
  FiClock,
  FiSearch,
  FiEye,
  FiMessageCircle,
} from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Skeleton,
  Button,
  Avatar,
  AvatarGroup,
  Tooltip,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

// Styled components
const StatCard = styled(Card)(({ theme, color }) => ({
  background: `linear-gradient(135deg, ${theme.palette[color].light} 0%, ${theme.palette[color].main} 100%)`,
  color: theme.palette.common.white,
  borderRadius: theme.spacing(2),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: alpha(theme.palette.common.white, 0.1),
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  "& .MuiTableHead-root": {
    backgroundColor: theme.palette.grey[50],
  },
  "& .MuiTableCell-head": {
    fontWeight: 600,
    color: theme.palette.text.secondary,
    borderBottom: `2px solid ${theme.palette.grey[200]}`,
  },
  "& .MuiTableCell-body": {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
}));

const QueryRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateY(-1px)",
    boxShadow: theme.shadows[1],
  },
  "&:last-child td, &:last-child th": {
    borderBottom: 0,
  },
}));



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
  const theme = useTheme();
  
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));  // mobile
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "md")); // tablet
  const isLg = useMediaQuery(theme.breakpoints.up("md")); // desktop

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

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      active: { label: "Active", color: "success" },
      inactive: { label: "Inactive", color: "default" },
    };

    const config = statusConfig[status] || statusConfig.inactive;

    return (
      <Chip
        label={
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <FaCircle size={8} />
            {config.label}
          </Box>
        }
        color={config.color}
        variant="outlined"
        size="small"
      />
    );
  };

  const handleViewQuery = (queryId) => {
    navigate("/messages", { state: { queryId } });
  };

  const StatCardComponent = ({ title, value, icon, color, description }) => (
    <StatCard color={color}>
      <CardContent sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {loading ? (
              <Skeleton
                variant="text"
                width={60}
                height={40}
                sx={{ bgcolor: "rgba(255,255,255,0.3)" }}
              />
            ) : (
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: "white" }}>
                {value}
              </Typography>
            )}
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 600 , color: "white" }}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                {description}
              </Typography>
            )}
          </Box>
          <Box sx={{ color: "rgba(255,255,255,0.8)" }}>{icon}</Box>
        </Box>
      </CardContent>
    </StatCard>
  );

  const EmptyQueriesState = () => (
    <Paper sx={{ p: 6, textAlign: "center" }}>
      <Box sx={{ color: theme.palette.text.secondary, mb: 2 }}>
        <FiInbox size={64} />
      </Box>
      <Typography variant="h6" gutterBottom>
        No Queries Found
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        No queries match your current filters. Try adjusting your search or
        create a new query.
      </Typography>
      <Button
        variant="contained"
        startIcon={<FiPlus />}
        onClick={() => navigate("/newQueries")}
        size="large"
      >
        Create New Query
      </Button>
    </Paper>
  );

  return (
    <Box sx={{ p: 3, mt: 10 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Welcome Suraj
        </Typography>
      </Box>

      {/* Statistics Grid */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            },
            gap: 3,
          }}
        >
          <StatCardComponent
            title="Active Queries"
            value={stats.activeQueries}
            icon={<FiActivity size={32} />}
            color="primary"
          />
        </Box>
      </Box>

      {/* Recent Queries Section */}
      <Card
        sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Section Header */}
          <Box
            sx={{
              p: 3,
              pb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" fontWeight="600" >
              My Active Queries
            </Typography>
            {recentQueries.length > 0 && (
              <Button
                variant="contained"
                startIcon={<FiPlus />}
                onClick={() => navigate("/newQueries")}
                style={{ fontSize: isXs ? "10px" : isMd ? "11px" : "20px" }}
              >
                New Query
              </Button>
            )}
          </Box>

          {/* Search Box */}
          <Box sx={{ px: 3, pb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiSearch />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Queries Table */}
          <Box sx={{ p: 1 }}>
            {loading ? (
              // Loading skeletons
              <Box sx={{ p: 2 }}>
                {Array.from(new Array(5)).map((_, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", gap: 2, mb: 2, p: 2 }}
                  >
                    <Skeleton variant="text" width="5%" height={40} />
                    <Skeleton variant="text" width="30%" height={40} />
                    <Skeleton variant="text" width="15%" height={40} />
                    <Skeleton variant="text" width="10%" height={40} />
                    <Skeleton variant="text" width="15%" height={40} />
                    <Skeleton variant="text" width="15%" height={40} />
                    <Skeleton variant="text" width="10%" height={40} />
                  </Box>
                ))}
              </Box>
            ) : recentQueries.length > 0 ? (
              <StyledTableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 800 }}>
  <TableHead>
    <TableRow>
      <TableCell sx={{ width: "8%" }}>ID</TableCell>
      <TableCell sx={{ width: "47%" }}>Query</TableCell>
      <TableCell sx={{ width: "8%" }}>Threads</TableCell>
      <TableCell sx={{ width: "8%" }}>Unread</TableCell>
      <TableCell sx={{ width: "12%" }}>Status</TableCell>
      <TableCell sx={{ width: "15%" }}>Last Updated</TableCell>
    </TableRow>
  </TableHead>

  <TableBody>
    {recentQueries.map((query) => (
      <QueryRow key={query.id} hover onClick={() => handleViewQuery(query.id)}>
        <TableCell>
          <Typography variant="body2" fontWeight="600">
            #{query.id}
          </Typography>
        </TableCell>

        {/* Make Query column wider */}
        <TableCell sx={{ width: "40%" }}>
          <Box>
            <Typography variant="body2" color="text.secondary" noWrap={false}>
              {query.shortDescription
                ? query.shortDescription.length > 150
                  ? query.shortDescription.slice(0, 150) + "..."
                  : query.shortDescription
                : ""}
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Chip label={query.total_treads} size="small" variant="outlined" />
        </TableCell>

        <TableCell>
          {query.totalUnread > 0 ? (
            <Chip label={query.totalUnread} size="small" color="error" />
          ) : (
            <Typography variant="body2" color="text.secondary">
              -
            </Typography>
          )}
        </TableCell>

        <TableCell>{getStatusChip(query.status)}</TableCell>

        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FiClock size={14} color={theme.palette.text.secondary} />
            <Box>
              <Typography variant="body2" fontWeight="500">
                {formatDate(query.lastUpdated)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatTime(query.lastUpdated)}
              </Typography>
            </Box>
          </Box>
        </TableCell>
      </QueryRow>
    ))}
  </TableBody>
</Table>

              </StyledTableContainer>
            ) : (
              <EmptyQueriesState />
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
