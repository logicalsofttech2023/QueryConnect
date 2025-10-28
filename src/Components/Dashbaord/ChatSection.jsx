import React, { useEffect, useRef, useState } from "react";
import {
  FaPhone,
  FaVideo,
  FaEllipsisV,
  FaSearch,
  FaTrash,
  FaBan,
  FaTimes,
  FaCheck,
  FaCheckDouble,
  FaPaperPlane,
} from "react-icons/fa";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaStar } from "react-icons/fa";
import { RxHeart } from "react-icons/rx";
import { RxHeartFilled } from "react-icons/rx";
import Tooltip from "@mui/material/Tooltip";
import { FaEye } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ImageList from "@mui/material/ImageList";
import { useTheme } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { FaImages } from "react-icons/fa";

const ChatSection = ({
  currentChat,
  messages,
  message,
  isBlocked = false,
  showMessageSearch,
  messageSearchQuery,
  showChatOptions,
  messageContainerRef,
  messagesEndRef,
  onMessageChange,
  onMessageSubmit,
  onMessageSearchChange,
  onShowMessageSearch,
  onShowChatOptions,
  onShowUserDetails,
  onVoiceCall,
  onVideoCall,
  onClearChat,
  onToggleBlock,
  onToggleCalls,
  callsEnabled = true,
  query,
}) => {
  const handleOptionClick = (action) => {
    action();
    onShowChatOptions(false);
  };

  const matches = useMediaQuery("(max-width:600px)");

  return (
    <section className="Chat" style={{ width: matches ? "100%" : "67%" }}>
      <ChatHeader
        currentChat={currentChat}
        showChatOptions={showChatOptions}
        isBlocked={isBlocked}
        callsEnabled={callsEnabled} // Pass callsEnabled prop
        onShowUserDetails={onShowUserDetails}
        onVoiceCall={onVoiceCall}
        onVideoCall={onVideoCall}
        onShowChatOptions={onShowChatOptions}
        onShowMessageSearch={onShowMessageSearch}
        onClearChat={onClearChat}
        onToggleBlock={onToggleBlock}
        onToggleCalls={onToggleCalls} // Pass toggle function
        onOptionClick={handleOptionClick}
        query={query}
        matches={matches}
      />

      {showMessageSearch && (
        <MessageSearchBar
          messageSearchQuery={messageSearchQuery}
          onMessageSearchChange={onMessageSearchChange}
          onClose={() => {
            onShowMessageSearch(false);
            onMessageSearchChange("");
          }}
        />
      )}

      <MessageContainer
        messages={messages}
        messageContainerRef={messageContainerRef}
        messagesEndRef={messagesEndRef}
      />

      {isBlocked && (
        <div className="blockedWarning">
          You have blocked this user. Unblock to send messages.
        </div>
      )}

      {!isBlocked && (
        <MessageForm
          message={message}
          onMessageChange={onMessageChange}
          onSubmit={onMessageSubmit}
        />
      )}
    </section>
  );
};

