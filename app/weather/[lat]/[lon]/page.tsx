import Weather from "./components";
import getWeather from "./getWeather";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Weather in your city`,
  description: "Search for a city and find out the weather in real-time",
};
export const revalidate = 3600;

export default async function WeatherPage({
  params: { lat, lon },
}: {
  params: { lat: string; lon: string };
}) {
  const [data, error] = await getWeather({ lat, lon });

  if (error) {
    return (
      <div>
        <p>Failed to load weather data</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return <Weather data={data} />;
}
