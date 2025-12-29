import '../styles/auth.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api.js'
const PartnerRegister = ({ fitViewport = true }) => { 

  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const fullname = event.target.restaurantName.value;
     
    const username = event.target.username.value;
  
    const email = event.target.email.value;

    const phone = event.target.phone.value;

    const address = event.target.address.value;

    const password = event.target.password.value;

    

   const response = await axios.post(
    `${API_URL}/api/auth/register/partner`,
       {
          fullname, 
          username, 
          email, 
          contactNumber: phone, 
          address, 
          password
       }, { withCredentials: true }
   );

       console.log(response.data);
       navigate('/createfood');
  }
  return (
    <div className="auth-container">
      <div className={`auth-card ${fitViewport ? 'auth-card--fit' : 'auth-card--compact'}`}>
        <button className="close-btn" onClick={() => navigate(-1)} aria-label="Close">✕</button>
       
        <div className="auth-header">
          <h1>Partner Registration</h1>
          <p>Join our food delivery network</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="restaurantName" className="form-label">
              Restaurant Name
            </label>
            <input
              type="text"
              id="restaurantName"
              name="restaurantName"
              className="form-input"
              placeholder="Enter restaurant name"
               
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Business Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter business email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Contact Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              placeholder="Enter contact number"
              required
            />
          </div>

          <div className="form-group form-group--full">
            <label htmlFor="address" className="form-label">
              Restaurant Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-input"
              placeholder="Enter restaurant address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Choose a strong password"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">Register as Partner</button>
          </div>

          <div className="auth-divider form-group--full"><span>Already a partner? <a href="/partner/login">Login here</a></span></div>
        </form>

        
      </div>
    </div>
  );
};

export default PartnerRegister;