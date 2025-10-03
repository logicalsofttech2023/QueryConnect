import React, { useState, useEffect, useRef } from "react";
import {
  FaFilter,
  FaUserPlus,
  FaSearch,
  FaPhone,
  FaVideo,
  FaCheck,
  FaCheckDouble,
  FaPaperPlane,
  FaPaperclip,
  FaTimes,
  FaBars,
  FaArrowLeft,
  FaImages,
  FaFile,
  FaEllipsisV,
  FaTrash,
  FaBan,
} from "react-icons/fa";
import "./Messages.css";
import MyImageEditor from "./MyImageEditor";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [showEditor, setShowEditor] = useState(false);
  const [imageToEdit, setImageToEdit] = useState(null);
  const [imageEditIndex, setImageEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showMessageOptions, setShowMessageOptions] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showCallHistory, setShowCallHistory] = useState(false);
  const [messageSearchQuery, setMessageSearchQuery] = useState("");
  const [showMessageSearch, setShowMessageSearch] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample chat data with online status
  const [chats, setChats] = useState([
  {
    id: 1,
    name: "Amit Sharma",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    avatar: "media/figure/chat_5.jpg",
    online: true,
    lastSeen: "2 min ago",
    unread: 3,
  },
  {
    id: 2,
    name: "Priya Verma",
    message: "Hey there! How are you doing?",
    avatar: "media/figure/chat_5.jpg",
    online: false,
    lastSeen: "1 hour ago",
    unread: 0,
  },
  {
    id: 3,
    name: "Rohit Singh",
    message: "Let's meet tomorrow for coffee",
    avatar: "media/figure/chat_5.jpg",
    online: true,
    lastSeen: "just now",
    unread: 1,
  },
]);

