import {BrowserRouter as Router,Routes,Route} from "react-router-dom" 
import PartnerRegister from '../components/PartnerRegister.jsx';
import PartnerLogin from "../components/PartnerLogin.jsx";
import UserRegister from "../components/UserRegister.jsx";
import UserLogin from "../components/UserLogin.jsx";
import Home from "../components/Home.jsx";
import Profile from "../components/Profile.jsx";
import React from 'react'
import Createfood from "../components/Createfood.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/partner/register" element={<PartnerRegister />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/createfood" element={<Createfood />} />
      </Routes>
    </Router>
  )
}

// export default AppRoutes
//       </Routes>
//     </Router>
//   )
// }

export default AppRoutes