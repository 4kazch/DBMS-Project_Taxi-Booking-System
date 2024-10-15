import axios from 'axios';
import React, { useState } from 'react'

function TripHistory() {

    const [trips, setTrips] = useState([]);

    axios.get("http://localhost:5000/api/users/trip-history")
    .then((res)=>{
        setTrips(res.data)
    })
    .catch((err)=>console.log(err))

  return (
    <>
    <div className="trip-history">
      <h2>Trip History</h2>
      <table>
        <thead>
          <tr>
            <th>Pickup Location</th>
            <th>Dropoff Location</th>
            <th>Date</th>
            <th>Fare</th>
            <th>Driver</th>
            <th>Taxi License</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(trip => (
            <tr key={trip.trip_id}>
              <td>{trip.pickup_location}</td>
              <td>{trip.dropoff_location}</td>
              <td>{new Date(trip.trip_start_time).toLocaleString()}</td>
              <td>{trip.trip_fare}</td>
              <td>{trip.driver_name}</td>
              <td>{trip.taxi_license}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default TripHistory