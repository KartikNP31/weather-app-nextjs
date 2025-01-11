import React from "react";
import {
  FaTemperatureHigh,
  FaTemperatureLow,
  FaWind,
  FaTint,
} from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import {
  WiDaySunny,
  WiCloudy,
  WiRainWind,
  WiCloudyGusts,
} from "react-icons/wi";

// Define the props interface for the WeatherCard component
interface WeatherProps {
  weather: {
    city: string;
    description: string;
    humidity: string;
    temperature: string;
    maxTemperature: string;
    minTemperature: string;
    windSpeed: string;
  };
}

// WeatherCard component to display weather information
const WeatherCard: React.FC<WeatherProps> = ({ weather }) => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-blue-400 to-indigo-900 rounded-lg shadow-lg text-white">
      <div className="text-center mb-6 mx-5 flex items-center justify-around gap-5">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <MdLocationCity className="text-3xl" /> {/* City icon */}
          <h2 className="text-2xl font-semibold">{weather.city}</h2>{" "}
          {/* City name */}
        </div>
        <div className="flex justify-between gap-4">
          <div>
            {/* Display appropriate weather icon based on description */}
            {weather.description.toLowerCase().includes("sun") ? (
              <WiDaySunny className="text-5xl mx-auto" />
            ) : weather.description.toLowerCase().includes("cloud") ? (
              <WiCloudy className="text-5xl mx-auto" />
            ) : weather.description.toLowerCase().includes("rain") ? (
              <WiRainWind className="text-5xl mx-auto" />
            ) : (
              <WiCloudyGusts className="text-5xl mx-auto" />
            )}
            <p className="capitalize mt-2 text-lg">{weather.description}</p>{" "}
            {/* Weather description */}
          </div>
          <div>
            <div className="mt-4 text-center">
              <p className="text-3xl font-bold">
                {Math.round(Number(weather.temperature))}°C{" "}
                {/* Current temperature */}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around gap-4">
        <div className="flex justify-around">
          <div className="flex space-x-2">
            <FaTemperatureHigh className="text-xl" />{" "}
            {/* High temperature icon */}
            <p>
              <span className="font-bold">High:</span>{" "}
              {Math.round(Number(weather.maxTemperature))}°C{" "}
              {/* Max temperature */}
            </p>
          </div>
          <div className="flex space-x-2">
            <FaTemperatureLow className="text-xl" />{" "}
            {/* Low temperature icon */}
            <p>
              <span className="font-bold">Low:</span>{" "}
              {Math.round(Number(weather.minTemperature))}°C{" "}
              {/* Min temperature */}
            </p>
          </div>
        </div>
        <div className="flex justify-around">
          <div className="flex space-x-2">
            <FaTint className="text-xl" /> {/* Humidity icon */}
            <p>
              <span className="font-bold">Humidity:</span> {weather.humidity}%{" "}
              {/* Humidity */}
            </p>
          </div>
          <div className="flex space-x-2">
            <FaWind className="text-xl" /> {/* Wind speed icon */}
            <p>
              <span className="font-bold">Wind:</span> {weather.windSpeed} km/h{" "}
              {/* Wind speed */}
            </p>
          </div>
        </div>
      </div>
      <p className="text-center mt-5 text-sm">{new Date().toLocaleString()}</p>{" "}
      {/* Current date and time */}
    </div>
  );
};

export default WeatherCard;
