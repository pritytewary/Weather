import { Button } from "@/components/ui/button";
import { City } from "@/lib/citySearch";
import millify from "millify";
import Link from "next/link";
import { HiStar } from "react-icons/hi2";

export default function Favourites({
  favouriteCities,
  toggleFavourite,
}: {
  favouriteCities: City[];
  toggleFavourite: (city: City) => void;
}) {
  if (favouriteCities.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-4">
      {favouriteCities.map((city) => (
        <Link
          key={city.id}
          className="rounded-lg p-3 w-full bg-muted"
          href={`/weather/${city.lat}/${city.long}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="items-center flex justify-between">
            <h2 className="text-xl font-medium line-clamp-1">{city.name}</h2>

            <Button
              size={"smIcon"}
              variant={"ghost"}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                toggleFavourite(city);
              }}
            >
              <HiStar className="w-5 h-5 text-primary" />
            </Button>
          </div>

          <p className="font-light text-xs line-clamp-1">
            {city.countryName} - {city.timezone} - {millify(city.population)}
          </p>
        </Link>
      ))}
    </div>
  );
}
