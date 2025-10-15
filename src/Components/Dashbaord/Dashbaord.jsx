import React, { useState, useEffect } from "react";
import { FiActivity, FiPlus, FiInbox, FiClock, FiSearch } from "react-icons/fi";
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
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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

  // Responsive breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // mobile
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // tablet
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // desktop

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
          shortDescription:
            "Unable to process payments through the gateway. Customers are reporting failed transactions and error messages.",
          total_treads: 2,
          totalUnread: 4,
          lastUpdated: "2024-01-15T14:20:00",
        },
        {
          id: 2,
          title: "Account Verification Problem",
          status: "active",
          shortDescription:
            "Documents not getting verified automatically. The system is rejecting valid ID documents.",
          total_treads: 2,
          totalUnread: 0,
          lastUpdated: "2024-01-15T11:30:00",
        },
        {
          id: 3,
          title: "Dark Mode Feature Request",
          status: "active",
          shortDescription:
            "Request for dark mode theme implementation to reduce eye strain.",
          total_treads: 2,
          totalUnread: 2,
          lastUpdated: "2024-01-12T10:15:00",
        },
        {
          id: 4,
          title: "App Crash on Startup",
          status: "active",
          shortDescription:
            "Users are reporting that the app crashes immediately after launch on Android 14.",
          total_treads: 3,
          totalUnread: 5,
          lastUpdated: "2024-01-16T09:40:00",
        },
        {
          id: 5,
          title: "Email Notification Delay",
          status: "pending",
          shortDescription:
            "Email notifications are being sent with a delay of more than 30 minutes.",
          total_treads: 1,
          totalUnread: 0,
          lastUpdated: "2024-01-17T15:10:00",
        },
        {
          id: 6,
          title: "Unable to Upload Profile Picture",
          status: "active",
          shortDescription:
            "Profile picture upload fails intermittently with 500 internal server error.",
          total_treads: 2,
          totalUnread: 3,
          lastUpdated: "2024-01-18T12:00:00",
        },
        {
          id: 7,
          title: "Password Reset Link Expired",
          status: "resolved",
          shortDescription:
            "Password reset links are expiring too quickly before users can complete the reset.",
          total_treads: 2,
          totalUnread: 0,
          lastUpdated: "2024-01-19T08:30:00",
        },
        {
          id: 8,
          title: "Mobile View UI Bug",
          status: "active",
          shortDescription:
            "The navigation bar overlaps content on mobile view when keyboard is open.",
          total_treads: 1,
          totalUnread: 1,
          lastUpdated: "2024-01-20T10:45:00",
        },
        {
          id: 9,
          title: "Search Function Not Working",
          status: "active",
          shortDescription:
            "Search returns no results even for valid queries after the recent update.",
          total_treads: 3,
          totalUnread: 2,
          lastUpdated: "2024-01-21T14:10:00",
        },
        {
          id: 10,
          title: "API Rate Limit Exceeded",
          status: "active",
          shortDescription:
            "API responses are failing due to frequent rate limit breaches during peak hours.",
          total_treads: 2,
          totalUnread: 0,
          lastUpdated: "2024-01-22T13:50:00",
        },
        {
          id: 11,
          title: "Login Session Timeout",
          status: "pending",
          shortDescription:
            "User sessions are expiring within 5 minutes even with the 'Remember Me' option checked.",
          total_treads: 1,
          totalUnread: 1,
          lastUpdated: "2024-01-22T17:30:00",
        },
        {
          id: 12,
          title: "Duplicate Entries in Reports",
          status: "active",
          shortDescription:
            "Report generation shows duplicate data for some users in monthly summaries.",
          total_treads: 2,
          totalUnread: 4,
          lastUpdated: "2024-01-23T11:15:00",
        },
        {
          id: 13,
          title: "Payment Refund Delay",
          status: "resolved",
          shortDescription:
            "Refunds are taking longer than expected to process through Razorpay gateway.",
          total_treads: 3,
          totalUnread: 0,
          lastUpdated: "2024-01-24T09:10:00",
        },
        {
          id: 14,
          title: "Analytics Dashboard Loading Slow",
          status: "active",
          shortDescription:
            "The analytics dashboard takes more than 10 seconds to load user metrics.",
          total_treads: 4,
          totalUnread: 1,
          lastUpdated: "2024-01-25T10:50:00",
        },
        {
          id: 15,
          title: "Push Notifications Not Received",
          status: "pending",
          shortDescription:
            "Push notifications are not being received on iOS devices, though Android works fine.",
          total_treads: 2,
          totalUnread: 2,
          lastUpdated: "2024-01-26T12:20:00",
        },
        {
          id: 16,
          title: "User Data Export Fails",
          status: "active",
          shortDescription:
            "Exporting user data as CSV results in incomplete files or encoding issues.",
          total_treads: 1,
          totalUnread: 1,
          lastUpdated: "2024-01-27T13:00:00",
        },
        {
          id: 17,
          title: "SMS OTP Not Delivered",
          status: "active",
          shortDescription:
            "Users are not receiving OTPs via SMS during login from certain regions.",
          total_treads: 2,
          totalUnread: 3,
          lastUpdated: "2024-01-28T11:45:00",
        },
        {
          id: 18,
          title: "Broken Image Links in Gallery",
          status: "active",
          shortDescription:
            "Some images in the gallery fail to load after being moved to a new CDN.",
          total_treads: 3,
          totalUnread: 1,
          lastUpdated: "2024-01-29T15:40:00",
        },
        {
          id: 19,
          title: "Filter Option Not Working",
          status: "active",
          shortDescription:
            "Filtering by date and category does not update the list dynamically.",
          total_treads: 1,
          totalUnread: 0,
          lastUpdated: "2024-01-30T09:35:00",
        },
        {
          id: 20,
          title: "Slow File Uploads",
          status: "active",
          shortDescription:
            "File uploads above 10MB are taking too long to complete or time out.",
          total_treads: 2,
          totalUnread: 4,
          lastUpdated: "2024-01-31T16:25:00",
        },
        {
          id: 21,
          title: "Customer Chat Widget Bug",
          status: "active",
          shortDescription:
            "Chat widget overlaps footer section on small screens and blocks buttons.",
          total_treads: 2,
          totalUnread: 1,
          lastUpdated: "2024-02-01T09:40:00",
        },
        {
          id: 22,
          title: "Translation Errors in Spanish",
          status: "resolved",
          shortDescription:
            "Several UI labels in the Spanish version show incorrect translations.",
          total_treads: 1,
          totalUnread: 0,
          lastUpdated: "2024-02-02T10:10:00",
        },
        {
          id: 23,
          title: "Coupon Code Validation Fails",
          status: "active",
          shortDescription:
            "Discount coupons are being rejected as invalid even though they are active.",
          total_treads: 3,
          totalUnread: 2,
          lastUpdated: "2024-02-03T12:00:00",
        },
        {
          id: 24,
          title: "App Update Not Reflecting on Play Store",
          status: "pending",
          shortDescription:
            "Users report not seeing the latest update even after it was published.",
          total_treads: 2,
          totalUnread: 0,
          lastUpdated: "2024-02-04T14:10:00",
        },
        {
          id: 25,
          title: "Search Index Not Updating",
          status: "active",
          shortDescription:
            "Newly added posts are not appearing in search results until manual reindexing.",
          total_treads: 4,
          totalUnread: 1,
          lastUpdated: "2024-02-05T11:30:00",
        },
        {
          id: 26,
          title: "Data Sync Delay in Cloud",
          status: "active",
          shortDescription:
            "Cloud sync between mobile and web versions is delayed by up to 10 minutes.",
          total_treads: 2,
          totalUnread: 2,
          lastUpdated: "2024-02-06T09:45:00",
        },
        {
          id: 27,
          title: "Invoice PDF Not Downloading",
          status: "resolved",
          shortDescription:
            "Clicking 'Download Invoice' results in blank PDF files for some users.",
          total_treads: 3,
          totalUnread: 0,
          lastUpdated: "2024-02-07T13:20:00",
        },
        {
          id: 28,
          title: "Google Login Redirect Loop",
          status: "active",
          shortDescription:
            "Users logging in via Google are stuck in a continuous redirect loop.",
          total_treads: 2,
          totalUnread: 3,
          lastUpdated: "2024-02-08T16:15:00",
        },
        {
          id: 29,
          title: "Notification Badge Count Incorrect",
          status: "pending",
          shortDescription:
            "Notification icon shows unread count even after viewing all messages.",
          total_treads: 2,
          totalUnread: 1,
          lastUpdated: "2024-02-09T10:50:00",
        },
        {
          id: 30,
          title: "User Role Permissions Error",
          status: "active",
          shortDescription:
            "Admins are unable to assign 'editor' role to users due to permission mismatch.",
          total_treads: 3,
          totalUnread: 4,
          lastUpdated: "2024-02-10T15:00:00",
        },
        {
          id: 31,
          title: "Webhook Delivery Failures",
          status: "active",
          shortDescription:
            "Outgoing webhooks are failing intermittently with 503 server errors.",
          total_treads: 2,
          totalUnread: 2,
          lastUpdated: "2024-02-11T11:10:00",
        },
        {
          id: 32,
          title: "App Version Mismatch Warning",
          status: "active",
          shortDescription:
            "Users are prompted with 'App Version Mismatch' even after updating to latest version.",
          total_treads: 1,
          totalUnread: 0,
          lastUpdated: "2024-02-12T12:35:00",
        },
        {
          id: 33,
          title: "Live Chat History Missing",
          status: "active",
          shortDescription:
            "Customer support chat history is not visible after session ends.",
          total_treads: 2,
          totalUnread: 3,
          lastUpdated: "2024-02-13T09:25:00",
        },
        {
          id: 34,
          title: "Incorrect Timezone Display",
          status: "pending",
          shortDescription:
            "Timestamps in activity logs are showing UTC instead of local time.",
          total_treads: 1,
          totalUnread: 1,
          lastUpdated: "2024-02-14T08:40:00",
        },
        {
          id: 35,
          title: "Form Validation Error",
          status: "resolved",
          shortDescription:
            "Certain required fields are not being validated correctly on submission.",
          total_treads: 2,
          totalUnread: 0,
          lastUpdated: "2024-02-15T14:10:00",
        },
        {
          id: 36,
          title: "Broken Links in Footer",
          status: "active",
          shortDescription:
            "Several footer links redirect to 404 pages on staging environment.",
          total_treads: 2,
          totalUnread: 1,
          lastUpdated: "2024-02-16T13:45:00",
        },
        {
          id: 37,
          title: "Incorrect Invoice Totals",
          status: "active",
          shortDescription:
            "Invoice totals are not including tax correctly after discount applied.",
          total_treads: 3,
          totalUnread: 2,
          lastUpdated: "2024-02-17T15:25:00",
        },
        {
          id: 38,
          title: "Duplicate Push Notifications",
          status: "pending",
          shortDescription:
            "Some users are receiving duplicate notifications for the same event.",
          total_treads: 1,
          totalUnread: 0,
          lastUpdated: "2024-02-18T10:00:00",
        },
        {
          id: 39,
          title: "Auto Logout After Idle",
          status: "active",
          shortDescription:
            "Users are logged out automatically after 2 minutes of inactivity.",
          total_treads: 2,
          totalUnread: 4,
          lastUpdated: "2024-02-19T09:50:00",
        },
        {
          id: 40,
          title: "Image Compression Issue",
          status: "active",
          shortDescription:
            "Images uploaded to gallery lose significant quality after compression.",
          total_treads: 2,
          totalUnread: 3,
          lastUpdated: "2024-02-20T11:20:00",
        },
        {
          id: 41,
          title: "Feedback Form Not Submitting",
          status: "resolved",
          shortDescription:
            "Feedback form shows success message but does not store the response.",
          total_treads: 1,
          totalUnread: 0,
          lastUpdated: "2024-02-21T12:15:00",
        },
        {
          id: 42,
          title: "Audio Playback Stops Randomly",
          status: "active",
          shortDescription:
            "Audio player stops unexpectedly in background mode on iOS devices.",
          total_treads: 3,
          totalUnread: 2,
          lastUpdated: "2024-02-22T09:40:00",
        },
        {
          id: 43,
          title: "Video Upload Failed",
          status: "pending",
          shortDescription:
            "Videos above 50MB fail to upload even with stable internet connection.",
          total_treads: 2,
          totalUnread: 1,
          lastUpdated: "2024-02-23T10:30:00",
        },
        {
          id: 44,
          title: "Map API Key Invalid",
          status: "active",
          shortDescription:
            "Google Maps integration is failing due to invalid or expired API key.",
          total_treads: 2,
          totalUnread: 0,
          lastUpdated: "2024-02-24T14:15:00",
        },
        {
          id: 45,
          title: "Order Summary Mismatch",
          status: "active",
          shortDescription:
            "Order summary shows different totals compared to checkout page.",
          total_treads: 2,
          totalUnread: 4,
          lastUpdated: "2024-02-25T13:05:00",
        },
        {
          id: 46,
          title: "Slow API Response Time",
          status: "active",
          shortDescription:
            "API endpoints are taking longer than expected to respond under heavy load.",
          total_treads: 3,
          totalUnread: 2,
          lastUpdated: "2024-02-26T11:00:00",
        },
        {
          id: 47,
          title: "Image Preview Not Loading",
          status: "active",
          shortDescription:
            "Image previews are not loading correctly when files are dragged and dropped.",
          total_treads: 1,
          totalUnread: 1,
          lastUpdated: "2024-02-27T10:30:00",
        },
        {
          id: 48,
          title: "App Notification Sound Missing",
          status: "pending",
          shortDescription:
            "Push notifications arrive silently without sound alerts on Android devices.",
          total_treads: 2,
          totalUnread: 1,
          lastUpdated: "2024-02-28T09:20:00",
        },
        {
          id: 49,
          title: "User Avatars Not Updating",
          status: "active",
          shortDescription:
            "Profile avatar updates do not reflect in chat components until reload.",
          total_treads: 2,
          totalUnread: 2,
          lastUpdated: "2024-02-29T16:40:00",
        },
        {
          id: 50,
          title: "PDF Export Missing Fonts",
          status: "active",
          shortDescription:
            "Exported PDF files are missing font styles, leading to inconsistent appearance.",
          total_treads: 2,
          totalUnread: 0,
          lastUpdated: "2024-03-01T11:50:00",
        },
      ]);

      setLoading(false);
    }, 2000);
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

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

  const StatCardComponent = ({ title, value, icon, color }) => (
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
              <Typography
                variant={isXs ? "h5" : "h3"}
                sx={{ fontWeight: 700, mb: 1, color: "white" }}
              >
                {value}
              </Typography>
            )}
            <Typography
              variant={isXs ? "subtitle1" : "h6"}
              sx={{ opacity: 0.9, fontWeight: 600, color: "white" }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ color: "rgba(255,255,255,0.8)" }}>{icon}</Box>
        </Box>
      </CardContent>
    </StatCard>
  );

  const EmptyQueriesState = () => (
    <Paper sx={{ p: isXs ? 4 : 6, textAlign: "center" }}>
      <Box sx={{ color: theme.palette.text.secondary, mb: 2 }}>
        <FiInbox size={isXs ? 48 : 64} />
      </Box>
      <Typography variant={isXs ? "h6" : "h5"} gutterBottom>
        No Queries Found
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, px: isXs ? 1 : 6 }}
      >
        No queries match your current filters. Try adjusting your search or
        create a new query.
      </Typography>
      <Button
        variant="contained"
        startIcon={<FiPlus />}
        onClick={() => navigate("/newQueries")}
        size={isXs ? "medium" : "large"}
      >
        Create New Query
      </Button>
    </Paper>
  );

  return (
    <Box sx={{ p: isXs ? 2 : 3, mt: isXs ? 8 : 10 }}>
      {/* Header */}
      <Box sx={{ mb: isXs ? 2 : 4 }}>
        <Typography variant={isXs ? "h5" : "h4"} fontWeight="700" gutterBottom>
          Welcome Suraj
        </Typography>
      </Box>

      {/* Statistics Grid */}
      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
            },
            gap: 3,
          }}
        >
          <StatCardComponent
            title="Active Queries"
            value={stats.activeQueries}
            icon={<FiActivity size={isXs ? 24 : 32} />}
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
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: isXs ? "column" : "row",
              gap: isXs ? 2 : 0,
              padding: "15px 0px 10px 0px"
            }}
          >
            <Typography
              variant={isXs ? "h6" : "h5"}
              fontWeight="600"
              textAlign={isXs ? "center" : "left"}
            >
              My Active Queries
            </Typography>
            {recentQueries.length > 0 && (
              <Button
                variant="contained"
                startIcon={<FiPlus />}
                onClick={() => navigate("/newQueries")}
                sx={{
                  fontSize: isXs ? "12px" : "25px",
                  width: isXs ? "100%" : "auto",
                }}
              >
                New Query
              </Button>
            )}
          </Box>

          {/* Search Box */}
          <Box sx={{ px: isXs ? 2 : 3, pb: 2 }}>
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
                  fontSize: isXs ? "13px" : "16px",
                },
              }}
            />
          </Box>

          {/* Table / Empty / Loading */}
          <Box sx={{ p: 1 }}>
            {loading ? (
              <Box sx={{ p: 2 }}>
                {Array.from(new Array(5)).map((_, i) => (
                  <Box key={i} sx={{ display: "flex", gap: 2, mb: 2, p: 2 }}>
                    <Skeleton variant="text" width="10%" height={40} />
                    <Skeleton variant="text" width="40%" height={40} />
                    <Skeleton variant="text" width="10%" height={40} />
                    <Skeleton variant="text" width="10%" height={40} />
                    <Skeleton variant="text" width="20%" height={40} />
                  </Box>
                ))}
              </Box>
            ) : recentQueries.length > 0 ? (
              <StyledTableContainer
                component={Paper}
                elevation={0}
                sx={{
                  maxHeight: isXs ? 400 : 500, // controls scrollable height
                  overflowY: "auto", // enables vertical scroll
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#ccc",
                    borderRadius: "4px",
                  },
                }}
              >
                <Table
                  sx={{ minWidth: isXs ? 300 : 800, tableLayout: "fixed" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: isXs ? "10%" : "10%" }}>
                        ID
                      </TableCell>
                      <TableCell sx={{ width: isXs ? "50%" : "60%" }}>
                        Query
                      </TableCell>
                      <TableCell sx={{ width: isXs ? "20%" : "15%" }}>
                        Threads
                      </TableCell>
                      <TableCell sx={{ width: isXs ? "20%" : "15%" }}>
                        Unread
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentQueries.map((query) => (
                      <QueryRow
                        key={query.id}
                        hover
                        onClick={() => handleViewQuery(query.id)}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight="600">
                            #{query.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: isXs ? 2 : 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {query.shortDescription}
                          </Typography>

                          <Typography
                            variant="body2"
                            fontWeight="500"
                            sx={{ marginTop: "10px" }}
                          >
                            {formatDate(query.lastUpdated)}{" "}
                            {formatTime(query.lastUpdated)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={query.total_treads}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          {query.totalUnread > 0 ? (
                            <Chip
                              label={query.totalUnread}
                              size="small"
                              color="error"
                            />
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              -
                            </Typography>
                          )}
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
