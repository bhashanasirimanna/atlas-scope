import { Suspense } from "react";
import Hero from "@/components/hero";
import CountriesGrid from "@/components/countries-grid";
import CountryFilters from "@/components/country-filters";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home({searchParams}) {
  return (
    <div className="flex flex-col">
      <Hero />
      <section className="container py-8 md:py-12 max-w-[1300px] mx-auto">
        <CountryFilters />
        <Suspense fallback={<CountriesGridSkeleton />}>
          <CountriesGrid searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}

function CountriesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="rounded-lg border bg-card shadow-sm">
            <Skeleton className="h-48 w-full rounded-t-lg" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
    </div>
  );
}
