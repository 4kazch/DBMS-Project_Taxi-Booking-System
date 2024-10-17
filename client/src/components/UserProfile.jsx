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
      <div className="profile-container flex flex-col items-center justify-center">
      <div className="text-2xl flex gap-10 items-center justify-center font-mono p-10">
        <Link
          to="/user-profile"
          className="underline underline-offset-8"
        >
          Profile
        </Link>
        <Link
          to="/user-home"
          className="hover:underline underline-offset-8"
        >
          Book a Trip
        </Link>
        <Link
          to="/trip-history"
          className="hover:underline underline-offset-8"
        >
          View Trip History
        </Link>
      </div>
        <h2 className="text-5xl font-nunito font-bold">User Profile</h2>
        <div className="text-3xl font-nunito">
        <p className="py-3">
          <strong>Name:</strong> {profile.full_name}
        </p>
        <p className="py-3">
          <strong>Email:</strong> {profile.email}
        </p>
        <p className="py-3">
          <strong>Phone:</strong> {profile.phone_number}
        </p>
        <p className="py-3">
          <strong>Address:</strong> {profile.address}
        </p>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
