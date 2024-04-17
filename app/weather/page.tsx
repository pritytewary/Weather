import React from "react";
import Weather from "./Weather";

const HomePage: React.FC = () => {
  const mockWeatherData = {
    temperature: 25,
    description: "Sunny",
    humidity: 54,
    windSpeed: 90,
    pressure: 40,
  };

  return (
    <div className="flex  w-full  h-screen ">
      <Weather data={mockWeatherData} />
    </div>
  );
};

export default HomePage;
