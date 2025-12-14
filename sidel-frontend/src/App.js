import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from './Components/SignupPage';
import LandingPage  from './Components/LandingPage';
import LoginPage from './Components/LoginPage';
import Dashboard from "./Components/Dashboard";
import Reviews from "./Components/Reviews";
import ProvidersForm from "./Components/ProvidersForm";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";
import ProvidersPage from "./Components/ProvidersPage";
import PersonalInformation from "./Components/PersonalInformation";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/login" element={<LoginPage />}/> 
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/reviews" element={<Reviews/>}/>
        <Route path="/provider/register" element={<ProvidersForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/provider/page" element={<ProvidersPage />} />
        <Route path="/profile" element={<PersonalInformation />} />
      </Routes>
    </Router>
  );
}

export default App;
