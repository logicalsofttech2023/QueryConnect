import React, { useState, useRef } from "react";
import "./NewQueries.css";
import { FaImage,FaVideo } from "react-icons/fa";


const NewQueries = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videos: [],
    images: [],
    queryType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageDragOver, setImageDragOver] = useState(false);
  const [videoDragOver, setVideoDragOver] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const fileArray = Array.from(files);
      if (name === 'images') {
        setFormData(prev => ({ 
          ...prev, 
          images: [...prev.images, ...fileArray]
        }));
      } else if (name === 'videos') {
        setFormData(prev => ({ 
          ...prev, 
          videos: [...prev.videos, ...fileArray]
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageDragOver = (e) => {
    e.preventDefault();
    setImageDragOver(true);
  };

  const handleImageDragLeave = (e) => {
    e.preventDefault();
    setImageDragOver(false);
  };

  const handleVideoDragOver = (e) => {
    e.preventDefault();
    setVideoDragOver(true);
  };

  const handleVideoDragLeave = (e) => {
    e.preventDefault();
    setVideoDragOver(false);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    if (type === 'image') {
      setImageDragOver(false);
    } else {
      setVideoDragOver(false);
    }
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      if (type === 'image') {
        const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
        setFormData(prev => ({ 
          ...prev, 
          images: [...prev.images, ...imageFiles]
        }));
      } else if (type === 'video') {
        const videoFiles = fileArray.filter(file => file.type.startsWith('video/'));
        setFormData(prev => ({ 
          ...prev, 
          videos: [...prev.videos, ...videoFiles]
        }));
      }
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeVideo = (index) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const clearAllImages = () => {
    setFormData(prev => ({ ...prev, images: [] }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearAllVideos = () => {
    setFormData(prev => ({ ...prev, videos: [] }));
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form Data:", formData);
      // await api.submitQuery(formData);
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          title: "",
          description: "",
          videos: [],
          images: [],
          queryType: "",
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (videoInputRef.current) videoInputRef.current.value = '';
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting query:", error);
      alert("Error submitting query. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="wrapper" className="wrapper">
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="block-box post-input-tab p-5 shadow rounded bg-white">
                <h3 className="mb-4">Create New Query</h3>

                {submitSuccess && (
                  <div className="success-message">
                    <h4>✅ Query Submitted Successfully!</h4>
                    <p>Your query has been received and will be processed shortly.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Title */}
                  <div className="form-group mb-3">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Enter a descriptive title for your query"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      placeholder="Please provide detailed information about your query..."
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Multiple Images Upload with Drag & Drop */}
                  <div className="form-group mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label>Upload Images</label>
                      {formData.images.length > 0 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={clearAllImages}
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="file-upload-container">
                      <div
                        className={`file-upload-area ${imageDragOver ? 'drag-over' : ''}`}
                        onDragOver={handleImageDragOver}
                        onDragLeave={handleImageDragLeave}
                        onDrop={(e) => handleDrop(e, 'image')}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <i><FaImage /></i>
                        <div className="upload-text">
                          {formData.images.length > 0 
                            ? `Add More Images (${formData.images.length} selected)` 
                            : 'Drag & Drop Images Here'
                          }
                        </div>
                        <div className="upload-subtext">
                          or click to browse files (JPG, PNG, GIF - Max 10MB each)
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="images"
                          className="file-input"
                          accept="image/*"
                          onChange={handleChange}
                          multiple
                        />
                      </div>

                      {/* Images Preview */}
                      {formData.images.length > 0 && (
                        <div className="preview-container">
                          <div className="preview-title">
                            Selected Images ({formData.images.length})
                          </div>
                          <div className="preview-content">
                            {formData.images.map((image, index) => (
                              <div key={index} className="preview-item">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Preview ${index + 1}`}
                                  className="preview-image"
                                />
                                <button
                                  type="button"
                                  className="remove-btn"
                                  onClick={() => removeImage(index)}
                                >
                                  ×
                                </button>
                                <div className="preview-overlay">
                                  <span className="preview-index">{index + 1}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="file-info">
                            <div className="file-stats">
                              {formData.images.length} image(s) selected • 
                              Total Size: {formatFileSize(
                                formData.images.reduce((total, image) => total + image.size, 0)
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Multiple Videos Upload with Drag & Drop */}
                  <div className="form-group mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label>Upload Videos</label>
                      {formData.videos.length > 0 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={clearAllVideos}
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="file-upload-container">
                      <div
                        className={`file-upload-area ${videoDragOver ? 'drag-over' : ''}`}
                        onDragOver={handleVideoDragOver}
                        onDragLeave={handleVideoDragLeave}
                        onDrop={(e) => handleDrop(e, 'video')}
                        onClick={() => videoInputRef.current?.click()}
                      >
                        <i><FaVideo /></i>
                        <div className="upload-text">
                          {formData.videos.length > 0 
                            ? `Add More Videos (${formData.videos.length} selected)` 
                            : 'Drag & Drop Videos Here'
                          }
                        </div>
                        <div className="upload-subtext">
                          or click to browse files (MP4, MOV, AVI - Max 100MB each)
                        </div>
                        <input
                          ref={videoInputRef}
                          type="file"
                          name="videos"
                          className="file-input"
                          accept="video/*"
                          onChange={handleChange}
                          multiple
                        />
                      </div>

                      {/* Videos Preview */}
                      {formData.videos.length > 0 && (
                        <div className="preview-container">
                          <div className="preview-title">
                            Selected Videos ({formData.videos.length})
                          </div>
                          <div className="preview-content">
                            {formData.videos.map((video, index) => (
                              <div key={index} className="preview-item">
                                <video
                                  controls
                                  className="preview-video"
                                >
                                  <source src={URL.createObjectURL(video)} type={video.type} />
                                  Your browser does not support the video tag.
                                </video>
                                <button
                                  type="button"
                                  className="remove-btn"
                                  onClick={() => removeVideo(index)}
                                >
                                  ×
                                </button>
                                <div className="preview-overlay">
                                  <span className="preview-index">{index + 1}</span>
                                </div>
                                <div className="video-info">
                                  <div className="video-name">{video.name}</div>
                                  <div className="video-size">{formatFileSize(video.size)}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="file-info">
                            <div className="file-stats">
                              {formData.videos.length} video(s) selected • 
                              Total Size: {formatFileSize(
                                formData.videos.reduce((total, video) => total + video.size, 0)
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Query Type Dropdown */}
                  <div className="form-group mb-3">
                    <label>Query Type</label>
                    <select
                      name="queryType"
                      className="form-control"
                      value={formData.queryType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Query Type --</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing Issue</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="submit-btn">
                    <button 
                      type="submit" 
                      className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Query'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQueries;