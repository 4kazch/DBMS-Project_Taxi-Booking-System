import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Homepage'
import Userlogin from './components/UserLogin/Userlogin'
import Driverlogin from './components/DriverLogin/Driverlogin';
import TripBooking from './components/TripBooking';
import UserProfile from './components/UserProfile';
import TripHistory from './components/TripHistory';
import DriverProfile from './components/DriverProfile';
import DriverTripPage from './components/DriverTripPage';
import DriverTripHistory from './components/DriverTripHistory';
import UserHome from './components/UserHome/UserHome';
import HelpPage from './components/Help';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rider-login" element={<Userlogin />} />
          <Route path="/driver-login" element={<Driverlogin />} />
          <Route path="/trip-book" element={<TripBooking />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/trip-history" element={<TripHistory />} />
          <Route path="/driver-profile" element={<DriverProfile />} />
          <Route path="/driver-trippage" element={<DriverTripPage />} />
          <Route path="/driver-triphistory" element={<DriverTripHistory />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/user-home" element={<UserHome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
