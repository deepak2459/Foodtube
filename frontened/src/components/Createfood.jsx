import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/createfood.css'
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api.js';

const Createfood = () => { 
    const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const formRef = useRef(null);
  const scrollButtonRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setVideoFile(file);
    try {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } catch (err) {
      setPreview(null);
    }
  };

  useEffect(() => {
    // When preview appears, show hint to scroll to form (or auto-scroll)
    if (preview && formRef.current) {
      // small delay to let layout settle
      const t = setTimeout(() => {
        // don't auto-scroll; show a button for user control
        if (scrollButtonRef.current) scrollButtonRef.current.classList.add('visible');
      }, 300);
      return () => clearTimeout(t);
    } else {
      if (scrollButtonRef.current) scrollButtonRef.current.classList.remove('visible');
    }
  }, [preview]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setVideoFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Please enter a name.' });
      return;
    }
    if (!videoFile) {
      setMessage({ type: 'error', text: 'Please select a video file.' });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('video', videoFile);

    setLoading(true);
    try { 
 console.log(formData);
 
      const res = await axios.post(`${API_URL}/api/food`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      setMessage({ type: 'success', text: 'Video uploaded successfully.' });
      resetForm();
  navigate('/');
      console.log('upload response', res.data);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: (err.response && err.response.data && err.response.data.message) || 'Upload failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createfood-page">
      <div className="createfood-card">
        <button className="close-btn" onClick={() => navigate(-1)} aria-label="Close">✕</button>
        <h2>Create video item</h2>
        <p className="muted">Add a name, upload a short vertical video and a short description.</p>

  <form ref={formRef} onSubmit={handleSubmit} className="createfood-form">
          <label className="field">
            <span className="label">Name</span>
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Crispy Burger Reel"
              required
            />
          </label>

          <label className="field">
            <span className="label">Video</span>
            <input
              className="form-input"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
            />
            <small className="hint">Tip: short vertical videos (9:16) work best.</small>
          </label>

          {preview && (
            <div className="preview">
              <video src={preview} controls width="300" />
            </div>
          )}

          {/* Scroll-to-form floating button (visible when preview present) */}
          <button
            type="button"
            ref={scrollButtonRef}
            className="scroll-to-form"
            onClick={() => {
              if (formRef.current) {
                // scroll so the first form control is visible
                const firstField = formRef.current.querySelector('input, textarea, select');
                if (firstField) firstField.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            aria-hidden={false}
          >
            Go to form
          </button>

          <label className="field">
            <span className="label">Description</span>
            <textarea
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description (ingredients, promo, behind the scenes...)"
              rows={4}
            />
          </label>

          <div className="actions">
            <button type="submit" className="btn primary" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
            <button type="button" className="btn" onClick={resetForm} disabled={loading}>Reset</button>
          </div>

          {message && (
            <div className={`message ${message.type === 'error' ? 'error' : 'success'}`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Createfood;
