# Flowork AI - Weather App assignment
> - Deploed Weather App Link : [https://weather-app-nextjs-mauve.vercel.app/](https://weather-app-nextjs-mauve.vercel.app/)

## Installation and Run Application
Please follow the below steps to run the application.

- **Prerequisite**

1. ***Node.js***  
   - Version: `>=16.x` (or as specified in the project's `package.json` under `engines`)

2. ***npm*** (comes with Node.js) 
   - npm: `>=8.x`  


- **Insatalltion & Setup**:
  - Clone the repository [] 
  - Create .env file in root directory of the Project and add your OpenWeatherApiKey
>-  ``` NEXT_PUBLIC_WEATHER_API_KEY=Your_Open_Weather_Api_Key ```
  - Open `weather-app-nextjs` directory in terminal and run following command.
> - ```cd weather-app-nextjs```
  - Run the Following commands in terminal to install packages
> - ``` npm install ```


## Getting Started
  - First, run the development server:
> - ```npm run dev``` Open [http://localhost:3000](http://localhost:3000) with your browser to see Weather App


  - For Frontend Unit Testing, run the following command
> - ```cd weather-app-nextjs```
> - ``` npm run test```



### About Weather App

- **Purpose**: A real-time weather application that allows users to retrieve current weather conditions for any city in the world.  
- **Technology Stack**: Built with Next.js for the frontend and Node.js/Express for the backend, ensuring a seamless and responsive user experience.  
- **Key Features**:  
  - User-friendly interface to input city names, latitude and longitude and view weather details.  
  - Displays essential weather data: temperature, humidity, wind speed, and a brief weather description.  
  - Real-time weather data fetched from the OpenWeatherMap API.  
- **Error Handling**:  
  - Provides meaningful error messages for invalid city names or issues retrieving data.  
  - Ensures smooth functionality even during API or network errors.  
- **Testing**: Comprehensive unit testing of frontend components using Jest to ensure reliability and maintainability.  
