import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Weather from "@/components/Weather";
import getWeather from "@/services/getWeather";
import "@testing-library/jest-dom";

// Mock the getWeather function
jest.mock("@/services/getWeather", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};
Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  configurable: true,
});

describe("Weather Component", () => {
  // Set up mock implementation for geolocation before each test
  beforeEach(() => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success({
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      })
    );
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test to check if the Weather app title is rendered
  it("renders the Weather app title", () => {
    render(<Weather />);
    expect(screen.getByText(/Weather App/i)).toBeInTheDocument();
  });

  // Test to check if the user can enter a city name
  it("allows user to enter a city name", () => {
    render(<Weather />);
    const input = screen.getByPlaceholderText(/Enter city name/i);
    fireEvent.change(input, { target: { value: "London" } });
    expect(input).toHaveValue("London");
  });

  // Test to check if weather data is fetched and displayed for a city
  it("fetches and displays weather data for a city", async () => {
    const mockGetWeather = getWeather as jest.MockedFunction<typeof getWeather>;
    mockGetWeather.mockResolvedValueOnce({
      error: false,
      data: {
        city: "London",
        description: "sunny",
        temperature: "25",
        humidity: "40",
        maxTemperature: "30",
        minTemperature: "20",
        windSpeed: "10",
      },
    });

    render(<Weather />);
    const cityInput = screen.getByPlaceholderText(/Enter city name/i);
    fireEvent.change(cityInput, { target: { value: "London" } });

    const getWeatherButton = screen.getByText(/Get Weather/i);
    fireEvent.click(getWeatherButton);

    await waitFor(() => {
      expect(mockGetWeather).toHaveBeenCalledWith("London", "", "");
    });

    expect(await screen.findByText(/London/i)).toBeInTheDocument();
    expect(screen.getByText(/sunny/i)).toBeInTheDocument();
    expect(screen.getByText(/25°C/i)).toBeInTheDocument();
  });

  // Test to check if an error message is displayed when the API call fails
  it("displays an error message if the API call fails", async () => {
    const mockGetWeather = getWeather as jest.MockedFunction<typeof getWeather>;
    mockGetWeather.mockResolvedValueOnce({
      error: true,
      message: "City not found",
    });

    render(<Weather />);
    const cityInput = screen.getByPlaceholderText(/Enter city name/i);
    fireEvent.change(cityInput, { target: { value: "InvalidCity" } });

    const getWeatherButton = screen.getByText(/Get Weather/i);
    fireEvent.click(getWeatherButton);

    await waitFor(() => {
      expect(mockGetWeather).toHaveBeenCalledWith("InvalidCity", "", "");
    });

    expect(await screen.findByText(/Error: City not found/i)).toBeInTheDocument();
  });

  // Test to check if current location is used when 'Use Current Location' is clicked
  it("uses current location when 'Use Current Location' is clicked", async () => {
    render(<Weather />);
    const currentLocationButton = screen.getByText(/Use Current Location/i);

    fireEvent.click(currentLocationButton);

    await waitFor(() => {
      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    });

    const latitudeInput = screen.getByPlaceholderText(/Enter latitude/i);
    const longitudeInput = screen.getByPlaceholderText(/Enter longitude/i);

    expect(latitudeInput).toHaveValue("51.5074");
    expect(longitudeInput).toHaveValue("-0.1278");
  });
});