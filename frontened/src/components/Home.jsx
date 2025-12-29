import { useEffect, useRef, useState } from 'react';
import '../styles/home.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserRegister from './UserRegister';
import UserLogin from './UserLogin';
import PartnerRegister from './PartnerRegister';
import PartnerLogin from './PartnerLogin';

const Home = () => {
  const videoRefs = useRef({});
  const observerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthed, setIsAuthed] = useState(null); // null = checking, false = not authed, true = authed
  const navigate = useNavigate();

  // Fetch videos from backend
  // Check authentication status on mount
  useEffect(() => {
    let mounted = true;
    const checkAuth = async () => {
      try {
        await axios.get(' http://localhost:3000/api/auth/register/user', { withCredentials: true });
        if (!mounted) return;
        setIsAuthed(true);
      } catch (err) {
        if (!mounted) return;
        setIsAuthed(false);
      }
    };
    checkAuth();
    return () => { mounted = false; };
  }, []);

  // Fetch videos only when authenticated
  useEffect(() => {
    if (isAuthed === null) return; // still checking
    if (!isAuthed) return; // do nothing if not authed

    let mounted = true;
    setLoading(true);
    setError(null);

    axios.get('http://localhost:3000/api/food/', { withCredentials: true })
      .then((res) => {
        if (!mounted) return;
        const data = res?.data?.food || [];
        const formatted = data.map(item => ({
          id: item._id,
          url: item.video , // fallback if url missing
          description: item.description,
          foodpartner: item.foodpartner,
          storeName: item.name,
        }));
        setVideos(formatted);
      })
      .catch((err) => {
        console.error('Failed to load videos:', err);
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [isAuthed]);

  // Auto play/pause videos
  useEffect(() => {
    const options = { root: null, rootMargin: '-10% 0px', threshold: 0.8 };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(e => console.log("Auto-play prevented:", e));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }, options);

    Object.values(videoRefs.current).forEach(video => {
      if (video) observerRef.current.observe(video);
    });

    return () => observerRef.current?.disconnect();
  }, [videos]);

  const [authView, setAuthView] = useState('login');

  if (isAuthed === null) return (
    <div className="video-feed-container">
      <div className="feed-card">Checking authentication...</div>
    </div>
  );
  if (isAuthed === false) return (
    authView === 'register' ? (
      <UserRegister showPartner={true} fitViewport={true} onSwitch={v => setAuthView(v)} onAuthSuccess={() => setIsAuthed(true)} />
    ) : authView === 'login' ? (
      <UserLogin fitViewport={true} onSwitch={v => setAuthView(v)} onAuthSuccess={() => setIsAuthed(true)} />
    ) : authView === 'partner-register' ? (
      <PartnerRegister fitViewport={true} />
    ) : authView === 'partner-login' ? (
      <PartnerLogin fitViewport={true} />
    ) : null
  );

  if (loading) return (
    <div className="video-feed-container">
      <div className="feed-card">Loading videos...</div>
    </div>
  );
  if (error) return (
    <div className="video-feed-container">
      <div className="feed-card">Error loading videos</div>
    </div>
  );

  return (
    <div className="video-feed-container">
      {videos.map(video => (
        <div key={video.id} className="video-item">
          <video
            ref={el => videoRefs.current[video.id] = el}
            className="video-element"
            src={video.url}
            loop
            muted
            playsInline
            preload="auto"
            controlsList="nodownload"
          />
          <div className="video-overlay">
            <p className="video-description">{video.description}</p>
            <Link className="visit-store-btn"  to={`/profile/${video.foodpartner}`}>
              Visit Store
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
