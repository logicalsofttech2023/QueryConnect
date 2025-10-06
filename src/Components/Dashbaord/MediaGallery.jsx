// components/MediaGallery.jsx
import React from "react";
import {
  FaArrowLeft,
  FaImages,
  FaDownload,
  FaExternalLinkAlt,
  FaFileAlt,
  FaLink,
} from "react-icons/fa";

const MediaGallery = ({
  mediaFiles,
  showMediaGallery,
  onClose,
  onMediaPreview,
}) => {
  if (!showMediaGallery) return null;

  return (
    <>
      <div className="mediaGallery">
        <div className="galleryHeader">
          <button className="backButton" onClick={onClose}>
            <FaArrowLeft />
          </button>
          <h3>Shared Media</h3>
          <div className="galleryStats">
            {mediaFiles.filter((file) => file.type === "image").length} photos
          </div>
        </div>

        <div className="galleryContent">
          <div className="mediaCategories">
            <button className="categoryBtn active">All</button>
            <button className="categoryBtn">Photos</button>
            <button className="categoryBtn">Documents</button>
            <button className="categoryBtn">Links</button>
          </div>

          <div className="galleryGrid">
            {mediaFiles.map((file, index) => (
              <div
                key={file.id}
                className={`galleryItem ${file.type}`}
                onClick={() =>
                  file.type === "image" && onMediaPreview(file, index)
                }
              >
                {file.type === "image" ? (
                  <img src={file.url} alt={file.name} />
                ) : file.type === "file" ? (
                  <div className="filePreview">
                    <FaFileAlt className="fileIcon" />
                    <span className="fileName">{file.name}</span>
                  </div>
                ) : (
                  <div className="linkPreview">
                    <FaLink className="linkIcon" />
                    <span className="linkName">{file.name}</span>
                  </div>
                )}
                <div className="mediaOverlay">
                  {file.type === "image" && <FaImages className="overlayIcon" />}
                  {file.type === "file" && <FaDownload className="overlayIcon" />}
                  {file.type === "link" && (
                    <FaExternalLinkAlt className="overlayIcon" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="galleryOverlay" onClick={onClose} />
    </>
  );
};

export default MediaGallery;