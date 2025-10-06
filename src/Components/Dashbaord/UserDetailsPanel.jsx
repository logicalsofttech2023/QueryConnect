// components/UserDetailsPanel.jsx
import React from "react";
import { FaArrowLeft, FaMobile, FaTrash, FaBan, FaImage } from "react-icons/fa";

const UserDetailsPanel = ({
  currentChat,
  mediaFiles,
  showUserDetails,
  isBlocked,
  onClose,
  onOpenMediaGallery,
  onClearChat,
  onToggleBlock,
  onMediaPreview,
}) => {
  if (!showUserDetails) return null;

  return (
    <>
      <div className="userDetailsPanel show">
        <div className="userDetailsHeader">
          <button className="backButton" onClick={onClose}>
            <FaArrowLeft />
          </button>
          <h3>Contact Info</h3>
        </div>

        <div className="userDetailsContent">
          <UserProfileSection currentChat={currentChat} />
          <ContactDetails currentChat={currentChat} />
          <SharedMediaSection
            mediaFiles={mediaFiles}
            onOpenMediaGallery={onOpenMediaGallery}
            onMediaPreview={onMediaPreview}
          />
          <DangerZone
            isBlocked={isBlocked}
            onClearChat={onClearChat}
            onToggleBlock={onToggleBlock}
          />
        </div>
      </div>
      <div className="userDetailsOverlay" onClick={onClose} />
    </>
  );
};

const UserProfileSection = ({ currentChat }) => (
  <div className="userProfileSection">
    <div className="userAvatarLarge">
      <img src={currentChat.avatar} alt={currentChat.name} />
    </div>
    <div className="userNameLarge">{currentChat.name}</div>
    <div className="userStatusText">
      {currentChat.online ? "Online" : `Last seen ${currentChat.lastSeen}`}
    </div>
  </div>
);

const ContactDetails = ({ currentChat }) => (
  <div className="userDetailsSection">
    <div className="detailItem">
      <FaMobile className="detailIcon" />
      <div className="detailInfo">
        <div className="detailLabel">Phone</div>
        <div className="detailValue">{currentChat.phone}</div>
      </div>
    </div>
  </div>
);

const SharedMediaSection = ({ mediaFiles, onOpenMediaGallery, onMediaPreview }) => (
  <div className="sharedMediaSection">
    <div className="sectionHeader">
      <h4>Shared Media, Links and Docs</h4>
      <button className="viewAllBtn" onClick={onOpenMediaGallery}>
        View All
      </button>
    </div>

    <div className="mediaGrid">
      {mediaFiles.slice(0, 2).map((file, index) => (
        <div key={file.id} className="mediaItem">
          {file.type === "image" && (
            <>
              <FaImage className="mediaIcon" />
              <img
                src={file.url}
                style={{ height: "100%", width: "100%" }}
                alt=""
                onClick={() =>
                  file.type === "image" && onMediaPreview(file, index)
                }
              />
            </>
          )}
        </div>
      ))}
      {mediaFiles.length > 4 && (
        <div className="mediaItem moreItems" onClick={onOpenMediaGallery}>
          <span>+{mediaFiles.length - 4}</span>
        </div>
      )}
    </div>
  </div>
);

const DangerZone = ({ isBlocked, onClearChat, onToggleBlock }) => (
  <div className="dangerZone">
    <button className="dangerBtn" onClick={onClearChat}>
      <FaTrash />
      <span>Clear Chat</span>
    </button>
    <button className="dangerBtn" onClick={onToggleBlock}>
      <FaBan />
      <span>{isBlocked ? "Unblock User" : "Block User"}</span>
    </button>
  </div>
);

export default UserDetailsPanel;