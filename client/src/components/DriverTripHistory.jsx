import axios from 'axios';
import React, { useState } from 'react'

function DriverTripHistory() {

    const [trips, setTrips] = useState([]);

    axios
    .get('http://localhost:5000/api/drivers/driver-history')
    .then((res)=>setTrips(res.data))
    .catch((err)=>console.log(err))

  return (
    <>
    <div>
      <h2>Trip History</h2>
      <table>
        <thead>
          <tr>
            <th>Pickup Location</th>
            <th>Dropoff Location</th>
            <th>Start Time</th>
            <th>Fare</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(trip => (
            <tr key={trip.trip_id}>
              <td>{trip.pickup_location}</td>
              <td>{trip.dropoff_location}</td>
              <td>{new Date(trip.trip_start_time).toLocaleString()}</td>
              <td>₹{trip.trip_fare}</td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default DriverTripHistory