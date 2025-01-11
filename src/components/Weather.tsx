
import getWeather from "@/services/getWeather";
import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";


const Weather: React.FC = () => {

  // State variables to store city, latitude, longitude, weather data, and error message
  const [city, setCity] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");



  // Function to fetch weather data based on city, latitude, and longitude
  const handleGetWeather = async () => {
    setError("");
    setWeather(null);
    try {
      const response = await getWeather(city, latitude, longitude);
      if (response.error) {
        setError(response.message);
        return;
      } else {
        setWeather(response.data);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Function to get the device's current location
  const getDeviceLocation = () => {
    setCity("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude.toString());
          setLatitude(position.coords.latitude.toString());
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Handlers to update state variables based on city input
  const handleSetCity = (e : React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setLatitude("");
    setLongitude("");
  }

  // Handlers to update state variables based on latitude and longitude input
  const handleSetLatitude = (e : React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(e.target.value);
    setCity("");
  }
  const handleSetLongitude = (e : React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.value);
    setCity("");
  }

  
  // Get device location on component mount
  useEffect(() => {
    getDeviceLocation();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">Weather App</h1>

      <div className="top-0 bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">City Name</label>
          <input
            type="text"
            placeholder="Enter city name"
            value={city} // Bind city state to input value
            onChange={handleSetCity} // Update city state on input change
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Latitude</label>
            <input
              type="text"
              placeholder="Enter latitude"
              value={latitude} // Bind latitude state to input value
              onChange={handleSetLatitude} // Update latitude state on input change
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Longitude</label>
            <input
              type="text"
              placeholder="Enter longitude"
              value={longitude} // Bind longitude state to input value
              onChange={handleSetLongitude} // Update longitude state on input change
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleGetWeather} // Fetch weather data on button click
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Get Weather
          </button>
          <button
            onClick={getDeviceLocation} // Get device location on button click
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Use Current Location
          </button>
        </div>
      </div>


      {/* // Display error message if any */}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>} 

      {/* // Display weather data if available */}
      {weather && (
        <div className="mt-6">
          <WeatherCard weather={weather} /> 
        </div>
      )}
    </div>
  );
};

export default Weather;
