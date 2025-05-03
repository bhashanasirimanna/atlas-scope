import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <div className="space-y-6 max-w-md">
        <MapPin className="h-24 w-24 mx-auto text-muted-foreground" />
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-muted-foreground">
          The country you're looking for might have changed its borders or doesn't exist in our database.
        </p>
        <Button asChild>
          <Link href="/">Return to World Map</Link>
        </Button>
      </div>
    </div>
  )
}
