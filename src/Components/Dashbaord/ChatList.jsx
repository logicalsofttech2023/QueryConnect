// components/ChatList.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
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
            <span
              className={`status-badge ${query.status}`}
              style={{ cursor: "pointer" }}
              onClick={handleOpenStatusQuery}
            >
              {query.status}
            </span>
          </div>
          <div>
            <button
              className="btn border-none outline-none background-none p-1"
              style={{ fontSize: "20px" }}
              onClick={handleClickOpen}
              title="Edit Query"
            >
              <CiEdit style={{ color: "white" }} />
            </button>
          </div>
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
          {!isExpanded && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2em",
                background: "linear-gradient(transparent, white)",
                pointerEvents: "none",
                transition: "all 0.4s ease",
              }}
            />
          )}
        </div>

        <div className="read-more-container">
          <div>Active 6:00AM to 8:00PM</div>
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

      <div className="SearchInputHolder">
        <FaSearch className="icon" />
        <input
          className="searchInput"
          placeholder="Search For Chat.."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="chatList">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`group ${currentChat.id === chat.id ? "active" : ""}`}
            onClick={() => onChatSelect(chat)}
          >
            <div className="avatarContainer">
              <div className="avatar">
                <img src={chat.avatar} alt={chat.name} />
              </div>
              <div
                className={`statusDot ${chat.online ? "online" : "offline"}`}
              ></div>
            </div>
            <div className="chatInfo">
              <div className="chatHeader">
                <p className="GroupName">{chat.name}</p>
                {chat.unread > 0 && (
                  <span className="unreadBadge">{chat.unread}</span>
                )}
              </div>
              <p className="GroupDescrp">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose} className="beautiful-dialog">
        <DialogTitle sx={{ fontSize: "16px" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>Your Query</Grid>
            <Grid size={3}>Active 6:00AM to 8:00PM</Grid>
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
            variant="outlined" // Changed to outlined for better styling
            placeholder="Type your comment..."
            multiline
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
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
          {" Are you sure you want to change the status of this query?"}
        </DialogTitle>

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
            <Grid item>Active 6:00AM to 8:00PM</Grid>
          </Grid>
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={() => setQueryView(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
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
    </div>
  );
};

export default ChatList;
