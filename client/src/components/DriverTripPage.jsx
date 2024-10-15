import axios from 'axios';
import { log } from 'console';
import React, { useEffect, useState } from 'react'

function DriverTripPage() {

    const [trips, setTrips] = useState([]);

    axios
    .get('http://localhost:5000/api/drivers/driver-trips')
    .then((res)=>setTrips(res.data))
    .catch((err)=>console.log(err))

    function markAsFinished(tripId){
        axios
        .put(`http://localhost:5000/api/drivers/finish-trip/${tripId}`)
        .then((res)=>setTrips(trips.filter(trip => trip.trip_id !== tripId)))
        .catch((err)=>console.log(err))
    }

  return (
    <>
    <div>
      <h2>Assigned Trips</h2>
      <ul>
        {trips.map(trip => (
          <li key={trip.trip_id}>
            <p>Pickup: {trip.pickup_location}</p>
            <p>Dropoff: {trip.dropoff_location}</p>
            <p>Fare: ₹{trip.trip_fare}</p>
            <button onClick={() => markAsFinished(trip.trip_id)}>Mark as Finished</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default DriverTripPage