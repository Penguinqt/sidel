import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from './Components/SignupPage';
import LandingPage  from './Components/LandingPage';
import LoginPage from './Components/LoginPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/login" element={<LoginPage />}/> 
      </Routes>
    </Router>
  );
}

export default App;
