import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { log } from "console";
import axios from "axios";

const libraries = ["places"];
const profileImage = require("./userimg.png");
const DISTANCE_THRESHOLD = 2;
let fare;
let taxiname;

const taxis = [
  {
    id: 1,
    name: "Economy",
    image: require("./economy.png"),
    rate: 15,
    baseFare: 50,
    zoom: "scale-110",
  },
  {
    id: 2,
    name: "Comfort",
    image: require("./comfort.png"),
    rate: 25,
    baseFare: 70,
    zoom: "scale-110",
  },
  {
    id: 3,
    name: "Premium",
    image: require("./premium.png"),
    rate: 35,
    baseFare: 100,
    zoom: "scale-95",
  },
];

const MapComponent = React.memo(({ directions }) => {
  const center = { lat: 40.7128, lng: -74.006 };
  
  return (
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "#1a73e8",
              strokeWeight: 5,
            },
          }}
        />
      )}
    </GoogleMap>
  );
});

export default function UserHome() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedTaxi, setSelectedTaxi] = useState(null);
  const [directions, setDirections] = useState(null);
  const [cabRates, setCabRates] = useState({});

  useEffect(() => {
    //taxiname=selectedTaxi.name;
    console.log(taxiname);
    console.log("Selected taxi has been updated:", selectedTaxi);
  }, [selectedTaxi]);
  useEffect(() => {
    console.log("Selected taxi has been updated:", source);
  }, [source]);
  useEffect(() => {
    console.log("Selected taxi has been updated:", destination);
  }, [destination]);

  const sourceRef = useRef();
  const destinationRef = useRef();

  const mapRef = useRef();
  const center = { lat: 40.7128, lng: -74.006 };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyB6Vh09wGRkLwpvl8um58ojC1KsJlg08V8",
    libraries,
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const calculateRoute = useCallback(() => {
    if (!sourceRef.current || !destinationRef.current) {
      alert("Please enter both source and destination");
      return;
    }

    const sourcePlace = sourceRef.current.getPlace();
    const destinationPlace = destinationRef.current.getPlace();

    if (
      !sourcePlace ||
      !destinationPlace ||
      !sourcePlace.formatted_address ||
      !destinationPlace.formatted_address
    ) {
      alert("Please select valid locations from the suggestions");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: sourcePlace.formatted_address,
        destination: destinationPlace.formatted_address,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          const distanceInKm = result.routes[0].legs[0].distance.value / 1000;
          setDistance(result.routes[0].legs[0].distance.text);
          setDuration(result.routes[0].legs[0].duration.text);

          const rates = {};
          taxis.forEach((taxi) => {
            
            if (distanceInKm <= DISTANCE_THRESHOLD) {
              fare = taxi.baseFare;
            } else {
              fare =
                taxi.baseFare + (distanceInKm - DISTANCE_THRESHOLD) * taxi.rate;
            }
            rates[taxi.id] = fare.toFixed(2);
          });
          setCabRates(rates);
        } else {
          console.error(`Error fetching directions: ${result}`);
        }
      }
    );
  }, []);

  const handleBook = useCallback(() => {
    if (selectedTaxi && source && destination) {
      axios
      .post('http://localhost:5000/api/users/book-trip',{
        source,
        destination,
        fare,
        taxiname,
      })
      .then((res)=>console.log(res))
      .catch((err)=>console.log(err))
      alert(
        `Booking confirmed!\nFrom: ${source}\nTo: ${destination}\nTaxi: ${selectedTaxi.name}\nDistance: ${distance}\nETA: ${duration}`
      );
    } else {
      alert("Please select source, destination, and a taxi before booking.");
    }
  }, [selectedTaxi, source, destination, distance, duration]);

  const handleSourceSelect = () => {
    const place = sourceRef.current.getPlace();
    setSource(place?.formatted_address || "");
  };

  const handleDestinationSelect = () => {
    const place = destinationRef.current.getPlace();
    setDestination(place?.formatted_address || "");
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg py-4 px-6 fixed w-full z-10 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="text-black text-2xl font-bold ">
                CABIFY
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link
                to="/trip-history"
                className="text-black font-semibold text-lg hover:text-gray-300 transition-colors duration-300 relative group"
              >
                History
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
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

      <div className="flex flex-col md:flex-row flex-grow pt-16">
        <div className="w-full md:w-1/3 p-4 bg-white shadow-md">
          <div className="mb-4">
            <label
              htmlFor="source"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Source
            </label>
            <Autocomplete
              onLoad={(autocomplete) => (sourceRef.current = autocomplete)}
              onPlaceChanged={handleSourceSelect}
            >
              <input
                type="text"
                ref={sourceRef}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter pickup location"
              />
            </Autocomplete>
          </div>
          <div className="mb-4">
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Destination
            </label>
            <Autocomplete
              onLoad={(autocomplete) => (destinationRef.current = autocomplete)}
              onPlaceChanged={handleDestinationSelect}
            >
              <input
                type="text"
                ref={destinationRef}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter drop-off location"
              />
            </Autocomplete>
          </div>
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md mb-4"
            onClick={calculateRoute}
          >
            Calculate Route
          </button>
          {distance && duration && (
            <div className="mb-4 p-4 bg-green-100 rounded-lg shadow">
              <p className="text-green-800 font-semibold">
                Distance: {distance}
              </p>
              <p className="text-green-800 font-semibold">
                Duration: {duration}
              </p>
            </div>
          )}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Available Taxis
            </h3>
            <div className="space-y-2">
              {taxis.map((taxi) => (
                <div
                  key={taxi.id}
                  className={`p-4 border rounded-lg cursor-pointer transition duration-300 ${
                    selectedTaxi?.id === taxi.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-300"
                  }`}
                  onClick={() => {
                    setSelectedTaxi(taxi);
                    //taxiname=selectedTaxi.name;
                    //console.log(selectedTaxi.name);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={taxi.image}
                        alt={taxi.name}
                        className={`w-16 h-16 mr-4 object-cover ${taxi.zoom}`}
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {taxi.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Rate: ₹{taxi.rate}/km
                        </p>
                      </div>
                    </div>
                    {distance && cabRates[taxi.id] && (
                      <p className="font-semibold text-gray-800">
                        Fare: ₹{cabRates[taxi.id]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Book Now
          </button>
        </div>
        <div className="w-full md:w-2/3 h-[calc(100vh-4rem)]">
          <MapComponent directions={directions} />
        </div>
      </div>
    </div>
  );
}