const ChatHeader = ({
  currentChat,
  showChatOptions,
  isBlocked,
  callsEnabled,
  onShowUserDetails,
  onVoiceCall,
  onVideoCall,
  onShowChatOptions,
  onShowMessageSearch,
  onClearChat,
  onToggleBlock,
  onToggleCalls,
  onOptionClick,
  query,
  matches,
}) => {
  const optionsRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [queryView, setQueryView] = useState(false);
  const [agentImagesModel, setAgentImagesModel] = useState(false);
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedImage, setSelectedImage] = useState(null);

  const isMd = useMediaQuery(theme.breakpoints.between("sm", "md"));

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

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        onShowChatOptions(false);
      }
    };

    if (showChatOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showChatOptions, onShowChatOptions]);

  const handleVoiceCall = () => {
    if (callsEnabled) {
      onVoiceCall();
    }
  };

  const handleImageClick = (img, index) => {
    setSelectedImage(img);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % itemData.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(itemData[nextIndex].img);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + itemData.length) % itemData.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(itemData[prevIndex].img);
  };

  return (
    <div className="ChatHead">
      <div className="chatUser">
        <div
          className="avatarContainer"
          onClick={() => onShowUserDetails(true)}
          style={{ cursor: "pointer" }}
        >
          <div className="avatar">
            <img src={currentChat.avatar} alt={currentChat.name} />
          </div>
          <div
            className={`statusDot ${currentChat.online ? "online" : "offline"}`}
          ></div>
        </div>
        <div className="userInfo">
          <p
            className="GroupName"
            style={{ cursor: "pointer" }}
            onClick={() => onShowUserDetails(true)}
          >
            {currentChat.name}{" "}
            <FaStar style={{ color: "#f4b400", fontSize: "15px" }} />
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

          <span className="userStatus">
            {currentChat.online
              ? "Online"
              : `Last seen ${currentChat.lastSeen}`}
          </span>
        </div>
        <Tooltip
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          placement="top"
          arrow
        >
          <span
            style={{
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onClick={() => {
              setIsFavorite(!isFavorite);
            }}
          >
            {isFavorite ? (
              <RxHeartFilled style={{ color: "#ff4d4f", fontSize: "32px" }} />
            ) : (
              <RxHeart style={{ color: "#ff4d4f", fontSize: "32px" }} />
            )}
          </span>
        </Tooltip>
      </div>

      <div className="callGroup" ref={optionsRef}>
        {matches && (
          <button
            className={`iconBtn`}
            onClick={() => {
              setQueryView(true);
            }}
            title={"query view"}
          >
            <FaEye />
          </button>
        )}

        <button
          className={`iconBtn`}
          onClick={handleVoiceCall}
          title={"Voice Call"}
        >
          <FaPhone />
        </button>

        <div className="chatOptions">
          <button
            className="iconBtn"
            onClick={() => onShowChatOptions(!showChatOptions)}
          >
            <FaEllipsisV />
          </button>

          {showChatOptions && (
            <div className="chatOptionsMenu">
              <button
                onClick={() => onOptionClick(() => onShowMessageSearch(true))}
              >
                <FaSearch /> Search Messages
              </button>
              <button onClick={() => onOptionClick(onToggleCalls)}>
                <FaPhone /> {callsEnabled ? "Disable Calls" : "Enable Calls"}
              </button>
              <button onClick={() => onOptionClick(onClearChat)}>
                <FaTrash /> Clear Chat
              </button>
              <button onClick={() => onOptionClick(onToggleBlock)}>
                <FaBan /> {isBlocked ? "Unblock" : "Block"}
              </button>
              <button onClick={() => setAgentImagesModel(true)}>
                <FaImages /> Chat Photos
              </button>
            </div>
          )}
        </div>
      </div>

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
        open={agentImagesModel}
        onClose={() => setAgentImagesModel(false)}
        className="beautiful-dialog"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ fontSize: "16px" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>All Agent Images</Grid>
          </Grid>
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={() => setAgentImagesModel(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <ImageList
            sx={{
              width: "100%",
              height: "auto",
            }}
            cols={fullScreen ? 2 : isMd ? 3 : 4}
            rowHeight={fullScreen ? 120 : isMd ? 150 : 164}
          >
            {itemData.map((item, index) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(item.img, index)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.9)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={() => setSelectedImage(null)}
          sx={{
            position: "absolute",
            right: 25,
            top: 25,
            color: "#fff",
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Prev Button */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 25,
            color: "#fff",
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.4)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        {/* Next Button */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 25,
            color: "#fff",
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.4)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>

        <DialogContent
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            overflow: "hidden",
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const MessageSearchBar = ({
  messageSearchQuery,
  onMessageSearchChange,
  onClose,
}) => (
  <div className="messageSearchBar">
    <FaSearch className="icon" />
    <input
      type="text"
      placeholder="Search in conversation..."
      value={messageSearchQuery}
      onChange={(e) => onMessageSearchChange(e.target.value)}
      className="messageSearchInput"
    />
    <button className="closeSearch" onClick={onClose}>
      <FaTimes />
    </button>
  </div>
);

const MessageContainer = ({
  messages,
  messageContainerRef,
  messagesEndRef,
}) => (
  <div className="MessageContainer" ref={messageContainerRef}>
    {messages.map((msg, index) => {
      const showDateSeparator =
        index === 0 || msg.date !== messages[index - 1].date;
      return (
        <React.Fragment key={msg.id}>
          {showDateSeparator && (
            <div className="messageSeperator">{msg.date}</div>
          )}
          <div className={`message ${msg.type}`}>
            {msg.content && <p className="messageContent">{msg.content}</p>}
            <div className="messageDetails">
              <div className="messageTime">{msg.time}</div>
              {msg.type === "me" &&
                (msg.read ? (
                  <FaCheckDouble className="readReceipt read" />
                ) : (
                  <FaCheck className="readReceipt" />
                ))}
            </div>
          </div>
        </React.Fragment>
      );
    })}
    <div ref={messagesEndRef} />
  </div>
);

const MessageForm = ({ message, onMessageChange, onSubmit }) => {
  const textareaRef = useRef(null);

  // Auto-resize textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);
  return (
    <form id="MessageForm" onSubmit={onSubmit}>
      <textarea
        ref={textareaRef}
        id="MessageInput"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Type a message..."
        rows={1}
        style={{
          flexGrow: 1,
          resize: "none",
          border: "none",
          outline: "none",
          fontSize: "12px",
          padding: "8px 10px",
          borderRadius: "18px",
          background: "#f5f5f5",
          maxHeight: "120px", // limit max height
          overflowY: "auto",
        }}
      />
      <button className="Send" type="submit">
        <FaPaperPlane style={{ zIndex: 1 }} />
      </button>
    </form>
  );
};

export default ChatSection;
