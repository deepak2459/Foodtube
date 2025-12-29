import '../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config/api.js'

const PartnerLogin = ({ fitViewport = true }) => {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const response = await axios.post(
      `${API_URL}/api/auth/login/partner`,
      {
        email,
        password
      },
      { withCredentials: true }
    );

    console.log(response.data);
    navigate('/createfood');
  }

  return (
    <div className="auth-container">
      <div className={`auth-card ${fitViewport ? 'auth-card--fit' : 'auth-card--compact'}`}>
        <button className="close-btn" onClick={() => navigate(-1)} aria-label="Close">✕</button>
        <div className="auth-header">
          <h1>Partner Login</h1>
          <p>Access your restaurant dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group form-group--full">
            <label htmlFor="email" className="form-label">Business Email</label>
            <input type="email" id="email" name="email" className="form-input" placeholder="Enter your business email" required />
          </div>

          <div className="form-group form-group--full">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" name="password" className="form-input" placeholder="Enter your password" required />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Sign In</button>
          </div>

          <div className="auth-divider form-group--full"><span>Want to become a partner? <a href="/partner/register">Register here</a></span></div>
        </form>

        
      </div>
    </div>
  );
};

export default PartnerLogin;