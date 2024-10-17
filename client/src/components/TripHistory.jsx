import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function TripHistory() {

    const [trips, setTrips] = useState([]);

    axios.get("http://localhost:5000/api/users/trip-history")
    .then((res)=>{
        setTrips(res.data)
    })
    .catch((err)=>console.log(err))

  return (
    <>
    <div className="text-2xl flex gap-10 items-center justify-center font-mono p-10">
        <Link
          to="/user-profile"
          className="hover:underline underline-offset-8"
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
          className="underline underline-offset-8"
        >
          View Trip History
        </Link>
      </div>
    <div className="trip-history flex flex-col items-center justify-center">
      <h2 className='text-5xl font-nunito font-bold p-10'>Trip History</h2>
      <table className='table-auto w-[90vw]'>
        <thead className='text-2xl font-nunito'>
          <tr className=''>
            <th className='py-3'>Pickup Location</th>
            <th>Dropoff Location</th>
            <th>Date</th>
            <th>Fare</th>
            <th>Driver</th>
            <th>Taxi License</th>
          </tr>
        </thead>
        <tbody className='text-xl text-center'>
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