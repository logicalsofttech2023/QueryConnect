import React, { useState, useEffect } from "react";
import { 
  FaFilter, 
  FaUserPlus, 
  FaSearch, 
  FaPhone, 
  FaVideo, 
  FaCheck, 
  FaPaperPlane, 
  FaPaperclip,
  FaTimes,
  FaBars,
  FaArrowLeft,
  FaImages,
  FaFile
} from "react-icons/fa";
import "./Messages.css";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  // Sample chat data with online status
  const chats = [
    {
      id: 1,
      name: "David Johnson",
      message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      avatar: "media/figure/chat_5.jpg",
      online: true,
      lastSeen: "2 min ago"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      message: "Hey there! How are you doing?",
      avatar: "media/figure/chat_5.jpg",
      online: false,
      lastSeen: "1 hour ago"
    },
    {
      id: 3,
      name: "Mike Chen",
      message: "Let's meet tomorrow for coffee",
      avatar: "media/figure/chat_5.jpg",
      online: true,
      lastSeen: "just now"
    }
  ];

  const currentChat = {
    id: 1,
    name: "David Johnson",
    avatar: "media/figure/chat_5.jpg",
    online: true,
    lastSeen: "2 min ago"
  };

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close menu when clicking on overlay or selecting a chat
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMobileMenuOpen]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setPendingFiles(selectedFiles);
      setCurrentPreviewIndex(0);
      setShowPreviewPopup(true);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const removeAllFiles = () => {
    setFiles([]);
    setPendingFiles([]);
    setShowPreviewPopup(false);
    document.getElementById("fileInput").value = "";
  };

  const confirmSendFiles = () => {
    setFiles(pendingFiles);
    setShowPreviewPopup(false);
    // Auto focus back to message input
    document.getElementById("MessageInput").focus();
  };

  const cancelSendFiles = () => {
    setPendingFiles([]);
    setShowPreviewPopup(false);
    document.getElementById("fileInput").value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() || files.length > 0) {
      console.log("Message:", message);
      console.log("Files:", files);
      setMessage("");
      setFiles([]);
      document.getElementById("fileInput").value = "";
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleChatSelect = (chatId) => {
    if (isMobile) {
      closeMobileMenu();
    }
    // Handle chat selection logic here
    console.log("Selected chat:", chatId);
  };

  const nextPreview = () => {
    setCurrentPreviewIndex((prev) => 
      prev < pendingFiles.length - 1 ? prev + 1 : prev
    );
  };

  const prevPreview = () => {
    setCurrentPreviewIndex((prev) => 
      prev > 0 ? prev - 1 : prev
    );
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) return <FaImages />;
    if (fileType.startsWith("video/")) return <FaVideo />;
    return <FaFile />;
  };

  const getTotalFileSize = (filesArray) => {
    const totalBytes = filesArray.reduce((total, file) => total + file.size, 0);
    return (totalBytes / 1024 / 1024).toFixed(2);
  };

  const currentFile = pendingFiles[currentPreviewIndex];

  return (
    <div>
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <button className="mobileMenuToggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaArrowLeft /> : <FaBars />}
        </button>
      )}
      
      {/* Mobile Overlay */}
      {isMobile && (
        <div 
          className={`mobileOverlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={closeMobileMenu}
        />
      )}

      {/* Multiple Files Preview Popup */}
      {showPreviewPopup && pendingFiles.length > 0 && (
        <div className="previewPopupOverlay">
          <div className="previewPopup">
            <div className="previewPopupHeader">
              <div className="previewTitleSection">
                <h3>Send Files ({pendingFiles.length})</h3>
                <span className="filesCounter">
                  {currentPreviewIndex + 1} of {pendingFiles.length}
                </span>
              </div>
              <button className="closePopup" onClick={cancelSendFiles}>
                <FaTimes />
              </button>
            </div>
            
            {/* Files List Thumbnails */}
            <div className="filesThumbnails">
              {pendingFiles.map((file, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${index === currentPreviewIndex ? 'active' : ''}`}
                  onClick={() => setCurrentPreviewIndex(index)}
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="thumbnailImg"
                    />
                  ) : (
                    <div className="thumbnailIcon">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                  <div className="thumbnailOverlay">
                    {file.type.startsWith("video/") && <FaVideo />}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Preview */}
            <div className="previewPopupContent">
              {currentFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(currentFile)}
                  alt="preview"
                  className="popupPreviewImg"
                />
              ) : currentFile.type.startsWith("video/") ? (
                <video
                  src={URL.createObjectURL(currentFile)}
                  controls
                  className="popupPreviewVideo"
                />
              ) : (
                <div className="popupFilePreviewGeneric">
                  <div className="popupFileIcon">
                    {getFileIcon(currentFile.type)}
                  </div>
                  <div className="popupFileInfo">
                    <div className="popupFileName">{currentFile.name}</div>
                    <div className="popupFileSize">
                      {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <div className="popupFileType">{currentFile.type}</div>
                  </div>
                </div>
              )}
              
              {/* Navigation Arrows for multiple files */}
              {pendingFiles.length > 1 && (
                <>
                  <button 
                    className="navArrow navArrowLeft"
                    onClick={prevPreview}
                    disabled={currentPreviewIndex === 0}
                  >
                    ‹
                  </button>
                  <button 
                    className="navArrow navArrowRight"
                    onClick={nextPreview}
                    disabled={currentPreviewIndex === pendingFiles.length - 1}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Files Summary */}
            <div className="filesSummary">
              <div className="totalFiles">
                <strong>{pendingFiles.length}</strong> file(s) selected • 
                Total size: <strong>{getTotalFileSize(pendingFiles)} MB</strong>
              </div>
            </div>
            
            <div className="previewPopupActions">
              <button className="cancelBtn" onClick={cancelSendFiles}>
                Cancel All
              </button>
              <button className="sendBtn" onClick={confirmSendFiles}>
                Send All Files
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="MessagesMain">
        {/* LEFT SIDE NAV */}
        <div className={`sideNav2 ${isMobileMenuOpen ? 'mobileOpen' : ''}`}>
          <div className="SideNavhead">
            <h2>Chats</h2>
          </div>

          <div className="SearchInputHolder">
            <FaSearch className="icon" />
            <input className="searchInput" placeholder="Search For Chat.." />
          </div>

          <div className="chatList">
            {chats.map(chat => (
              <div 
                key={chat.id} 
                className="group"
                onClick={() => handleChatSelect(chat.id)}
              >
                <div className="avatarContainer">
                  <div className="avatar">
                    <img src={chat.avatar} alt={chat.name} />
                  </div>
                  <div className={`statusDot ${chat.online ? 'online' : 'offline'}`}></div>
                </div>
                <div className="chatInfo">
                  <div className="chatHeader">
                    <p className="GroupName">{chat.name}</p>
                    <span className="lastSeen">
                      {chat.online ? 'Online' : chat.lastSeen}
                    </span>
                  </div>
                  <p className="GroupDescrp">{chat.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT SECTION */}
        <section className={`Chat ${isMobileMenuOpen ? 'menuOpen' : ''}`}>
          <div className="ChatHead">
            <div className="chatUser">
              <div className="avatarContainer">
                <div className="avatar">
                  <img src={currentChat.avatar} alt={currentChat.name} />
                </div>
                <div className={`statusDot ${currentChat.online ? 'online' : 'offline'}`}></div>
              </div>
              <div className="userInfo">
                <p className="GroupName">{currentChat.name}</p>
                <span className="userStatus">
                  {currentChat.online ? 'Online' : `Last seen ${currentChat.lastSeen}`}
                </span>
              </div>
            </div>
            <div className="callGroup">
              <FaPhone className="icon" />
              <FaVideo className="icon" />
            </div>
          </div>

          {/* MESSAGES */}
          <div className="MessageContainer">
            <div className="messageSeperator">Yesterday</div>
            <div className="message me">
              <p className="messageContent">Hello!</p>
              <div className="messageDetails">
                <div className="messageTime">3:21 PM</div>
                <FaCheck className="readReceipt" />
              </div>
            </div>
            <div className="message you">
              <p className="messageContent">I'm Fine!</p>
              <div className="messageDetails">
                <div className="messageTime">3:30 PM</div>
                <FaCheck className="readReceipt" />
              </div>
            </div>

            <div className="messageSeperator">Today</div>
            <div className="message you">
              <p className="messageContent">Here are Pics!</p>
              <div className="messageDetails">
                <div className="messageTime">8:09 AM</div>
                <FaCheck className="readReceipt" />
              </div>
            </div>
          </div>

          {/* MESSAGE FORM */}
          <form id="MessageForm" onSubmit={handleSubmit}>
            {/* Hidden File Input - Allow multiple */}
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*,video/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              multiple
            />

            {/* File Upload Icon */}
            <label htmlFor="fileInput" className="iconBtn">
              <FaPaperclip className="icon" />
            </label>

            <input
              type="text"
              id="MessageInput"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />

            <button className="Send" type="submit">
              <FaPaperPlane />
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Messages;