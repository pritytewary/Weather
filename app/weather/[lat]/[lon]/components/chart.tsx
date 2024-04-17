import { Button } from "@/components/ui/button";
import { WeatherData } from "@/lib/weatherSearch";
import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { kelvinToUnit } from "./utils";
import dayjs from "dayjs";

const options = [
  {
    label: "Temperature",
    key: "temp",
  },
  {
    label: "Precipitation",
    key: "rain",
  },
  {
    label: "Wind",
    key: "wind",
  },
];

export default function WeatherChart({
  data,
  tempUnit,
}: {
  data: WeatherData;
  tempUnit: "celsius" | "fahrenheit";
}) {
  const [selected, setSelected] = useState(options[0].key);
  const first8Weather = useMemo(() => data.list.slice(0, 8), [data]);

  const renderable = useMemo(() => {
    return first8Weather.map((item) => {
      return {
        date: dayjs(item.dt_txt).format("ddd h:mm A"),
        temp: kelvinToUnit(item.main.temp, tempUnit),
        rain: item.rain?.["3h"] ?? 0,
        wind: item.wind.speed,
      };
    });
  }, [first8Weather, tempUnit]);

  return (
    <div className="space-y-8">
      <div className="flex gap-4 items-center">
        {options.map((option) => (
          <Button
            key={option.key}
            onClick={() => setSelected(option.key)}
            variant={selected === option.key ? "default" : "secondary"}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div>
        {selected === "temp" && (
          <Chart
            data={renderable.map((item) => ({
              x: item.date,
              y: item.temp,
            }))}
            formattedY={`°${tempUnit === "celsius" ? "C" : "F"}`}
          />
        )}

        {selected === "rain" && (
          <Chart
            data={renderable.map((item) => ({
              x: item.date,
              y: item.rain,
            }))}
            formattedY="%"
          />
        )}

        {selected === "wind" && (
          <Chart
            data={renderable.map((item) => ({
              x: item.date,
              y: item.wind,
            }))}
            formattedY="km/h"
          />
        )}
      </div>
    </div>
  );
}

function Chart({
  data,
  formattedY,
}: {
  data: {
    x: string;
    y: number;
  }[];
  formattedY: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ffe0cb" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey="x" />

        <Area type="monotone" dataKey="y" stroke="#f97316" fill="url(#color)">
          <LabelList
            dataKey="y"
            position="top"
            formatter={(value: any) => `${value} ${formattedY}`}
          />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );
}
