import HomePage from "./components";
import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Find the weather in your city`,
  description: "Search for a city and find out the weather in real-time",
};

export default function App() {
  return <HomePage />;
}
