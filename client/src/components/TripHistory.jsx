import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, MapPin, DollarSign, User, Truck } from 'lucide-react';

const profileImage = require("././UserHome/userimg.png");

export default function TripHistory() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get("https://dbms-project-taxi-booking-system.onrender.com/api/users/trip-history")
      .then((res) => {
        setTrips(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to load trip history. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-poppins">
      <nav className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg py-4 px-6 fixed w-full z-10 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-black text-3xl font-bold tracking-tighter">
              FASTAXI
            </Link>
            <div className="flex items-center space-x-8">
              
              <Link 
                to="/user-home"
                className="text-black font-semibold text-lg hover:text-gray-600 transition-colors duration-300 relative group"
              >
                Book a Trip
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link to="/user-profile" className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="rounded-full w-10 h-10 border-2 border-white transition-transform duration-300 hover:scale-110"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24">
        <h1 className="text-4xl font-bold mb-8">Your Trip History</h1>
        
        {loading ? (
          <div className="text-2xl">Loading your trips...</div>
        ) : error ? (
          <div className="text-2xl text-red-500">{error}</div>
        ) : trips.length === 0 ? (
          <div className="text-2xl">You haven't taken any trips yet.</div>
        ) : (
          <div className="w-full max-w-4xl">
            {trips.map((trip) => (
              <div key={trip.trip_id} className="bg-white shadow-md rounded-lg mb-6 p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Pickup</p>
                      <p className="font-semibold">{trip.pickup_location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-500">Dropoff</p>
                      <p className="font-semibold">{trip.dropoff_location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-semibold">{new Date(trip.trip_start_time).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-6 h-6 mr-2 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500">Fare</p>
                      <p className="font-semibold">${trip.trip_fare}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="w-6 h-6 mr-2 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Driver</p>
                      <p className="font-semibold">{trip.driver_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Truck className="w-6 h-6 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Taxi License</p>
                      <p className="font-semibold">{trip.taxi_license}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-black text-white py-4 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 FASTAXI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}