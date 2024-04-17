import { WeatherData } from "@/lib/weatherSearch";
import { useMemo } from "react";
import { Temperature, WeatherIcon } from "./utils";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

export default function WeatherForcast({
  data,
  tempUnit,
}: {
  data: WeatherData;
  tempUnit: "celsius" | "fahrenheit";
}) {
  const renderable = useMemo(() => {
    // group by date
    const grouped = data.list.reduce((acc, item) => {
      const date = dayjs(item.dt_txt).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {} as Record<string, WeatherData["list"]>);

    // get min and max temp for each day
    const result = Object.entries(grouped).map(([date, items]) => {
      const minTemp = Math.min(...items.map((item) => item.main.temp));
      const maxTemp = Math.max(...items.map((item) => item.main.temp));

      return {
        date,
        minTemp: minTemp,
        maxTemp: maxTemp,
        weather: items[0].weather[0],
      };
    });

    return result;
  }, [data, tempUnit]);

  return (
    <div
      className={cn("grid gap-4 grid-cols-2 md:grid-cols-4", {
        "lg:grid-cols-5": renderable.length === 5,
        "lg:grid-cols-6": renderable.length === 6,
        "lg:grid-cols-7": renderable.length === 7,
        "lg:grid-cols-8": renderable.length === 8,
      })}
    >
      {renderable.map((item) => (
        <div
          key={item.date}
          className="flex flex-col items-center border shadow-sm rounded-xl p-2"
        >
          <p className="text-xl font-medium text-muted-foreground">
            {dayjs(item.date).format("ddd")}
          </p>

          <WeatherIcon name={item.weather?.icon} className="h-24 w-24 -my-3" />

          <p className="font-semibold mb-0.5 text-lg">{item.weather.main}</p>

          <div className="flex gap-2 items-center">
            <Temperature
              temp={item.maxTemp}
              unit={tempUnit}
              className="font-medium text-xs"
            />
            -
            <Temperature
              temp={item.minTemp}
              unit={tempUnit}
              className="font-medium text-muted-foreground text-xs"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
