import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/profile.css';
import API_URL from '../config/api.js'

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [video, setVideo] = useState([]);
  const [playing, setPlaying] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => { 
    axios.get(`${API_URL}/api/foodpartner/${id}`, { withCredentials: true })
      .then(response => {
        setProfile(response.data.foodpartner);
        setVideo(response.data.foodpartner.fooditems);
      })
      .catch(error => {
        console.error('Error fetching food partner data:', error)
      });
  }, [id]);

  useEffect(() => {
    // Observe the .video-reel wrapper so each full-screen reel triggers play when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.dataset.videoid;
          if (!id) return;
          if (entry.isIntersecting && entry.intersectionRatio > 0.75) {
            setPlaying(id);
          } else {
            // pause when not sufficiently visible
            if (videoRefs.current[id]) {
              try { videoRefs.current[id].pause(); } catch (e) {}
            }
          }
        });
      },
      {
        threshold: [0.75],
      }
    );

    const reels = document.querySelectorAll('.video-reel');
    reels.forEach((r) => observer.observe(r));

    return () => observer.disconnect();
  }, [video]);

  // Play/pause the video when playing state changes
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((videoId) => {
      if (videoId === playing) {
        videoRefs.current[videoId].play();
      } else {
        videoRefs.current[videoId].pause();
      }
    });
  }, [playing]);

  const handleVideoClick = (videoId) => {
    if (playing === videoId) {
      videoRefs.current[videoId].pause();
      setPlaying(null);
    } else {
      setPlaying(videoId);
    }
  };

  // const mockData = {
  //   businessName: "Burger King",
  //   address: "123 Food Street, Foodville, City - 12345",
  //   totalMeals: "43",
  //   customersServed: "15K",
  //   videos: Array(6).fill().map((_, index) => ({
  //     id: index + 1,
  //     url: "video_url",
  //     thumbnail: "thumbnail_url",
  //     title: index % 2 === 0 ? 
  //       "Special Burger Preparation - Watch how we make our signature burgers!" :
  //       "Behind the scenes at our new kitchen setup - Coming soon!",
  //     date: "2025-10-24",
  //     duration: "2:45",
  //     views: Math.floor(Math.random() * 10000) + 1000
  //   }))
  // };
  // const { partnerId } = useParams();
  // const [profileData, setProfileData] = useState({
  //   businessName: "",
  //   address: "",
  //   totalMeals: "0",
  //   customersServed: "0",
  //   videos: []
  // });
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       // For testing, using mockData - replace with actual API call when ready
  //       setTimeout(() => {
  //         setProfileData(mockData);
  //         setLoading(false);
  //       }, 1000);
        
  //       // Uncomment below for actual API integration
  //       // const response = await axios.get(`/api/partner/profile/${partnerId}`);
  //       // setProfileData(response.data);
  //     } catch (err) {
  //       console.error('Failed to load profile:', err);
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfileData();
  // }, [partnerId]);

  // if (loading) {
  //   return (
  //     <div className="loading-container">
  //       Loading profile...
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="error-container">
  //       Failed to load profile. Please try again later.
  //     </div>
  //   );
  // }

  return (
    <div className="profile-container">
      <div className="profile-section">
        <div className="profile-header">
          <div className="profile-image"></div>
          <div className="profile-info">
            <div className="business-name">
              <span className="info-label">Business Name:</span>
              {profile.fullname}
            </div>
            <div className="business-address">
              <span className="info-label">Address:</span>
              {profile.address}
            </div>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-value">{profile.username}</div>
            <div className="stat-label">total meals</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{profile.email}</div>
            <div className="stat-label">customer serve</div>
          </div>
        </div>
      </div>

      <div className="videos-section">
        <h2 className="section-title">
          Videos
          <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
            {video?.length || 0} videos
          </span>
        </h2>
        <div className="videos-scrollable">
          <div className="videos-feed">
            {video?.map((videoItem, index) => (
            <div
              key={videoItem._id}
              className={`video-reel ${playing === videoItem._id ? '' : 'paused'}`}
              data-videoid={videoItem._id}
              onClick={() => handleVideoClick(videoItem._id)}
            >
              <div className="video-container">
                <video
                  ref={el => videoRefs.current[videoItem._id] = el}
                  src={videoItem.video}
                  className="video-player"
                  loop
                  playsInline
                  muted
                  controls={false}
                />
                <div className="play-icon" aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
                  </svg>
                </div>
                <div className="video-overlay">
                  <div className="video-info">
                    <h3>{videoItem.name}</h3>
                    <p>{videoItem.description}</p>
                    <div className="video-metadata">
                      <span className="upload-date">
                        {new Date(videoItem.createdAt).toLocaleDateString()}
                      </span>
                      {playing === videoItem._id ? (
                        <span className="video-status">Playing</span>
                      ) : (
                        <span className="video-status">Tap to play</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

        {!video?.length && (
          <div className="no-videos">
            No videos available yet
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;