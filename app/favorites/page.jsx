"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import CountryCard from "@/components/country-card"
import { useAuth } from "@/hooks/use-auth"
import { getFavoriteCountries } from "@/lib/api"

export default function FavoritesPage() {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    async function loadFavorites() {
      if (isAuthenticated && user) {
        setIsLoading(true)
        try {
          const favorites = await getFavoriteCountries(user.id)
          setCountries(favorites)
        } catch (error) {
          console.error("Failed to load favorites:", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [isAuthenticated, user])

  if (!isAuthenticated) {
    return (
      <div className="container  px-6 md:px-0 py-12 text-center max-w-[1300px] mx-auto min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md mx-auto space-y-4">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-bold">Your Favorites</h1>
          <p className="text-muted-foreground">Please log in to view and manage your favorite countries.</p>
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className=" min-h-[80vh] py-12 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-2 text-muted-foreground">Loading your favorites...</p>
      </div>
    )
  }

  return (
    <div className="py-8  px-6 md:px-0 max-w-[1300px] mx-auto min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6">Your Favorite Countries</h1>

      {countries.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
          <h2 className="text-xl font-medium">No favorites yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Explore countries and click the heart icon to add them to your favorites.
          </p>
          <Button asChild>
            <Link href="/">Explore Countries</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  )
}
