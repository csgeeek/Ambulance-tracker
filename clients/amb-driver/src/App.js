import './dist/output.css';
import './App.css';
import Driver from './components/Driver';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/driver" element={<Driver />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;