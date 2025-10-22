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
  callsEnabled, // New prop
  onShowUserDetails,
  onVoiceCall,
  onVideoCall,
  onShowChatOptions,
  onShowMessageSearch,
  onClearChat,
  onToggleBlock,
  onToggleCalls, // New prop
  onOptionClick,
}) => {
  const optionsRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleVideoCall = () => {
    if (callsEnabled) {
      onVideoCall();
    }
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
                title={
                  isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
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
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
        <button
          className={`iconBtn`}
          onClick={handleVoiceCall}
          title={"Voice Call"}
        >
          <FaPhone />
        </button>
        <button
          className={`iconBtn`}
          onClick={handleVideoCall}
          title={"Video Call"}
        >
          <FaVideo />
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
            </div>
          )}
        </div>
      </div>
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
