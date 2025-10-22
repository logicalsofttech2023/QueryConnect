import React, { useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import "./MyQueryDetail.css";
import { FaEyeSlash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { RxHeart } from "react-icons/rx";
import { RxHeartFilled } from "react-icons/rx";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FaCheck } from "react-icons/fa6";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MdOutlineMarkUnreadChatAlt, MdFavorite } from "react-icons/md";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { BiSolidCommentAdd } from "react-icons/bi";

const ChatList = ({
  chats,
  currentChat,
  searchQuery,
  isMobileMenuOpen,
  onSearchChange,
  onChatSelect,
  query,
}) => {
  const [open, setOpen] = useState(false);
  const [statusQueryModelOpen, setStatusQueryModelOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [queryView, setQueryView] = useState(false);
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
  const [newComment, setNewComment] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [editTime, setEditTime] = useState(false);
  const [chatFilter, setChatFilter] = useState("1");
  const [snackbarBar, setSnackbarBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (event, newValue) => {
    setChatFilter(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenStatusQuery = () => {
    setStatusQueryModelOpen(true);
  };
  const closeStatusQueryModel = () => {
    setStatusQueryModelOpen(false);
  };
  const confirmStatusQuery = () => {
    query.status = query.status === "active" ? "inactive" : "active";
    setStatusQueryModelOpen(false);
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    const newEntry = {
      id: Date.now(),
      text: newComment.trim(),
      time: new Date().toLocaleString(),
    };
    setOpen(false);
    setComments([newEntry, ...comments]);
    setNewComment("");
  };

  const toggleFavorite = (chatId) => {
    setFavorites((prev) => {
      const isAlreadyFav = prev.includes(chatId);
      const updatedFavorites = isAlreadyFav
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId];
      setSnackbarMessage(
        isAlreadyFav ? "Removed from favorites ❤️‍🔥" : "Added to favorites 💖"
      );
      setSnackbarBar(true);

      return updatedFavorites;
    });
  };

  const handleEditTimeSubmit = () => {
    setEditTime(false);
  };

  // Filter chats based on current tab
  const getFilteredChats = () => {
    switch (chatFilter) {
      case "1": // All chats
        return chats;
      case "2": // Favorite chats - CORRECTED: Only show favorited chats
        return chats.filter((chat) => favorites.includes(chat.id));
      case "3": // Unread chats
        return chats.filter((chat) => chat.unread > 0);
      default:
        return chats;
    }
  };

  const filteredChats = getFilteredChats();

  const renderChatItem = (chat) => (
    <div
      key={chat.id}
      className={`group ${currentChat.id === chat.id ? "active" : ""}`}
      onClick={() => onChatSelect(chat)}
      style={{ marginTop: "10px", marginBottom: "10px" }}
    >
      <div className="avatarContainer">
        <div className="avatar">
          <img src={chat.avatar} alt={chat.name} />
        </div>
        <div
          className={`statusDot ${chat.online ? "online" : "offline"}`}
          style={{ right: "15px" }}
        ></div>
      </div>
      <div className="chatInfo">
        <div className="chatHeader">
          <p className="GroupName">
            {chat.name}{" "}
            <FaStar
              style={{
                color: "#f4b400",
              }}
            />
            <span
              style={{
                marginLeft: "4px",
                color: "#333",
                fontSize: "10px",
              }}
            >
              4.5
            </span>{" "}
          </p>

          {chat.unread > 0 && (
            <span className="unreadBadge">{chat.unread}</span>
          )}
        </div>
        <p className="GroupDescrp">{chat.message}</p>
        {query.images && query.images.length > 0 && (
          <div className="comment-images">
            {query.images.map((img, idx) => (
              <div key={idx} className="comment-image-container">
                <img
                  src={img}
                  alt={`agent-${query.id}-${idx}`}
                  className="comment-image"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ❤️ Favorite Button */}
      <div
        style={{
          marginLeft: "10px",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(chat.id);
        }}
        title={
          favorites.includes(chat.id)
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorites.includes(chat.id) ? (
          <RxHeartFilled style={{ color: "#ff4d4f", fontSize: "20px" }} />
        ) : (
          <RxHeart style={{ color: "#aaa", fontSize: "20px" }} />
        )}
      </div>
    </div>
  );

  return (
    <div className={`sideNav2 ${isMobileMenuOpen ? "mobileOpen" : ""}`}>
      <div className="SideNavhead">
        <h2>Your Query</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "11px",
          }}
        >
          <div className="status-controls">
            <ToggleButtonGroup
              value={query.status}
              exclusive
              onChange={handleOpenStatusQuery}
              aria-label="Query Status"
              sx={{
                "& .MuiToggleButton-root": {
                  fontSize: "10px",
                  padding: "4px 12px 2px 12px",
                  border: "none",
                  borderRadius: "20px",
                  color: "#fff",

                  transition: "all 0.3s ease",
                  textTransform: "none",
                  width: "69px",
                },
              }}
            >
              <ToggleButton
                value="active"
                sx={{
                  backgroundColor:
                    query.status === "active"
                      ? "#4caf50 !important"
                      : "#e0e0e0 !important",
                  color:
                    query.status === "active"
                      ? "#fff !important"
                      : "#333 !important",
                  marginRight: "8px",
                  fontWeight: query.status === "active" ? "600" : "400",
                  "&:hover": {
                    backgroundColor:
                      query.status === "active"
                        ? "green !important"
                        : "#d5d5d5 !important",
                  },
                  outline:
                    query.status === "active"
                      ? "2px solid #fff !important"
                      : "#667eea !important",
                  outlineOffset: "2px !important",
                }}
                disabled={query.status === "active"}
              >
                Active
              </ToggleButton>
              {query.status === "active" && (
                <FaCheck
                  style={{
                    position: "absolute",
                    marginLeft: "54px",
                    color: "white",
                    fontSize: "10px",
                    marginTop: "8px",
                  }}
                />
              )}

              <ToggleButton
                value="inactive"
                sx={{
                  backgroundColor:
                    query.status === "inactive"
                      ? "#f44336 !important"
                      : "#e0e0e0 !important",
                  color:
                    query.status === "inactive"
                      ? "#fff !important"
                      : "#333 !important",
                  fontWeight: query.status === "inactive" ? "600" : "400",
                  "&:hover": {
                    backgroundColor:
                      query.status === "inactive"
                        ? "green !important"
                        : "#d5d5d5 !important",
                  },
                  outline:
                    query.status === "inactive"
                      ? "2px solid #fff !important"
                      : "#667eea !important",
                  outlineOffset: "2px !important",
                }}
                disabled={query.status === "inactive"}
              >
                Inactive
              </ToggleButton>

              {query.status === "inactive" && (
                <FaCheck
                  style={{
                    position: "absolute",
                    marginLeft: "132px",
                    color: "white",
                    fontSize: "10px",
                    marginTop: "8px",
                  }}
                />
              )}
            </ToggleButtonGroup>
          </div>
          {/* <div>
            <button
              className="btn border-none outline-none background-none p-1"
              style={{ fontSize: "20px" }}
              onClick={handleClickOpen}
              title="Edit Query"
            >
              <CiEdit style={{ color: "white" }} />
            </button>
          </div> */}
        </div>
      </div>

      <div className="query-detail-card">
        <div className="query-header p-0"></div>

        <div
          className="query-content"
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              color: "black",
              margin: 0,
              ...(isExpanded
                ? {}
                : {
                    maxHeight: "3.5em",
                    overflow: "hidden",
                  }),
            }}
          >
            {isExpanded
              ? query.description
              : `${query.description.slice(0, 100)}${
                  query.description.length > 100 ? "..." : ""
                }`}
          </p>

          {/* Gradient overlay instead of ::after */}
          {!isExpanded && <div className="fade-overlay" />}
        </div>

        <div className="read-more-container">
          <div>
            {" "}
            <Button
              variant="contained"
              sx={{
                padding: "10px !important",
                fontSize: "10px !important",
                alignItems: "self-start",
              }}
              onClick={() => setEditTime(true)}
            >
              Active 6:00AM to 8:00PM{" "}
              <MdModeEdit style={{ marginLeft: "4px", fontSize: "12px" }} />
            </Button>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
          <button
            className={`read-more-btn`}
            onClick={handleClickOpen}
            data-tooltip={"Add comment"}
          >
            <BiSolidCommentAdd />
          </button>
          {query.description.length > 100 && (
            <button
              className={`read-more-btn`}
              onClick={() => {
                setQueryView(true);
              }}
              data-tooltip={queryView ? "Show less" : "Show more"}
              aria-label={queryView ? "Collapse text" : "Expand text"}
            >
              {queryView ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
          </div>
        </div>
      </div>

      <div className="SearchInputHolder">
        <FaSearch className="icon" />
        <input
          className="searchInput"
          placeholder="Search For Chat.."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={chatFilter}>
          <Box
            sx={{
              borderBottom: "1px solid #e0e0e0",
              backgroundColor: "#fff",
              px: 2,
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="Chat Tabs"
              variant="fullWidth"
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: "space-around",
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#555",
                  transition: "all 0.3s ease",
                  minHeight: "42px",
                  border: "none",
                  outline: "none",
                  mx: 0.5,
                  "&:hover": {
                    backgroundColor: "#f0f2f5",
                    color: "#000",
                    border: "none",
                  },
                },
                "& .Mui-selected": {
                  color: "#0a8d48 !important", // WhatsApp green
                  backgroundColor: "#e9f7ef",
                  border: "none",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#0a8d48",
                  height: "3px",
                  border: "none",
                },
              }}
            >
              <Tab label="All" value="1" />
              <Tab label="Unread" value="3" />
              <Tab label="Favorites" value="2" />
            </TabList>
          </Box>

          {/* ✅ All Chats */}
          <TabPanel
            value="1"
            sx={{
              padding: "5px",
              height: "42vh !important",
              overflowY: "auto",
            }}
          >
            <div className="chatList">
              {filteredChats.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "#888",
                    fontSize: "14px",
                    padding: "20px 0",
                  }}
                >
                  No chats available
                </p>
              ) : (
                filteredChats.map(renderChatItem)
              )}
            </div>
          </TabPanel>

          {/* ✅ Unread Chats */}
          <TabPanel value="3" sx={{ padding: "5px", height: "100%" }}>
            {filteredChats.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                  color: "#888",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  No unread messages <MdOutlineMarkUnreadChatAlt size={18} />
                </p>
              </Box>
            ) : (
              <div className="chatList">
                {filteredChats.map(renderChatItem)}
              </div>
            )}
          </TabPanel>

          {/* ✅ Favorite Chats - CORRECTED: Now properly filters only favorited chats */}
          <TabPanel value="2" sx={{ padding: "5px", height: "100%" }}>
            {filteredChats.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                  color: "#888",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  No favorite chats <MdFavorite color="red" />
                </p>
              </Box>
            ) : (
              <div className="chatList">
                {filteredChats.map(renderChatItem)}
              </div>
            )}
          </TabPanel>
        </TabContext>
      </Box>

      <Dialog open={open} onClose={handleClose} className="beautiful-dialog">
        <DialogTitle sx={{ fontSize: "16px" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>Your Query</Grid>
            <Grid size={3} sx={{ width: "fit-content" }}>
              Active 6:00AM to 8:00PM
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          {/* ===== Main Query Info ===== */}
          <div style={{ marginBottom: "10px" }}>
            <p style={{ margin: 0, fontWeight: "500" }}>{query.description}</p>
            <small style={{ color: "gray" }}>10/14/2025, 10:59:01 AM</small>
          </div>

          <hr style={{ margin: "15px 0", borderColor: "#eee" }} />

          {/* ===== Comments Section ===== */}
          <div style={{ maxHeight: "250px", overflowY: "auto" }}>
            {comments.length === 0
              ? null
              : comments.map((comment) => (
                  <div
                    key={comment.id}
                    style={{
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0 0 4px 0" }}>{comment.text}</p>
                    <small style={{ color: "gray" }}>{comment.time}</small>
                  </div>
                ))}
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Your comment here"
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Type your comment..."
            multiline
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={statusQueryModelOpen}
        onClose={closeStatusQueryModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" Are you sure you want to active this query?"}
        </DialogTitle>

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
            <p style={{ margin: 0, fontWeight: "500" }}>{query.description}</p>
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
          <Button onClick={closeStatusQueryModel}>Cancel</Button>
          <Button onClick={confirmStatusQuery} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={queryView}
        onClose={() => setQueryView(false)}
        className="beautiful-dialog"
        scroll="paper"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontSize: "16px" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>Your Query</Grid>
            <Grid item sx={{ marginRight: "30px", width: "fit-content" }}>
              Active 6:00AM to 8:00PM
            </Grid>
          </Grid>
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={() => setQueryView(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 12,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

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
            <p style={{ margin: 0, fontWeight: "500" }}>{query.description}</p>
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
      </Dialog>

      <Dialog
        open={editTime}
        onClose={() => setEditTime(false)}
        className="beautiful-dialog"
      >
        <DialogTitle sx={{ fontSize: "16px" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>Your Query</Grid>
            <Grid size={3} sx={{ width: "fit-content" }}>
              Active 6:00AM to 8:00PM
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          {/* ===== Main Query Info ===== */}
          <div style={{ marginTop: "10px" }}>
            <p style={{ margin: 0, fontWeight: "500" }}>{query.description}</p>
            <small style={{ color: "gray" }}>10/14/2025, 10:59:01 AM</small>
          </div>

          <hr style={{ margin: "15px 0", borderColor: "#eee" }} />

          {/* ===== Comments Section ===== */}
          <div style={{ maxHeight: "250px", overflowY: "auto" }}>
            {comments.length === 0
              ? null
              : comments.map((comment) => (
                  <div
                    key={comment.id}
                    style={{
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <p style={{ margin: "0 0 4px 0" }}>{comment.text}</p>
                    <small style={{ color: "gray" }}>{comment.time}</small>
                  </div>
                ))}
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                label="Start Time"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
              <TimePicker
                label="End Time"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditTime(false)}>Cancel</Button>
          <Button onClick={handleEditTimeSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarBar}
        autoHideDuration={2000}
        onClose={() => setSnackbarBar(false)}
        sx={{ width: "max-content" }}
      >
        <Alert
          onClose={() => setSnackbarBar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChatList;
