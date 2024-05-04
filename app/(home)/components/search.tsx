"use client";

import InfiniteScroll from "@/components/infinite-scroll";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchCitiesData, City, Sort } from "@/lib/citySearch";
import { useDebounce } from "@uidotdev/usehooks";
import millify from "millify";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { HiStar, HiOutlineStar } from "react-icons/hi2";
import Favourites from "./favourites";

const FAVOURITE_LOCAL_STORAGE_KEY = "favouriteCities";

export default function Search({ input }: { input: string }) {
  const searchQuery = useDebounce(input, 500);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<Sort>({
    name: "asc",
    country_code: "asc",
    timezone: "asc",
    population: "asc",
  });

  const [cities, setCities] = useState<City[]>([]);
  const [favouriteCities, setFavouriteCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const withFavourite = useMemo(() => {
    return cities.map((city) => ({
      ...city,
      isFavourite: favouriteCities.some(
        (favouriteCity) => favouriteCity.id === city.id
      ),
    }));
  }, [cities, favouriteCities]);

  const fetchCities = async (page: number) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    setIsLoading(true);

    abortRef.current = new AbortController();

    const data = await fetchCitiesData({
      page: page,
      searchQuery: searchQuery,
      signal: abortRef.current.signal,
      sort: sort,
    });

    setPage(page);
    setHasMore(data.hasMore);
    setCities((currentData) => [...currentData, ...data.cities]);
    setIsLoading(false);
  };

  const toggleFavourite = (city: City) => {
    const isAlreadyFavourite = favouriteCities.some(
      (favouriteCity) => favouriteCity.id === city.id
    );

    const cities = isAlreadyFavourite
      ? favouriteCities.filter((favouriteCity) => favouriteCity.id !== city.id)
      : [...favouriteCities, city];

    setFavouriteCities(cities);
    localStorage.setItem(FAVOURITE_LOCAL_STORAGE_KEY, JSON.stringify(cities));
  };

  useEffect(() => {
    fetchCities(1);

    return () => {
      setCities([]);
    };
  }, [searchQuery, sort]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cities = JSON.parse(
      localStorage.getItem(FAVOURITE_LOCAL_STORAGE_KEY) || "[]"
    );
    setFavouriteCities(cities);
  }, []);

  return (
    <>
      <Favourites
        favouriteCities={favouriteCities}
        toggleFavourite={toggleFavourite}
      />

      <InfiniteScroll
        hasMore={hasMore}
        loadMore={async () => {
          if (isLoading) return;

          fetchCities(page + 1);
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                sortingEnabled={true}
                sortDirection={sort.name}
                onSort={(direction) => {
                  setSort((currentSort) => ({
                    ...currentSort,
                    name: direction,
                  }));
                }}
              >
                City Name
              </TableHead>
              <TableHead
                sortingEnabled={true}
                sortDirection={sort.country_code}
                onSort={(direction) => {
                  setSort((currentSort) => ({
                    ...currentSort,
                    country_code: direction,
                  }));
                }}
              >
                Country
              </TableHead>
              <TableHead
                sortingEnabled={true}
                sortDirection={sort.timezone}
                onSort={(direction) => {
                  setSort((currentSort) => ({
                    ...currentSort,
                    timezone: direction,
                  }));
                }}
              >
                Timezone
              </TableHead>
              <TableHead
                sortingEnabled={true}
                sortDirection={sort.population}
                onSort={(direction) => {
                  setSort((currentSort) => ({
                    ...currentSort,
                    population: direction,
                  }));
                }}
              >
                Population
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withFavourite.map((city) => (
              <TableRow key={city.id}>
                <TableCell className="font-medium">{city.name}</TableCell>
                <TableCell>{city.countryName}</TableCell>

                <TableCell>{city.timezone}</TableCell>

                <TableCell>{millify(city.population)}</TableCell>

                <TableCell className="justify-start md:justify-end flex gap-2">
                  <Button
                    size={"sm"}
                    variant={"ghost"}
                    onClick={() => {
                      toggleFavourite(city);
                    }}
                  >
                    {city.isFavourite ? (
                      <HiStar className="w-5 h-5 text-primary" />
                    ) : (
                      <HiOutlineStar className="w-5 h-5 text-gray-400" />
                    )}
                  </Button>

                  <Link
                    className={buttonVariants()}
                    href={`/weather/${city.lat}/${city.long}`}
                  >
                    Weather
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>

      {isLoading && (
        <div className="flex justify-center items-center my-4">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </>
  );
}
