import { Suspense } from "react";
import {
  getAllCountries,
  getCountriesByRegion,
  searchCountriesByName,
  getCountriesByLanguage,
} from "@/lib/api";
import CountryCard from "@/components/country-card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function CountriesGrid({ searchParams }) {
  // const countries = await getAllCountries()
  let countries = [];

  // Get all countries first
  countries = await getAllCountries();

  // Apply region filter if present
  if (searchParams?.region && searchParams.region !== "all") {
    const regionCountries = await getCountriesByRegion(searchParams.region);
    const regionCountryCodes = new Set(regionCountries.map(country => country.cca3));
    countries = countries.filter(country => regionCountryCodes.has(country.cca3));
  }

  // Apply language filter if present
  if (searchParams?.language && searchParams.language !== "all") {
    const languageCountries = await getCountriesByLanguage(searchParams.language);
    const languageCountryCodes = new Set(languageCountries.map(country => country.cca3));
    countries = countries.filter(country => languageCountryCodes.has(country.cca3));
  }

  // Apply search filter if present
  if (searchParams?.search) {
    const searchResults = await searchCountriesByName(searchParams.search);
    const searchResultCodes = new Set(searchResults.map(country => country.cca3));
    countries = countries.filter(country => searchResultCodes.has(country.cca3));
}
  // if (searchParams?.search) {
  //   countries = await searchCountriesByName(searchParams.search);
  // } else if (searchParams?.region && searchParams.region !== "all") {
  //   countries = await getCountriesByRegion(searchParams.region);
  // } else {
  //   countries = await getAllCountries();
  // }

  if (countries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No countries found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div
      id="countries"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 px-6 md:px-0 lg:grid-cols-4 mt-8"
    >
      {countries.map((country) => (
        <Suspense key={country.cca3} fallback={<CountryCardSkeleton />}>
          <CountryCard country={country} />
        </Suspense>
      ))}
    </div>
  );
}

function CountryCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <Skeleton className="h-48 w-full rounded-t-lg" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
