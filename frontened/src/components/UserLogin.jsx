import '../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api.js'

const UserLogin = ({ fitViewport = true, onSwitch, onAuthSuccess }) => {
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value; 
    try {
      const res = await axios.post(`${API_URL}/api/auth/login/user`, {
        email,
        password
      }, { withCredentials: true });

      console.log(res.data);
      if (onAuthSuccess) 
      onAuthSuccess();
      navigate('/');
    } catch (err) {
      console.error('Login failed', err?.response || err);
      // you can show an error message to the user here
    }
  }

  return (
    <div className="auth-container">
      <div className={`auth-card ${fitViewport ? 'auth-card--fit' : 'auth-card--compact'}`}>
        <button className="close-btn" onClick={() => navigate(-1)} aria-label="Close">✕</button>
        <div className="auth-header">
          <h1>Welcome back</h1>
          <p>Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group form-group--full">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" id="email" name="email" className="form-input" placeholder="Enter your email" required />
          </div>

          <div className="form-group form-group--full">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" name="password" className="form-input" placeholder="Enter your password" required />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Sign In</button>
          </div>

          <div className="auth-divider form-group--full"><span>Not have register? <a href="/register">Register here</a></span></div>
        </form>

        {/* <div className="auth-footer">
          Don't have an account?{' '}
          {onSwitch ? (
            <button type="button" className="link-button" onClick={() => onSwitch('register')}>Register account</button>
          ) : (
            <a href="/register">Register account</a>
          )}
        </div> */}
        {/* <div className="auth-divider" style={{marginTop:8}}>
          <span>Already a partner?{' '}
            {onSwitch ? (
              <button type="button" className="link-button" onClick={() => onSwitch('partner-login')}>Login here</button>
            ) : (
              <a href="/register">Login here</a>
            )}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default UserLogin;