import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5001/api/users/profile")
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to load profile. Please try again later.');
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
              <Link 
                to="/trip-history"
                className="text-black font-semibold text-lg hover:text-gray-600 transition-colors duration-300 relative group"
              >
                Trip History
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24">
        <h1 className="text-4xl font-bold mb-8">Your Profile</h1>
        
        {loading ? (
          <div className="text-2xl">Loading your profile...</div>
        ) : error ? (
          <div className="text-2xl text-red-500">{error}</div>
        ) : profile ? (
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-600" />
                </div>
                {/* <button className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Profile
                </button> */}
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-6 h-6 mr-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-semibold">{profile.full_name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold">{profile.phone_number}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold">{profile.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <footer className="bg-black text-white py-4 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 FASTAXI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}