import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Globe, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CountryMap from "@/components/country-map"
import FavoriteButton from "@/components/favorite-button"
import { getCountryByCode, getBorderCountries } from "@/lib/api"

export async function generateMetadata({ params }) {
  const country = await getCountryByCode(params.code)

  if (!country) {
    return {
      title: "Country Not Found",
    }
  }

  return {
    title: `${country.name.common} | Atlas Scope`,
    description: `Learn about ${country.name.common}, its capital, population, languages and more.`,
  }
}

export default async function CountryPage({ params }) {
  const country = await getCountryByCode(params.code)

  if (!country) {
    notFound()
  }

  const borderCountries = await getBorderCountries(country.borders || [])

  return (
    <div className="container py-8 px-6 md:px-0 max-w-[1300px] mx-auto">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to All Countries
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            <Image
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{country.name.common}</h1>
            <FavoriteButton countryCode={params.code} countryName={country.name.common} />
          </div>

          <p className="text-lg text-muted-foreground">{country.name.official}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h2 className="font-semibold">Capital</h2>
              <p>{country.capital?.join(", ") || "N/A"}</p>
            </div>

            <div>
              <h2 className="font-semibold">Region</h2>
              <p>
                {country.region}
                {country.subregion ? `, ${country.subregion}` : ""}
              </p>
            </div>

            <div>
              <h2 className="font-semibold">Population</h2>
              <p>{country.population.toLocaleString()}</p>
            </div>

            <div>
              <h2 className="font-semibold">Area</h2>
              <p>{country.area.toLocaleString()} km²</p>
            </div>

            <div>
              <h2 className="font-semibold">Languages</h2>
              <p>{country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
            </div>

            <div>
              <h2 className="font-semibold">Currencies</h2>
              <p>
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((currency) => `${currency.name} (${currency.symbol})`)
                      .join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div>
              <h2 className="font-semibold mb-2">Border Countries</h2>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((border) => (
                  <Link key={border.cca3} href={`/country/${border.cca3}`}>
                    <Badge variant="secondary" className="cursor-pointer">
                      {border.name.common}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Map</h2>
        <div className="h-[500px] rounded-lg border overflow-hidden">
          <Suspense
            fallback={
              <div className="h-full flex items-center justify-center bg-muted">
                <p>Loading map...</p>
              </div>
            }
          >
            <CountryMap country={country} />
          </Suspense>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            General Information
          </h2>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Top Level Domain:</span> {country.tld?.join(", ") || "N/A"}
            </li>
            <li>
              <span className="font-medium">Driving Side:</span> {country.car?.side === "left" ? "Left" : "Right"}
            </li>
            <li>
              <span className="font-medium">Time Zones:</span> {country.timezones?.join(", ") || "N/A"}
            </li>
            <li>
              <span className="font-medium">Start of Week:</span>{" "}
              {country.startOfWeek ? country.startOfWeek.charAt(0).toUpperCase() + country.startOfWeek.slice(1) : "N/A"}
            </li>
            <li>
              <span className="font-medium">UN Member:</span> {country.unMember ? "Yes" : "No"}
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Details
          </h2>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Latitude/Longitude:</span> {country.latlng?.join(", ") || "N/A"}
            </li>
            <li>
              <span className="font-medium">Landlocked:</span> {country.landlocked ? "Yes" : "No"}
            </li>
            <li>
              <span className="font-medium">Continent:</span> {country.continents?.join(", ") || "N/A"}
            </li>
            <li>
              <span className="font-medium">Maps:</span>{" "}
              <a
                href={country.maps?.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Maps
              </a>
              {" | "}
              <a
                href={country.maps?.openStreetMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                OpenStreetMap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
