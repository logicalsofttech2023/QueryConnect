// components/ChatList.jsx
import React from "react";
import { FaFilter, FaUserPlus, FaSearch } from "react-icons/fa";

const ChatList = ({
  chats,
  currentChat,
  searchQuery,
  isMobileMenuOpen,
  onSearchChange,
  onChatSelect,
}) => {
  return (
    <div className={`sideNav2 ${isMobileMenuOpen ? "mobileOpen" : ""}`}>
      <div className="SideNavhead">
        <h2>Chats</h2>
        
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
    </div>
  );
};

export default ChatList;