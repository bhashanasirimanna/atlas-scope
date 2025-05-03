"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function CountryMap({ country }) {
  const [geoJson, setGeoJson] = useState(null)
  const [isClient, setIsClient] = useState(false)

  // Fix for Leaflet marker icons in Next.js
  useEffect(() => {
    setIsClient(true)

    // Fix Leaflet default icon issue
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })

    // Fetch country boundaries
    async function fetchGeoJson() {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${country.cca3}?fields=name,borders`)
        const data = await response.json()

        // For demo purposes, we'll use a simplified approach
        // In a real app, you would fetch actual GeoJSON data for the country
        const res = await fetch(
          `https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson`,
        )
        const geoData = await res.json()

        const countryGeoJson = geoData.features.find((feature) => feature.properties.ISO_A3 === country.cca3)

        if (countryGeoJson) {
          setGeoJson(countryGeoJson)
        }
      } catch (error) {
        console.error("Failed to fetch GeoJSON:", error)
      }
    }

    fetchGeoJson()
  }, [country.cca3])

  if (!isClient) {
    return <div className="h-full flex items-center justify-center bg-muted">Loading map...</div>
  }

  // Default position if country coordinates are not available
  const position = country.latlng ? [country.latlng[0], country.latlng[1]] : [0, 0]

  // Capital position
  const capitalPosition = country.capitalInfo?.latlng
    ? [country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]]
    : position

  // Custom icon for capital
  const capitalIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  // Style for the country polygon
  const countryStyle = {
    fillColor: "#4f46e5",
    weight: 2,
    opacity: 1,
    color: "#6366f1",
    fillOpacity: 0.3,
  }

  return (
    <MapContainer center={position} zoom={4} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geoJson && <GeoJSON data={geoJson} style={countryStyle} />}

      {country.capital && country.capital.length > 0 && (
        <Marker position={capitalPosition} icon={capitalIcon}>
          <Popup>
            <div className="text-center">
              <strong>{country.capital[0]}</strong>
              <p>Capital of {country.name.common}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
