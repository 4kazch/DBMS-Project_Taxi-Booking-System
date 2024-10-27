import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { log } from "console";
import { useNavigate } from "react-router-dom";

const TripBooking = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [tripStartTime, setTripStartTime] = useState('');
  const [tripFare, setTripFare] = useState('');

  function handleSubmit(event){
    event.preventDefault();
    axios.post("http://localhost:5001/api/users/book-trip",{
      pickupLocation,
      dropoffLocation,
      tripStartTime,
      tripFare
    })
    .then((res)=>{
      if(res.status===200){
        window.alert("Taxi booked successfully.");
      }
    })
    .catch((err)=>{
      if (err.response && err.response.status === 400) {
        window.alert("No taxis available at the moment. Please try later.");
      } else {
        window.alert("An error occurred. Please try again.");
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Pickup Location"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dropoff Location"
        value={dropoffLocation}
        onChange={(e) => setDropoffLocation(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={tripStartTime}
        onChange={(e) => setTripStartTime(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Trip Fare"
        value={tripFare}
        onChange={(e) => setTripFare(e.target.value)}
        required
      />
      <button type="submit">Book Trip</button>
    </form>
  );
};

export default TripBooking;
