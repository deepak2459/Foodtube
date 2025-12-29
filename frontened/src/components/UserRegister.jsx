import '../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api.js';

const UserRegister = ({ showPartner, fitViewport = true, onSwitch, onAuthSuccess }) => {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
      const fullname = e.target.name.value;
      const username = e.target.username.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

     const res =  await axios.post(`${API_URL}/api/auth/register/user`,
         { fullname, username, email, password },
         { withCredentials: true })

      console.log(res.data);
      if (onAuthSuccess) {
        onAuthSuccess();
      } else {
        navigate('/');
      }


  }
  return (
    <div className="auth-container">
      <div className={`auth-card ${fitViewport ? 'auth-card--fit' : 'auth-card--compact'}`}>
        <button className="close-btn" onClick={() => navigate(-1)} aria-label="Close">✕</button>
       
        <div className="auth-header">
          <h1>Register Here</h1>
          <p>Sign up to get started</p>
          {/* {onSwitch && (
            <div className="auth-top-link">
              Already a user? <button type="button" className="link-button" onClick={() => onSwitch('login')}>Login here</button>
            </div>
          )} */}
        </div>

        <form  onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" id="name" name="name" className="form-input" placeholder="Enter your full name" required />
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username" name="username" className="form-input" placeholder="Choose a username" required />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" id="email" name="email" className="form-input" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" name="password" className="form-input" placeholder="Choose a strong password" required />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Create Account</button>
          </div> 
            <div className="auth-divider form-group--full"><span>Already a user? <a href="/login">Login here</a></span></div>
            <div className="auth-divider form-group--full"><span>Want to register as a partner? <a href="/partner/register">Register here</a></span></div>
        </form>

         
      </div>
    </div>
  );
};

export default UserRegister;