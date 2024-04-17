import { withAppErrorHandling } from "@/lib/error";
import { fetchWeatherData } from "@/lib/weatherSearch";

async function getWeatherMain({ lat, lon }: { lat: string; lon: string }) {
  const weather = await fetchWeatherData({
    lat: lat,
    lon: lon,
  });

  return weather;
}

const getWeather = withAppErrorHandling(getWeatherMain);
export default getWeather;
