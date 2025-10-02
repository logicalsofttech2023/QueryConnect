import React, { useState } from "react";
import "./MyQueries.css";
import { Link } from "react-router-dom";

const MyQueryDetail = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [commentText, setCommentText] = useState("");
  const [query, setQuery] = useState({
    id: 1,
    title: "How to implement drag and drop in React?",
    description: "I'm trying to implement a drag and drop feature for file uploads in my React application. I've tried using the HTML5 drag and drop API but facing issues with React's synthetic events. The drag events are not firing properly and I'm having trouble managing the state during drag operations. Can someone help me with the best approach and maybe suggest some good libraries?",
    images: ["media/figure/sample1.jpg", "media/figure/sample1.jpg"],
    videos: [],
    queryType: "technical",
    status: "active",
    user: {
      name: "Test test",
      avatar: "media/figure/chat_5.jpg",
    },
    timestamp: "2 hours ago",
    privacy: "Friends",
    reactions: 25,
    comments: 3,
    shares: 5,
    commentsList: [
      {
        id: 1,
        user: {
          name: "Aahat Akter",
          avatar: "media/figure/chat_5.jpg",
        },
        text: "You can use react-dnd library for this. It's well maintained and has great documentation. I've used it in multiple projects and it handles most drag and drop scenarios very well.",
        timestamp: "1 hour ago",
        reactions: 3,
        replies: [
          {
            id: 11,
            user: {
              name: "Test test",
              avatar: "media/figure/chat_5.jpg",
            },
            text: "Thanks! I'll check it out. Did you face any performance issues with large lists?",
            timestamp: "45 mins ago",
            reactions: 1,
          },
        ],
      },
      {
        id: 2,
        user: {
          name: "Mike Johnson",
          avatar: "media/figure/chat_5.jpg",
        },
        text: "Another good option is react-beautiful-dnd. It's specifically designed for beautiful and accessible drag and drop in React. Works great with lists.",
        timestamp: "30 mins ago",
        reactions: 2,
        replies: [],
      },
      {
        id: 3,
        user: {
          name: "Sarah Wilson",
          avatar: "media/figure/chat_5.jpg",
        },
        text: "If you want a simpler solution without external libraries, you can use the native HTML5 drag and drop with React refs. But I'd recommend starting with react-dnd as it's more React-friendly.",
        timestamp: "15 mins ago",
        reactions: 1,
        replies: [],
      },
    ],
  });

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        user: {
          name: "Current User", // This would come from your auth context
          avatar: "media/figure/chat_5.jpg",
        },
        text: commentText,
        timestamp: "Just now",
        reactions: 0,
        replies: [],
      };

      const updatedQuery = {
        ...query,
        commentsList: [...query.commentsList, newComment],
        comments: query.comments + 1
      };

      setQuery(updatedQuery);
      setCommentText("");
    }
  };

  const handleAddReply = (commentId, replyText) => {
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        user: {
          name: "Current User",
          avatar: "media/figure/chat_5.jpg",
        },
        text: replyText,
        timestamp: "Just now",
        reactions: 0,
      };

      const updatedCommentsList = query.commentsList.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        return comment;
      });

      setQuery({
        ...query,
        commentsList: updatedCommentsList
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  // Component for rendering each comment
  const CommentItem = ({ comment, onReply }) => {
    const [replyText, setReplyText] = useState("");
    const [showReplyInput, setShowReplyInput] = useState(false);

    const handleReplySubmit = () => {
      if (replyText.trim()) {
        onReply(comment.id, replyText);
        setReplyText("");
        setShowReplyInput(false);
      }
    };

    return (
      <li className="main-comments">
        <div className="each-comment">
          <div className="post-header">
            <div className="media">
              <div className="user-img">
                <img src={comment.user.avatar} alt={comment.user.name} />
              </div>
              <div className="media-body">
                <div className="user-title">
                  <a >{comment.user.name}</a>
                </div>
                <ul className="entry-meta">
                  <li className="meta-time">{comment.timestamp}</li>
                </ul>
              </div>
            </div>
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
                style={{ outline: "none" }}
              >
                ...
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" >Close</a>
                <a className="dropdown-item" >Edit</a>
                <a className="dropdown-item" >Delete</a>
              </div>
            </div>
          </div>
          <div className="post-body">
            <p>{comment.text}</p>
          </div>
          <div className="post-footer">
            <ul>
              <li className="post-react">
                <a >
                  <i className="icofont-thumbs-up" />
                  React!
                </a>
                <ul className="react-list">
                  <li><a ><img src="media/figure/reaction_1.png" alt="Like" /></a></li>
                  <li><a ><img src="media/figure/reaction_3.png" alt="Like" /></a></li>
                  <li><a ><img src="media/figure/reaction_4.png" alt="Like" /></a></li>
                  <li><a ><img src="media/figure/reaction_2.png" alt="Like" /></a></li>
                  <li><a ><img src="media/figure/reaction_7.png" alt="Like" /></a></li>
                  <li><a ><img src="media/figure/reaction_6.png" alt="Like" /></a></li>
                  <li><a ><img src="media/figure/reaction_5.png" alt="Like" /></a></li>
                </ul>
              </li>
              <li>
                <a  onClick={(e) => { e.preventDefault(); setShowReplyInput(!showReplyInput); }}>
                  <i className="icofont-reply" />
                  Reply
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <div className="comment-reply" style={{ marginLeft: '50px', marginTop: '10px' }}>
            <div className="user-img">
              <img src="media/figure/chat_5.jpg" alt="User" />
            </div>
            <div className="input-box">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="form-control"
                placeholder="Your Reply...."
                onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit()}
              />
            </div>
          </div>
        )}

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <ul className="children">
            {comment.replies.map(reply => (
              <li key={reply.id} className="main-comments">
                <div className="each-comment">
                  <div className="post-header">
                    <div className="media">
                      <div className="user-img">
                        <img src={reply.user.avatar} alt={reply.user.name} />
                      </div>
                      <div className="media-body">
                        <div className="user-title">
                          <a >{reply.user.name}</a>
                        </div>
                        <ul className="entry-meta">
                          <li className="meta-time">{reply.timestamp}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="post-body">
                    <p>{reply.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div id="wrapper" className="wrapper">
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Filter Section */}
              <div className="block-box filter-tabs mb-4">
                <div className="filter-header">
                  <h3>Query Detail</h3>
                </div>
              </div>

              {/* Query Detail */}
              <div className="block-box post-view">
                <div className="post-header">
                  <div className="media">
                    <div className="user-img">
                      <img src={query.user.avatar} alt={query.user.name} />
                    </div>
                    <div className="media-body">
                      <div className="user-title">
                        <a >{query.user.name}</a>
                      </div>
                      <ul className="entry-meta">
                        <li className="meta-privacy">
                          <i className="icofont-users-alt-4" />
                          {query.privacy}
                        </li>
                        <li className="meta-time">{query.timestamp}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" >Close</a>
                      <a className="dropdown-item" >Edit</a>
                      <a className="dropdown-item" >Delete</a>
                    </div>
                  </div>
                </div>
                <div className="post-body">
                  <div className="post-no-thumbnail">
                    <h5>{query.title}</h5>
                    <p>{query.description}</p>
                    
                    {/* Display images if any */}
                    {query.images && query.images.length > 0 && (
                      <div className="post-images">
                        {query.images.map((image, index) => (
                          <img key={index} src={image} alt={`Query ${index + 1}`} className="img-fluid mb-2" />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="post-meta-wrap">
                    <div className="post-meta">
                      <div className="post-reaction">
                        <div className="reaction-icon">
                          <img src="media/figure/reaction_1.png" alt="icon" />
                          <img src="media/figure/reaction_2.png" alt="icon" />
                          <img src="media/figure/reaction_3.png" alt="icon" />
                        </div>
                        <div className="meta-text">{query.reactions}</div>
                      </div>
                    </div>
                    <div className="post-meta">
                      <div className="meta-text">{query.comments} Comments</div>
                      <div className="meta-text">{query.shares} Shares</div>
                    </div>
                  </div>
                </div>
                <div className="post-footer">
                  <ul>
                    <li className="post-react">
                      <a >
                        <i className="icofont-thumbs-up" />
                        React!
                      </a>
                      <ul className="react-list">
                        <li><a ><img src="media/figure/reaction_1.png" alt="Like" /></a></li>
                        <li><a ><img src="media/figure/reaction_3.png" alt="Like" /></a></li>
                        <li><a ><img src="media/figure/reaction_4.png" alt="Like" /></a></li>
                        <li><a ><img src="media/figure/reaction_2.png" alt="Like" /></a></li>
                        <li><a ><img src="media/figure/reaction_7.png" alt="Like" /></a></li>
                        <li><a ><img src="media/figure/reaction_6.png" alt="Like" /></a></li>
                        <li><a ><img src="media/figure/reaction_5.png" alt="Like" /></a></li>
                      </ul>
                    </li>
                    <li>
                      <a >
                        <i className="icofont-comment" />
                        Comment
                      </a>
                    </li>
                    <li className="post-share">
                      <a  className="share-btn">
                        <i className="icofont-share" />
                        Share
                      </a>
                      <ul className="share-list">
                        <li><a  className="color-fb"><i className="icofont-facebook" /></a></li>
                        <li><a  className="color-messenger"><i className="icofont-facebook-messenger" /></a></li>
                        <li><a  className="color-instagram"><i className="icofont-instagram" /></a></li>
                        <li><a  className="color-whatsapp"><i className="icofont-brand-whatsapp" /></a></li>
                        <li><a  className="color-twitter"><i className="icofont-twitter" /></a></li>
                      </ul>
                    </li>
                  </ul>
                </div>

                {/* Comments Section */}
                <div className="post-comment">
                  <ul className="comment-list">
                    {query.commentsList.map(comment => (
                      <CommentItem 
                        key={comment.id} 
                        comment={comment} 
                        onReply={handleAddReply}
                      />
                    ))}
                  </ul>
                  
                  <div className="load-more-btn">
                    <a  className="item-btn">
                      Load More Comments <span>4+</span>
                    </a>
                  </div>
                  
                  {/* Add Comment Input */}
                  <div className="comment-reply">
                    <div className="user-img">
                      <img src="media/figure/chat_5.jpg" alt="User" />
                    </div>
                    <div className="input-box">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="form-control"
                        placeholder="Add a comment..."
                      />
                    </div>
                    <button 
                      className="btn btn-primary ml-2"
                      onClick={handleAddComment}
                      disabled={!commentText.trim()}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyQueryDetail;