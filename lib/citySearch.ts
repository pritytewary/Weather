export interface City {
  id: string;
  name: string;
  countryName: string;
  countryCode: string;
  timezone: string;
  long: number;
  lat: number;
}

export interface SearchResult {
  cities: City[];
  hasMore: boolean;
}

const PAGE_LIMIT = 100;

export async function fetchCitiesData({
  page,
  searchQuery,
  signal,
}: {
  page: number;
  searchQuery: string;
  signal: AbortSignal;
}): Promise<SearchResult> {
  try {
    const offset = (page - 1) * PAGE_LIMIT;

    const searchParams = new URLSearchParams({
      limit: PAGE_LIMIT.toString(),
      offset: offset.toString(),
    });
    if (searchQuery) {
      searchParams.append("where", `search(name, "${searchQuery}")`);
    }

    const response = await fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?${searchParams.toString()}`,
      {
        signal: signal,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    const hasMore = data.results.length >= PAGE_LIMIT;

    const cities = data.results.map((c: any) => {
      return {
        id: c.geoname_id,
        name: c.name,
        countryName: c.cou_name_en,
        countryCode: c.country_code,
        timezone: c.timezone,
        long: c.coordinates.lon,
        lat: c.coordinates.lat,
      };
    });

    return {
      cities: cities,
      hasMore: hasMore,
    };
  } catch (error) {
    console.log(`Error while searching`, error);
    return {
      cities: [],
      hasMore: false,
    };
  }
}
