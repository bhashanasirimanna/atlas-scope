import Link from "next/link"
import Image from "next/image"
import { MapPin, Users } from "lucide-react"
import FavoriteButton from "@/components/favorite-button"

export default function CountryCard({ country }) {
  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden transition-all hover:shadow-md">
      <Link href={`/country/${country.cca3}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <Link href={`/country/${country.cca3}`} className="block">
            <h2 className="text-xl font-semibold line-clamp-1">{country.name.common}</h2>
          </Link>
          <FavoriteButton countryCode={country.cca3} countryName={country.name.common} size="sm" />
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {country.region}
          {country.subregion ? `, ${country.subregion}` : ""}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{country.capital?.join(", ") || "N/A"}</span>
          </div>

          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{country.population.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
