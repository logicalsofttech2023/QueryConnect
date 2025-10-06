import React from 'react';
import { FaTimes, FaDownload, FaShare } from 'react-icons/fa';
import './QRCodeModal.css';

const QRCodeModal = ({ isOpen, onClose, type, userName }) => {
  if (!isOpen) return null;

  const callType = type === 'video' ? 'Video Call' : 'Voice Call';
  
  // Sample QR code image - replace with your actual QR code generation or image
  const qrCodeImage = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://play.google.com/store/apps/details?id=com.example.chatapp";

  const handleDownloadQR = () => {
    // Simulate QR code download
    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = `${userName}-${callType}-QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Start ${callType} with ${userName}`,
          text: `Scan this QR code to download our app and start a ${callType.toLowerCase()} with ${userName}`,
          url: 'https://play.google.com/store/apps/details?id=com.example.chatapp',
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText('https://play.google.com/store/apps/details?id=com.example.chatapp')
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Failed to copy:', err));
    }
  };

  return (
    <div className="qrModalOverlay" onClick={onClose}>
      <div className="qrModalContent" onClick={(e) => e.stopPropagation()}>
        <div className="qrModalHeader">
          <h3>Start {callType}</h3>
          <button className="closeButton" style={{ position: "static"}} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="qrModalBody">
          <div className="qrInfo">
            <p>
              To start a {callType.toLowerCase()} with <strong>{userName}</strong>, 
              scan this QR code to download our app from Play Store.
            </p>
          </div>

          <div className="qrCodeContainer">
            <img src={qrCodeImage} alt="QR Code" className="qrCodeImage" />
            <div className="qrScanText">Scan QR Code</div>
          </div>

          <div className="qrInstructions">
            <h4>How to use:</h4>
            <ol>
              <li>Scan the QR code with your phone camera</li>
              <li>Download our app from Play Store</li>
              <li>Install and open the app</li>
              <li>Start your {callType.toLowerCase()} with {userName}</li>
            </ol>
          </div>
        </div>

        <div className="qrModalFooter">
          <button className="qrActionBtn secondary" onClick={handleDownloadQR}>
            <FaDownload />
            Download QR
          </button>
          <button className="qrActionBtn primary" onClick={handleShare}>
            <FaShare />
            Share Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;