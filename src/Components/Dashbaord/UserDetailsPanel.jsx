// components/UserDetailsPanel.jsx
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaMobile,
  FaTrash,
  FaBan,
  FaImage,
  FaStar,
} from "react-icons/fa";
import {
  Rating,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaThumbsUp } from "react-icons/fa";

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
          <RatingReviewSection currentChat={currentChat} />
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

// ⭐ Styled Components
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const ReviewCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

// Dummy reviews
const dummyReviews = [
  {
    id: 1,
    user: {
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    rating: 4,
    comment: "Great service provider! Very professional and timely.",
    date: "2024-01-15",
    helpful: 12,
  },
  {
    id: 2,
    user: {
      name: "Bob Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    rating: 5,
    comment: "Excellent work quality and communication. Highly recommended!",
    date: "2024-01-10",
    helpful: 8,
  },
  {
    id: 3,
    user: {
      name: "Carol Davis",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    rating: 3,
    comment: "Good service but there was a slight delay in completion.",
    date: "2024-01-05",
    helpful: 5,
  },
];

const RatingReviewSection = ({ currentChat }) => {
  const [userRating, setUserRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviews, setReviews] = useState(dummyReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmitReview = () => {
    if (userRating === 0) {
      alert("Please select a rating");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      user: {
        name: "You",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      rating: userRating,
      comment: reviewComment,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setUserRating(0);
    setReviewComment("");
    setShowReviewForm(false);
    alert("Review submitted successfully!");
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      const star = Math.floor(review.rating);
      distribution[star]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="userDetailsSection">
      <div className="sectionHeader">
        <h4
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1a237e",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <FaStar style={{ color: "#ffc107" }} />
          Ratings & Reviews
        </h4>
      </div>

      {/* ⭐ Rating Summary */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          p: 3,
          backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: 3,
          color: "#1a237e",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
          },
        }}
      >
        <Box
          sx={{ textAlign: "center", mr: 4, position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="h2"
            component="div"
            fontWeight="bold"
            sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            {averageRating.toFixed(1)}
          </Typography>
          <Box sx={{ my: 1 }}>
            <Rating
              value={averageRating}
              readOnly
              precision={0.1}
              size="large"
            />
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
            {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, position: "relative", zIndex: 1 }}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingDistribution[star];
            const percentage =
              reviews.length > 0 ? (count / reviews.length) * 100 : 0;

            return (
              <Box
                key={star}
                sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
              >
                <Typography
                  variant="body2"
                  sx={{ minWidth: 20, fontWeight: 600 }}
                >
                  {star}
                </Typography>
                <FaStar color="#faaf00" size={14} style={{ margin: "0 8px" }} />
                <Box sx={{ flexGrow: 1, mx: 1, position: "relative" }}>
                  <Box
                    sx={{
                      height: 10,
                      backgroundColor: "rgba(194, 183, 183, 0.3)",
                      borderRadius: 5,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        background: "#faaf00",
                        width: `${percentage}%`,
                        transition: "width 0.5s ease-in-out",
                        borderRadius: 5,
                      }}
                    />
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ minWidth: 35, fontWeight: 600, textAlign: "right" }}
                >
                  {count}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ⭐ Add Review Button */}
      {!showReviewForm && (
        <Button
          variant="contained"
          fullWidth
          sx={{
            mb: 3,
            py: 1.5,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: 2,
            fontSize: "1rem",
            fontWeight: "600",
            textTransform: "none",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
              boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.3s ease",
          }}
          onClick={() => setShowReviewForm(true)}
          startIcon={<FaStar style={{ fontSize: "1.2rem" }} />}
        >
          Write a Review
        </Button>
      )}

      {/* ⭐ Review Form */}
      {showReviewForm && (
        <Box
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.05)",
            animation: "slideDown 0.3s ease-out",
            "@keyframes slideDown": {
              from: { opacity: 0, transform: "translateY(-10px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 700, color: "#1a237e" }}
          >
            Share Your Experience
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="legend"
              sx={{ mb: 1, fontWeight: 600, color: "#37474f" }}
            >
              How would you rate your experience?
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating
                name="user-rating"
                value={userRating}
                onChange={(event, newValue) => setUserRating(newValue)}
                onChangeActive={(event, newHover) => setHoverRating(newHover)}
                size="large"
                defaultValue={2.5}
                precision={0.5}
                sx={{
                  fontSize: "2.5rem",
                  "& .MuiRating-iconFilled": {
                    color: "#faaf00",
                  },
                  "& .MuiRating-iconHover": {
                    color: "#faaf00",
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {hoverRating !== -1 ? hoverRating : userRating || 0}/5
              </Typography>
            </Box>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Tell us about your experience... What did you like? What could be improved?"
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "#667eea",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea",
                  borderWidth: 2,
                },
              },
            }}
          />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={() => setShowReviewForm(false)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                borderColor: "#ddd",
                "&:hover": {
                  borderColor: "#999",
                  backgroundColor: "rgba(0,0,0,0.02)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitReview}
              disabled={userRating === 0}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                  transform: "translateY(-1px)",
                },
                "&:disabled": {
                  background: "#ccc",
                  transform: "none",
                },
                transition: "all 0.3s ease",
              }}
            >
              Submit Review
            </Button>
          </Box>
        </Box>
      )}

      {/* ⭐ Reviews List */}
      <Box sx={{ mt: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 700, color: "#1a237e", mb: 3 }}
        >
          Recent Reviews
        </Typography>

        {reviews.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              px: 3,
              backgroundColor: "rgba(0,0,0,0.02)",
              borderRadius: 3,
              border: "2px dashed #ddd",
            }}
          >
            <FaStar
              style={{ fontSize: "3rem", color: "#ddd", marginBottom: "1rem" }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Reviews Yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Be the first to share your experience!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ "& > *": { mb: 2 } }}>
            {reviews.map((review) => (
              <Box
                key={review.id}
                sx={{
                  p: 3,
                  backgroundColor: "white",
                  borderRadius: 3,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <Avatar
                    src={review.user.avatar}
                    alt={review.user.name}
                    sx={{
                      width: 48,
                      height: 48,
                      mr: 2,
                      border: "3px solid #f0f0f0",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="#1a237e"
                      >
                        {review.user.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          backgroundColor: "rgba(0,0,0,0.04)",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          fontWeight: 500,
                        }}
                      >
                        {review.date}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 0.5,
                      }}
                    >
                      <Rating
                        value={review.rating}
                        readOnly
                        precision={0.5}
                        size="small"
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color: "#ffc107",
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight="500"
                      >
                        {review.rating.toFixed(1)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    mb: 1,
                    lineHeight: 1.6,
                    color: "#37474f",
                  }}
                >
                  {review.comment}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                    pt: 2,
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  {review.user.name === "You" && (
                    <Chip
                      label="Your Review"
                      size="small"
                      sx={{
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                        fontWeight: 500,
                      }}
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </div>
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

const SharedMediaSection = ({
  mediaFiles,
  onOpenMediaGallery,
  onMediaPreview,
}) => (
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
