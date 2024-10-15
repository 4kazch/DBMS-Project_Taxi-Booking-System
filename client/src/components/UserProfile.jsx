import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserProfile() {
  const [profile, setProfile] = useState({});

  axios
    .get("http://localhost:5000/api/users/profile")
    .then((res) => {
      setProfile(res.data);
    })
    .catch((err) => console.log(err));

  return (
    <>
      <div className="profile-container">
        <h2>User Profile</h2>
        <p>
          <strong>Name:</strong> {profile.full_name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Phone:</strong> {profile.phone_number}
        </p>
        <p>
          <strong>Address:</strong> {profile.address}
        </p>
      </div>
      <div>
        <Link
          to="/trip-book"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
        >
          Book a Trip
        </Link>
        <Link
          to="/trip-history"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
        >
          View Trip History
        </Link>
      </div>
    </>
  );
}

export default UserProfile;
