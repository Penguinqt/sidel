import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from './Components/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignupPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
