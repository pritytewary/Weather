import { cn } from "@/lib/utils";
import { ArrowRightIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import { BiWind } from "react-icons/bi";

export function WeatherIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${name}@2x.png`}
      alt={name}
      className={className}
    />
  );
}

export function kelvinToUnit(temp: number, unit: "celsius" | "fahrenheit") {
  if (unit === "celsius") {
    return Math.round(temp - 273.15);
  }

  return Math.round((temp - 273.15) * (9 / 5) + 32);
}

export function Temperature({
  temp,
  unit,
  className = "",
}: {
  temp: number;
  unit: "celsius" | "fahrenheit";
  className?: string;
}) {
  // current temp is kelvin, convert to celsius or fahrenheit

  const converted = useMemo(() => kelvinToUnit(temp, unit), [temp, unit]);

  return (
    <p className={cn("text-xl font-semibold", className)}>
      {converted.toFixed(0)}°{unit === "celsius" ? "C" : "F"}
    </p>
  );
}

export function TemperatureSwitcher({
  tempUnit,
  setTempUnit,
}: {
  tempUnit: "celsius" | "fahrenheit";
  setTempUnit: React.Dispatch<React.SetStateAction<"celsius" | "fahrenheit">>;
}) {
  return (
    <div className="flex flex-col">
      {[
        {
          name: "°C",
          key: "celsius",
        },
        {
          name: "°F",
          key: "fahrenheit",
        },
      ].map((unit, index) => {
        const isSelected = tempUnit === unit.key;

        return (
          <button
            key={index}
            onClick={() => setTempUnit(unit.key as any)}
            className={cn("font-medium text-2xl text-muted-foreground", {
              "text-primary font-bold": isSelected,
            })}
          >
            {unit.name}
          </button>
        );
      })}
    </div>
  );
}

export function WindDirection({ deg }: { deg: number }) {
  // rotate the arrow to the correct direction
  return (
    <ArrowRightIcon
      className="transform w-6 h-6 text-primary"
      style={{
        transform: `rotate(${deg}deg)`,
      }}
    />
  );
}
