"use client";

import Section from "@/components/layout/section";
import { WeatherData } from "@/lib/weatherSearch";
import { ResponsiveLine } from "@nivo/line";
import { useMemo, useState } from "react";
import {
  Temperature,
  TemperatureSwitcher,
  WeatherIcon,
  WindDirection,
} from "./utils";
import dayjs from "dayjs";
import WeatherChart from "./chart";
import WeatherForcast from "./forcast";

export default function Weather({ data }: { data: WeatherData }) {
  const [tempUnit, setTempUnit] = useState<"celsius" | "fahrenheit">("celsius");

  const currentWeather = useMemo(() => data.list[0], [data]);

  return (
    <Section className="py-[5vh] space-y-8">
      <div>
        <h1 className="text-4xl font-semibold">
          Weather in {data.city.name}, {data.city.country}
        </h1>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-5">
        <div className="flex items-center space-x-4 flex-wrap">
          <WeatherIcon
            name={currentWeather.weather[0]?.icon}
            className="h-16 w-16"
          />

          <Temperature
            temp={currentWeather.main.temp}
            unit={tempUnit}
            className="text-5xl"
          />

          <TemperatureSwitcher setTempUnit={setTempUnit} tempUnit={tempUnit} />

          <div className="text-gray-600">
            <p>Precipitation: {currentWeather.rain?.["3h"]}%</p>
            <p>Humidity: {currentWeather.main.humidity}%</p>
            <div className="flex items-center gap-4">
              <p>Wind: {currentWeather.wind.speed} km/h</p>
              <WindDirection deg={currentWeather.wind.deg} />
            </div>
          </div>
        </div>

        <div className="lg:text-right">
          <p className="text-primary font-semibold text-3xl capitalize">
            {currentWeather.weather[0]?.description}
          </p>

          <div className="text-gray-500 text-base">
            {dayjs(currentWeather.dt_txt).format("dddd, MMMM D, YYYY")}
          </div>
        </div>
      </div>

      <WeatherChart data={data} tempUnit={tempUnit} />

      <WeatherForcast data={data} tempUnit={tempUnit} />
    </Section>
  );
}
