import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Homepage'
import Userlogin from './components/UserLogin/Userlogin'
import Driverlogin from './components/DriverLogin/Driverlogin';
import DriverPage from './components/DriverPage';
import UserPage from './components/DriverLogin/UserPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rider-login" element={<Userlogin />} />
          <Route path="/driver-login" element={<Driverlogin />} />
          <Route path="/driver-page" element={<DriverPage />} />
          <Route path="/user-page" element={<UserPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
