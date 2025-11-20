import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from './Components/SignupPage';
import LandingPage  from './Components/LandingPage';
import LoginPage from './Components/LoginPage';
import Dashboard from "./Components/Dashboard";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/login" element={<LoginPage />}/> 
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
