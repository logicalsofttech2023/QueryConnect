// components/ChatSection.jsx
import React from "react";
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
}) => {
  
  // Function to handle option click and close menu
  const handleOptionClick = (action) => {
    action();
    onShowChatOptions(false); // Close the menu after action
  };

  return (
    <section className="Chat">
      <ChatHeader
        currentChat={currentChat}
        showChatOptions={showChatOptions}
        isBlocked={isBlocked}
        onShowUserDetails={onShowUserDetails}
        onVoiceCall={onVoiceCall}
        onVideoCall={onVideoCall}
        onShowChatOptions={onShowChatOptions}
        onShowMessageSearch={onShowMessageSearch}
        onClearChat={onClearChat}
        onToggleBlock={onToggleBlock}
        onOptionClick={handleOptionClick} // Pass the handler
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
  onShowUserDetails,
  onVoiceCall,
  onVideoCall,
  onShowChatOptions,
  onShowMessageSearch,
  onClearChat,
  onToggleBlock,
  onOptionClick,
}) => (
  <div className="ChatHead">
    <div className="chatUser" onClick={() => onShowUserDetails(true)}>
      <div className="avatarContainer">
        <div className="avatar">
          <img src={currentChat.avatar} alt={currentChat.name} />
        </div>
        <div
          className={`statusDot ${currentChat.online ? "online" : "offline"}`}
        ></div>
      </div>
      <div className="userInfo">
        <p className="GroupName">{currentChat.name}</p>
        <span className="userStatus">
          {currentChat.online ? "Online" : `Last seen ${currentChat.lastSeen}`}
        </span>
      </div>
    </div>
    <div className="callGroup">
      <button className="iconBtn" onClick={onVoiceCall} title="Voice Call">
        <FaPhone />
      </button>
      <button className="iconBtn" onClick={onVideoCall} title="Video Call">
        <FaVideo />
      </button>
      <div className="chatOptions">
        <button
          className="iconBtn"
          onClick={() => onShowChatOptions(!showChatOptions)}
          style={{ width: "23px", height: "0px" }}
        >
          <FaEllipsisV />
        </button>
        {showChatOptions && (
          <div className="chatOptionsMenu">
            <button onClick={() => onOptionClick(() => onShowMessageSearch(true))}>
              <FaSearch /> Search Messages
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

const MessageContainer = ({ messages, messageContainerRef, messagesEndRef }) => (
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

const MessageForm = ({ message, onMessageChange, onSubmit }) => (
  <form id="MessageForm" onSubmit={onSubmit}>
    <input
      type="text"
      id="MessageInput"
      value={message}
      onChange={(e) => onMessageChange(e.target.value)}
      placeholder="Type a message..."
    />
    <button className="Send" type="submit">
      <FaPaperPlane />
    </button>
  </form>
);

export default ChatSection;