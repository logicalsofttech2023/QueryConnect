import React, { useState, useEffect, useRef } from "react";
import "./Messages.css";
import ChatList from "./ChatList";
import ChatSection from "./ChatSection";
import UserDetailsPanel from "./UserDetailsPanel";
import MediaGallery from "./MediaGallery";
import MediaPreview from "./MediaPreview";
import QRCodeModal from "./QRCodeModal";
import { FaArrowLeft, FaBars } from "react-icons/fa";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [messageSearchQuery, setMessageSearchQuery] = useState("");
  const [showMessageSearch, setShowMessageSearch] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showQRModal, setShowQRModal] = useState(false);
  const [callType, setCallType] = useState("");
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [query, setQuery] = useState({
    id: 1,
    description:
      "I'm trying to implement a drag and drop feature for file uploads in my React application. I've tried using the HTML5 drag and drop API but facing issues with React's synthetic events. The drag events are not firing properly and I'm having trouble managing the state during drag operations. Can someone help me with the best approach and maybe suggest some good libraries?",
    images: ["media/figure/sample1.jpg", "media/figure/sample1.jpg"],
    videos: [],
    queryType: "technical",
    status: "active",
    user: {
      name: "Rahul Mehta",
      avatar: "media/figure/chat_5.jpg",
    },
    timestamp: "2 hours ago",
    startTime: "06:00",
    endTime: "20:00",

    agentsList: [
      {
        id: 1,
        user: {
          name: "Neha Sharma",
          avatar: "media/figure/chat_5.jpg",
        },
        text: "You can use react-dnd library for this. It's well maintained and has great documentation. I've used it in multiple projects and it handles most drag and drop scenarios very well.",
        timestamp: "1 hour ago",
        rating: 4.5,
        images: ["media/figure/sample1.jpg", "media/figure/sample1.jpg"],
      },
      {
        id: 2,
        user: {
          name: "Amit Verma",
          avatar: "media/figure/chat_5.jpg",
        },
        text: "Another good option is react-beautiful-dnd. It's specifically designed for beautiful and accessible drag and drop in React. Works great with lists.",
        timestamp: "30 mins ago",
        rating: 4.5,
        images: ["media/figure/sample1.jpg", "media/figure/sample1.jpg"],
      },
      {
        id: 3,
        user: {
          name: "Priya Singh",
          avatar: "media/figure/chat_5.jpg",
        },
        text: "If you want a simpler solution without external libraries, you can use the native HTML5 drag and drop with React refs. But I'd recommend starting with react-dnd as it's more React-friendly.",
        timestamp: "15 mins ago",
        rating: 3.5,
        images: null,
      },
    ],

    commentsList: [
      {
        id: 1,
        text: "You can use react-dnd library for this. It's well maintained and has great documentation. I've used it in multiple projects and it handles most drag and drop scenarios very well.",
        timestamp: "1 hour ago",
      },
    ],
  });

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      avatar: "media/figure/chat_5.jpg",
      online: true,
      lastSeen: "2 min ago",
      unread: 3,
      phone: "+91 98765 43210",
      isFavorite: true,
      isMuted: false,
    },
    {
      id: 2,
      name: "Priya Verma",
      message: "Hey there! How are you doing?",
      avatar: "media/figure/chat_5.jpg",
      online: false,
      lastSeen: "1 hour ago",
      unread: 0,
      phone: "+91 87654 32109",
      isFavorite: false,
      isMuted: true,
    },
    {
      id: 3,
      name: "Rohit Singh",
      message: "Let's meet tomorrow for coffee",
      avatar: "media/figure/chat_5.jpg",
      online: true,
      lastSeen: "just now",
      unread: 1,
      phone: "+91 76543 21098",
      isFavorite: false,
      isMuted: false,
    },
  ]);

  const [currentChat, setCurrentChat] = useState({
    id: 1,
    name: "Amit Sharma",
    avatar: "media/figure/chat_5.jpg",
    online: true,
    lastSeen: "2 min ago",
    phone: "+91 98765 43210",
    isFavorite: true,
    isMuted: false,
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "me",
      content: "Hello!",
      time: "3:21 PM",
      date: "yesterday",
      read: true,
    },
    {
      id: 2,
      type: "you",
      content: "I'm Fine!",
      time: "3:30 PM",
      date: "yesterday",
      read: true,
    },
    {
      id: 3,
      type: "you",
      content: "Here are Pics!",
      time: "8:09 AM",
      date: "today",
      read: true,
    },
    {
      id: 4,
      type: "me",
      content: "Check this video!",
      time: "9:15 AM",
      date: "today",
      read: false,
    },
  ]);

  const [mediaFiles, setMediaFiles] = useState([
    {
      id: 1,
      type: "image",
      name: "beach.jpg",
      date: "2023-10-15",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      preview:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      type: "image",
      name: "mountain.png",
      date: "2023-10-14",
      url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=300&fit=crop",
      preview:
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      type: "file",
      name: "document.pdf",
      date: "2023-10-13",
      url: "#",
      preview: null,
    },
    {
      id: 4,
      type: "link",
      name: "project-link",
      date: "2023-10-12",
      url: "#",
      preview: null,
    },
    {
      id: 5,
      type: "image",
      name: "forest.jpg",
      date: "2023-10-11",
      url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop",
      preview:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      type: "image",
      name: "city.jpg",
      date: "2023-10-10",
      url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop",
      preview:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
    },
  ]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
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
      };
      setMessages([...messages, newMessage]);
      setMessage("");
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
    if (isMobile) closeMobileMenu();

    const updatedMessages = messages.map((msg) => ({ ...msg, read: true }));
    setMessages(updatedMessages);

    const updatedChats = chats.map((c) =>
      c.id === chat.id ? { ...c, unread: 0 } : c
    );
    setChats(updatedChats);

    scrollToTop();
  };

  const clearChat = () => {
    setMessages([]);
    setShowChatOptions(false);
  };

  const toggleBlock = () => {
    setIsBlocked(!isBlocked);
    setShowChatOptions(false);
  };

  const scrollToTop = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = 0;
    }
  };

  const openMediaGallery = () => {
    setShowMediaGallery(true);
  };

  const closeMediaGallery = () => {
    setShowMediaGallery(false);
    setSelectedMedia(null);
    setCurrentMediaIndex(0);
  };

  const openMediaPreview = (media, index) => {
    setSelectedMedia(media);
    setCurrentMediaIndex(index);
  };

  const closeMediaPreview = () => {
    setSelectedMedia(null);
  };

  const navigateMedia = (direction) => {
    const imagesOnly = mediaFiles.filter((file) => file.type === "image");
    let newIndex;
    if (direction === "next") {
      newIndex = (currentMediaIndex + 1) % imagesOnly.length;
    } else {
      newIndex =
        (currentMediaIndex - 1 + imagesOnly.length) % imagesOnly.length;
    }
    setCurrentMediaIndex(newIndex);
    setSelectedMedia(imagesOnly[newIndex]);
  };

  const handleVoiceCall = () => {
    setCallType("voice");
    setShowQRModal(true);
  };

  const handleVideoCall = () => {
    setCallType("video");
    setShowQRModal(true);
  };

  const closeQRModal = () => {
    setShowQRModal(false);
    setCallType("");
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(messageSearchQuery.toLowerCase())
  );

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

      <main className="MessagesMain">
        <ChatList
          chats={filteredChats}
          currentChat={currentChat}
          searchQuery={searchQuery}
          isMobileMenuOpen={isMobileMenuOpen}
          onSearchChange={setSearchQuery}
          onChatSelect={handleChatSelect}
          query={query}
        />

        <ChatSection
          currentChat={currentChat}
          messages={filteredMessages}
          message={message}
          isBlocked={isBlocked}
          showMessageSearch={showMessageSearch}
          messageSearchQuery={messageSearchQuery}
          showChatOptions={showChatOptions}
          messageContainerRef={messageContainerRef}
          messagesEndRef={messagesEndRef}
          onMessageChange={setMessage}
          onMessageSubmit={handleSubmit}
          onMessageSearchChange={setMessageSearchQuery}
          onShowMessageSearch={setShowMessageSearch}
          onShowChatOptions={setShowChatOptions}
          onShowUserDetails={setShowUserDetails}
          onVoiceCall={handleVoiceCall}
          onVideoCall={handleVideoCall}
          onClearChat={clearChat}
          onToggleBlock={toggleBlock}
        />
      </main>

      <UserDetailsPanel
        currentChat={currentChat}
        mediaFiles={mediaFiles}
        showUserDetails={showUserDetails}
        isBlocked={isBlocked}
        onClose={() => setShowUserDetails(false)}
        onOpenMediaGallery={openMediaGallery}
        onClearChat={clearChat}
        onToggleBlock={toggleBlock}
        onMediaPreview={openMediaPreview}
      />

      <MediaGallery
        mediaFiles={mediaFiles}
        showMediaGallery={showMediaGallery}
        onClose={closeMediaGallery}
        onMediaPreview={openMediaPreview}
      />

      <MediaPreview
        selectedMedia={selectedMedia}
        currentMediaIndex={currentMediaIndex}
        mediaFiles={mediaFiles}
        onClose={closeMediaPreview}
        onNavigate={navigateMedia}
      />

      <QRCodeModal
        isOpen={showQRModal}
        onClose={closeQRModal}
        type={callType}
        userName={currentChat.name}
      />
    </div>
  );
};

export default Messages;
