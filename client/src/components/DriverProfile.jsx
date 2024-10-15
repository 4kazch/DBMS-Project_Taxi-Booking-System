import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function DriverProfile() {

    const [profile, setProfile] = useState({});

    axios
    .get("http://localhost:5000/api/drivers/profile")
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
          <strong>License Number:</strong> {profile.license_number}
        </p>
        <p>
          <strong>Address:</strong> {profile.address}
        </p>
        <p>
          <strong>Date of Birth:</strong> {profile.date_of_birth}
        </p>
      </div>
      <div>
        <Link
          to="/driver-trippage"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
        >
          View Current Trips
        </Link>
        <Link
          to="/driver-triphistory"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
        >
          View Trip History
        </Link>
      </div>
    </>
  )
}

export default DriverProfile;

