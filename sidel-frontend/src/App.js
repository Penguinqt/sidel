import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from './Components/SignupPage';
import LandingPage  from './Components/LandingPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<SignupPage />}/> 
      </Routes>
    </Router>
  );
}

export default App;
