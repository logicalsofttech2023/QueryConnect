// components/MediaPreview.jsx
import React, { useEffect } from "react";
import {
  FaTimes,
  FaDownload,
  FaEllipsisH,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const MediaPreview = ({
  selectedMedia,
  currentMediaIndex,
  mediaFiles,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedMedia) {
        if (e.key === "Escape") {
          onClose();
        } else if (e.key === "ArrowRight") {
          onNavigate("next");
        } else if (e.key === "ArrowLeft") {
          onNavigate("prev");
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedMedia, currentMediaIndex, onClose, onNavigate]);

  if (!selectedMedia) return null;

  return (
    <>
      <div className="mediaPreview">
        <div className="previewHeader">
          <button className="closeButton"   onClick={onClose}>
            <FaTimes />
          </button>
          <div className="previewTitle">{selectedMedia.name}</div>
          <div className="previewActions">
            <button className="actionBtn">
              <FaDownload />
            </button>
            <button className="actionBtn">
              <FaEllipsisH />
            </button>
          </div>
        </div>

        <div className="previewContent">
          <img src={selectedMedia.preview} alt={selectedMedia.name} />

          <button
            className="navButton prev"
            onClick={() => onNavigate("prev")}
          >
            <FaArrowLeft />
          </button>
          <button
            className="navButton next"
            onClick={() => onNavigate("next")}
          >
            <FaArrowRight />
          </button>
        </div>

        <div className="previewFooter">
          <div className="mediaInfo">
            <div className="mediaName">{selectedMedia.name}</div>
            <div className="mediaDate">Shared on {selectedMedia.date}</div>
          </div>
        </div>
      </div>
      <div className="previewOverlay" onClick={onClose} />
    </>
  );
};

export default MediaPreview;