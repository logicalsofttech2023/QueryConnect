import React, { useState, useEffect } from "react";
import { FiActivity, FiPlus, FiInbox, FiClock, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
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
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const InactiveQueries = () => {
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
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "I'm trying to implement a drag and drop feature for file uploads in my React application. I've tried using the HTML5 drag and drop API but facing issues",
      time: "2023-10-01 10:00 AM",
    },
    {
      id: 2,
      text: "with React's synthetic events. The drag events are not firing properly and I'm having trouble managing the state during drag operations. Can",
      time: "2023-10-01 11:00 AM",
    },
    {
      id: 3,
      text: "someone help me with the best approach and maybe suggest some good libraries?",
      time: "2023-10-01 12:00 PM",
    },
  ]);

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
      <Typography
        variant={isXs ? "h6" : "h5"}
        sx={{ mb: 3, px: isXs ? 1 : 6 }}
        gutterBottom
      >
        No Inactive Queries Found
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
            title="Inactive Queries"
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
              padding: isXs ? "20px 10px 10px 10px" : "25px 10px 10px 10px",
            }}
          >
            <Typography
              variant={isXs ? "h6" : "h5"}
              fontWeight="600"
              textAlign={isXs ? "center" : "left"}
            >
              My Inactive Queries
            </Typography>
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
                      <TableCell
                        sx={{
                          width: isXs ? "10%" : "10%",
                          fontSize: isXs ? "10px" : "0.875rem",
                        }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        sx={{
                          width: isXs ? "20%" : "60%",
                          fontSize: isXs ? "10px" : "0.875rem",
                        }}
                      >
                        Query
                      </TableCell>
                      <TableCell
                        sx={{
                          width: isXs ? "20%" : "15%",
                          fontSize: isXs ? "10px" : "0.875rem",
                        }}
                      >
                        Threads
                      </TableCell>
                      <TableCell
                        sx={{
                          width: isXs ? "15%" : "15%",
                          fontSize: isXs ? "10px" : "0.875rem",
                        }}
                      >
                        Unread
                      </TableCell>
                      <TableCell
                        sx={{
                          width: isXs ? "20%" : "12%",
                          fontSize: isXs ? "10px" : "0.875rem",
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentQueries.map((query) => (
                      <QueryRow key={query.id} hover>
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

                        <TableCell align="center">
                          <Button
                            sx={{
                              fontSize: isXs ? "10px" : "10px",
                              padding: "10px !important",
                            }}
                            variant="outlined"
                            onClick={() => setOpen(true)}
                          >
                            Re-active
                          </Button>
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

      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Your Query"}</DialogTitle>
        <DialogContent
          dividers
          sx={{
            maxHeight: { xs: "70vh", sm: "75vh" }, // ✅ Responsive max height
            overflowY: "auto",
            paddingBottom: "20px",
          }}
        >
          {/* ===== Main Query Info ===== */}
          <div style={{ marginBottom: "10px" }}>
            <p style={{ margin: 0, fontWeight: "500" }}>
              I'm trying to implement a drag and drop feature for file uploads
              in my React application. I've tried using the HTML5 drag and drop
              API but facing issues
            </p>
            <small style={{ color: "gray" }}>10/14/2025, 10:59:01 AM</small>
          </div>

          <hr style={{ margin: "15px 0", borderColor: "#eee" }} />

          {/* ===== Comments Section ===== */}
          <div>
            {comments.length === 0 ? (
              <p style={{ color: "gray" }}>No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    borderRadius: "8px",
                    marginBottom: "10px",
                    background: "#f9f9f9",
                    padding: "8px",
                  }}
                >
                  <p style={{ margin: "0 0 4px 0" }}>{comment.text}</p>
                  <small style={{ color: "gray" }}>{comment.time}</small>
                </div>
              ))
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Re-active</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InactiveQueries;