const [currentChat, setCurrentChat] = useState({
  id: 1,
  name: "Amit Sharma",
  avatar: "media/figure/chat_5.jpg",
  online: true,
  lastSeen: "2 min ago",
});


  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "me",
      content: "Hello!",
      time: "3:21 PM",
      date: "yesterday",
      read: true,
      files: [],
    },
    {
      id: 2,
      type: "you",
      content: "I'm Fine!",
      time: "3:30 PM",
      date: "yesterday",
      read: true,
      files: [],
    },
    {
      id: 3,
      type: "you",
      content: "Here are Pics!",
      time: "8:09 AM",
      date: "today",
      read: true,
      files: [
        { type: "image", url: "https://cdn.pixabay.com/photo/2019/06/26/09/52/shit-image-4300034_1280.jpg", name: "image1.jpg" },
        { type: "image", url: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", name: "image2.jpg" },
      ],
    },
    {
      id: 4,
      type: "me",
      content: "Check this video!",
      time: "9:15 AM",
      date: "today",
      read: false,
      files: [
        { type: "video", url: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", name: "sample.mp4" },
      ],
    },
  ]);

  

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close menu when clicking on overlay or selecting a chat
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isMobileMenuOpen]);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setPendingFiles(selectedFiles);
      setCurrentPreviewIndex(0);
      setShowPreviewPopup(true);
    }
  };

  const handleEditImage = (fileIndex) => {
    const file = pendingFiles[fileIndex];
    if (file && file.type.startsWith("image/")) {
      setImageToEdit(URL.createObjectURL(file));
      setImageEditIndex(fileIndex);
      setShowEditor(true);
    }
  };

  const handleEditedImage = (dataUrl) => {
    if (dataUrl && imageEditIndex !== null) {
      fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const editedFile = new File(
            [blob],
            `edited-${pendingFiles[imageEditIndex].name}`,
            {
              type: "image/png",
            }
          );

          const updatedFiles = [...pendingFiles];
          updatedFiles[imageEditIndex] = editedFile;
          setPendingFiles(updatedFiles);
        })
        .catch((error) => {
          console.error("Error converting edited image:", error);
        });
    }

    setShowEditor(false);
    setImageToEdit(null);
    setImageEditIndex(null);
  };

  const cancelEditImage = () => {
    setShowEditor(false);
    setImageToEdit(null);
    setImageEditIndex(null);
  };

  const confirmSendFiles = () => {
    const newMessage = {
      id: messages.length + 1,
      type: "me",
      content: message || "Shared files",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: "today",
      read: false,
      files: pendingFiles.map((file) => ({
        type: file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
          ? "video"
          : "file",
        url: URL.createObjectURL(file),
        name: file.name,
      })),
    };

    setMessages([...messages, newMessage]);
    setPendingFiles([]);
    setShowPreviewPopup(false);
    setMessage("");
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
      const newMessage = {
        id: messages.length + 1,
        type: "me",
        content: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: "today",
        read: false,
        files: files.map((file) => ({
          type: file.type.startsWith("image/")
            ? "image"
            : file.type.startsWith("video/")
            ? "video"
            : "file",
          url: URL.createObjectURL(file),
          name: file.name,
        })),
      };

      setMessages([...messages, newMessage]);
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

  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
    if (isMobile) {
      closeMobileMenu();
    }

    // Mark messages as read when opening chat
    const updatedMessages = messages.map((msg) => ({
      ...msg,
      read: true,
    }));
    setMessages(updatedMessages);

    // Update unread count in chats
    const updatedChats = chats.map((c) =>
      c.id === chat.id ? { ...c, unread: 0 } : c
    );
    setChats(updatedChats);
  };

  const nextPreview = () => {
    setCurrentPreviewIndex((prev) =>
      prev < pendingFiles.length - 1 ? prev + 1 : prev
    );
  };

  const prevPreview = () => {
    setCurrentPreviewIndex((prev) => (prev > 0 ? prev - 1 : prev));
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

  // New Feature Handlers
  const clearChat = () => {
    setMessages([]);
    setShowChatOptions(false);
  };

  const toggleBlock = () => {
    setIsBlocked(!isBlocked);
    setShowChatOptions(false);
  };

  const deleteMessage = (messageId) => {
    setMessages(messages.filter((msg) => msg.id !== messageId));
    setShowMessageOptions(null);
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(
    (msg) =>
      msg.content.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
      msg.files.some((file) =>
        file.name.toLowerCase().includes(messageSearchQuery.toLowerCase())
      )
  );

  const currentFile = pendingFiles[currentPreviewIndex];

  return (
    <div className="messagesContainer">
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <button className="mobileMenuToggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaArrowLeft /> : <FaBars />}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && (
        <div
          className={`mobileOverlay ${isMobileMenuOpen ? "active" : ""}`}
          onClick={closeMobileMenu}
        />
      )}

      {/* Image Editor Popup */}
      {showEditor && imageToEdit && (
        <div className="editorPopupOverlay">
          <div className="editorPopup">
            <div className="editorPopupHeader">
              <h3>Edit Image</h3>
              <button className="closePopup" onClick={cancelEditImage}>
                <FaTimes />
              </button>
            </div>
            <MyImageEditor
              imageUrl={imageToEdit}
              onComplete={handleEditedImage}
              onCancel={cancelEditImage}
            />
          </div>
        </div>
      )}

      {/* Multiple Files Preview Popup */}
      {showPreviewPopup && pendingFiles.length > 0 && !showEditor && (
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
                  className={`thumbnail ${
                    index === currentPreviewIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentPreviewIndex(index)}
                >
                  {file.type.startsWith("image/") ? (
                    <>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="thumbnailImg"
                      />
                      <button
                        className="editImageBtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditImage(index);
                        }}
                      >
                        Edit
                      </button>
                    </>
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
              {currentFile && currentFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(currentFile)}
                  alt="preview"
                  className="popupPreviewImg"
                />
              ) : currentFile && currentFile.type.startsWith("video/") ? (
                <video
                  src={URL.createObjectURL(currentFile)}
                  controls
                  className="popupPreviewVideo"
                />
              ) : currentFile ? (
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
              ) : null}

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
                <strong>{pendingFiles.length}</strong> file(s) selected • Total
                size: <strong>{getTotalFileSize(pendingFiles)} MB</strong>
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
        <div className={`sideNav2 ${isMobileMenuOpen ? "mobileOpen" : ""}`}>
          <div className="SideNavhead">
            <h2>Chats</h2>
            <div className="chatActions">
              <FaUserPlus className="icon" title="New Chat" />
              <FaFilter className="icon" title="Filter" />
            </div>
          </div>

          <div className="SearchInputHolder">
            <FaSearch className="icon" />
            <input
              className="searchInput"
              placeholder="Search For Chat.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="chatList">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`group ${
                  currentChat.id === chat.id ? "active" : ""
                }`}
                onClick={() => handleChatSelect(chat)}
              >
                <div className="avatarContainer">
                  <div className="avatar">
                    <img src={chat.avatar} alt={chat.name} />
                  </div>
                  <div
                    className={`statusDot ${
                      chat.online ? "online" : "offline"
                    }`}
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

        {/* CHAT SECTION */}
        <section className={`Chat ${isMobileMenuOpen ? "menuOpen" : ""}`}>
          <div className="ChatHead">
            <div className="chatUser">
              <div className="avatarContainer">
                <div className="avatar">
                  <img src={currentChat.avatar} alt={currentChat.name} />
                </div>
                <div
                  className={`statusDot ${
                    currentChat.online ? "online" : "offline"
                  }`}
                ></div>
              </div>
              <div className="userInfo">
                <p className="GroupName">{currentChat.name}</p>
                <span className="userStatus">
                  {currentChat.online
                    ? "Online"
                    : `Last seen ${currentChat.lastSeen}`}
                </span>
              </div>
            </div>
            <div className="callGroup">
              <FaPhone className="icon" />
              <FaVideo className="icon" />
              <div className="chatOptions">
                <button
                  className="iconBtn"
                  onClick={() => setShowChatOptions(!showChatOptions)}
                >
                  <FaEllipsisV />
                </button>
                {showChatOptions && (
                  <div className="chatOptionsMenu">
                    <button onClick={() => setShowMessageSearch(true)}>
                      <FaSearch /> Search Messages
                    </button>
                    <button onClick={clearChat}>
                      <FaTrash /> Clear Chat
                    </button>
                    <button onClick={toggleBlock}>
                      <FaBan /> {isBlocked ? "Unblock" : "Block"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Message Search Bar */}
          {showMessageSearch && (
            <div className="messageSearchBar">
              <FaSearch className="icon" />
              <input
                type="text"
                placeholder="Search in conversation..."
                value={messageSearchQuery}
                onChange={(e) => setMessageSearchQuery(e.target.value)}
                className="messageSearchInput"
              />
              <button
                className="closeSearch"
                onClick={() => {
                  setShowMessageSearch(false);
                  setMessageSearchQuery("");
                }}
              >
                <FaTimes />
              </button>
            </div>
          )}

          {/* MESSAGES */}
          <div className="MessageContainer">
            {filteredMessages.map((msg, index) => {
              const showDateSeparator =
                index === 0 || msg.date !== filteredMessages[index - 1].date;
              return (
                <React.Fragment key={msg.id}>
                  {showDateSeparator && (
                    <div className="messageSeperator">{msg.date}</div>
                  )}
                  <div
                    className={`message ${msg.type}`}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setShowMessageOptions(msg.id);
                    }}
                  >
                    {/* Message Files */}
                    {msg.files && msg.files.length > 0 && (
                      <div
                        className={`messageFiles ${
                          msg.files.length > 1 ? "multiple" : "single"
                        }`}
                      >
                        {msg.files.map((file, fileIndex) => (
                          <div key={fileIndex} className="messageFile">
                            {file.type === "image" ? (
                              <img
                                src={file.url}
                                alt={file.name}
                                className="messageImage"
                              />
                            ) : file.type === "video" ? (
                              <video controls className="messageVideo">
                                <source src={file.url} type="video/mp4" />
                              </video>
                            ) : (
                              <div className="messageFileGeneric">
                                <FaFile className="fileIcon" />
                                <span className="fileName">{file.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Message Content */}
                    {msg.content && (
                      <p className="messageContent">{msg.content}</p>
                    )}

                    <div className="messageDetails">
                      <div className="messageTime">{msg.time}</div>
                      {msg.type === "me" &&
                        (msg.read ? (
                          <FaCheckDouble className="readReceipt read" />
                        ) : (
                          <FaCheck className="readReceipt" />
                        ))}
                    </div>

                    {/* Message Options */}
                    {showMessageOptions === msg.id && (
                      <div className="messageOptions">
                        <button onClick={() => deleteMessage(msg.id)}>
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Blocked Warning */}
          {isBlocked && (
            <div className="blockedWarning">
              You have blocked this user. Unblock to send messages.
            </div>
          )}

          {/* MESSAGE FORM */}
          {!isBlocked && (
            <form id="MessageForm" onSubmit={handleSubmit}>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                multiple
              />

              <label htmlFor="fileInput" className="iconBtn">
                <FaPaperclip className="icon" />
              </label>

              <input
                type="text"
                id="MessageInput"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                disabled={isBlocked}
              />

              <button className="Send" type="submit" disabled={isBlocked}>
                <FaPaperPlane />
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
};

export default Messages;
