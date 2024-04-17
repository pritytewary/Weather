"use client";

import InfiniteScroll from "@/components/infinite-scroll";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchCitiesData, City } from "@/lib/citySearch";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Search({ input }: { input: string }) {
  const searchQuery = useDebounce(input, 500);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

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
    });

    setPage(page);
    setHasMore(data.hasMore);
    setCities((currentData) => [...currentData, ...data.cities]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCities(1);

    return () => {
      setCities([]);
    };
  }, [searchQuery]);

  return (
    <>
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
              <TableHead>City Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Timezone</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.map((city) => (
              <TableRow key={city.id}>
                <TableCell className="font-medium">{city.name}</TableCell>
                <TableCell>{city.countryName}</TableCell>

                <TableCell>{city.timezone}</TableCell>

                <TableCell className="justify-start md:justify-end flex">
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
