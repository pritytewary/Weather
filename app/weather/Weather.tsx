import React from "react";
import { WiCloudyWindy } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaCompressAlt } from "react-icons/fa";
import Image from "next/image";

interface Weather {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

interface WeatherProps {
  data: Weather;
}

const Weather: React.FC<WeatherProps> = ({}) => {
  const timelyWeather = [
    { time: "12:00 AM", temperature: "20°C", description: "Sunny" },
    { time: "01:00 AM", temperature: "18°C", description: "Rainy" },
    { time: "02:00 AM", temperature: "22°C", description: "Cloudy" },
    { time: "03:00 AM", temperature: "19°C", description: "Partly Cloudy" },
  ];

  const forecastData = [
    {
      day: "Monday",
      highTemp: 22,
      lowTemp: 15,
      description: "Partly cloudy",
      precipitation: 20,
      img: "/weather1.svg",
    },
    {
      day: "Tuesday",
      highTemp: 20,
      lowTemp: 14,
      description: "Sunny",
      precipitation: 10,
      img: "/weather1.svg",
    },
    {
      day: "Wednesday",
      highTemp: 25,
      lowTemp: 18,
      description: "Rainy",
      precipitation: 70,
      img: "/weather1.svg",
    },
    {
      day: "Thursday",
      highTemp: 23,
      lowTemp: 16,
      description: "Cloudy",
      precipitation: 30,
      img: "/weather1.svg",
    },
    {
      day: "Friday",
      highTemp: 21,
      lowTemp: 13,
      description: "Partly cloudy",
      precipitation: 20,
      img: "/weather1.svg",
    },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row bg-white mx-10 my-10 rounded-xl shadow-xl">
      <div className="text-black flex flex-col items-center mx-10">
        <div className="items-center mt-20 mb-10 mx-10 max-w-2xl flex flex-col w-full">
          <h1 className="text-5xl mb-5">Durgapur</h1>
          <Image src={"/sunrise-.jpg"} alt="" height={150} width={150} />
        </div>
        <div className="flex flex-col items-center gap-10">
          <p className="text-5xl">12°C</p>
          <div className="flex gap-5">
            <p>Mostly Cloudy</p>
            <p>Rainy</p>
          </div>
          <p className="text-4xl">Today</p>
          <div className="rounded-xl flex gap-4 bg-yellow-50 shadow-xl items-center mx-5 overflow-x-auto lg:overflow-x-visible">
            {timelyWeather.map((hourly) => (
              <div
                key={hourly.time}
                className="flex items-center p-4 flex-col gap-2"
              >
                <div className="flex flex-col items-center">
                  <p className="text-black">{hourly.time}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Image src={"/weather.svg"} alt="" height={20} width={20} />
                  <p className="text-black">{hourly.temperature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-20 lg:ml-20">
        <div className="flex flex-col items-center mb-5">
          <h1 className="text-4xl mt-20 mb-5 text-center font-semibold">
            Today&apos;s Highlight
          </h1>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col items-center bg-zinc-50 shadow-xl rounded-xl gap-5 py-2 w-full lg:w-[200px] h-[150px]">
              <p className="mt-5 text-lg text-gray-400">Temperature</p>
              <p className="flex gap-2 items-center justify-between px-2 text-2xl">
                <FaTemperatureHigh size={30} /> 34°C
              </p>
            </div>
            <div className="flex flex-col items-center bg-zinc-50 shadow-xl rounded-xl gap-5 py-2 w-full lg:w-[200px] h-[150px]">
              <p className="mt-5 text-lg text-gray-400">Wind Speed</p>
              <p className="flex gap-2 items-center justify-between px-2 text-2xl">
                <WiCloudyWindy size={30} />
                90 <span className="text-lg">km/h</span>
              </p>
            </div>
            <div className="flex flex-col items-center bg-zinc-50 shadow-xl rounded-xl gap-5 py-2 w-full lg:w-[200px] h-[150px]">
              <p className="mt-5 text-lg text-gray-400">Humidity</p>
              <p className="flex gap-2 items-center justify-between px-2 text-2xl">
                <WiHumidity size={50} className="text-yellow-300" />
                63 <span className="text-lg">%</span>
              </p>
            </div>
            <div className="flex flex-col items-center bg-zinc-50  backdrop-brightness-200 shadow-xl rounded-xl gap-5 py-2 w-full lg:w-[200px] h-[150px]">
              <p className="text-gray-400 mt-5 text-lg">Atmospheric Pressure</p>
              <p className="flex gap-2 items-center justify-between px-2 text-2xl">
                <FaCompressAlt size={30} /> 54{" "}
                <span className="text-lg">hPa</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-5">
          <h2 className="text-4xl font-semibold mb-6">Weekly Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {forecastData.map(
              (
                { day, highTemp, lowTemp, description, precipitation, img },
                index
              ) => (
                <div
                  key={index}
                  className="bg-zinc-50  p-4 shadow-xl rounded-xl"
                >
                  <h3 className="text-xl font-semibold mb-2">{day}</h3>
                  <div className="flex justify-between mb-2 ">
                    <div className="flex flex-col">
                      <p className="text-gray-600">High</p>
                      <p className="text-lg font-semibold">{highTemp}°C</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-600">Low</p>
                      <p className="text-lg font-semibold">{lowTemp}°C</p>
                    </div>
                  </div>
                  <div className="mx-14 my-3">
                    <Image src={img} alt="" width={40} height={40} />
                  </div>
                  <p className="text-gray-600 mb-2">{description}</p>
                  <p className="text-gray-600">
                    Precipitation: {precipitation}%
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
