import { render, screen } from "@/lib/test-utils"
import CountryCard from "@/components/country-card"

// Mock country data
const mockCountry = {
  name: {
    common: "Test Country",
    official: "Republic of Test",
    nativeName: {},
  },
  cca3: "TST",
  capital: ["Test City"],
  region: "Test Region",
  subregion: "Test Subregion",
  population: 1000000,
  flags: {
    svg: "/placeholder.svg",
    png: "/placeholder.svg",
    alt: "Flag of Test Country",
  },
  // Add other required properties
  tld: [],
  cca2: "",
  ccn3: "",
  cioc: "",
  independent: true,
  status: "",
  unMember: true,
  currencies: {},
  idd: { root: "", suffixes: [] },
  altSpellings: [],
  languages: {},
  latlng: [0, 0],
  landlocked: false,
  borders: [],
  area: 0,
  demonyms: {},
  flag: "",
  maps: { googleMaps: "", openStreetMaps: "" },
  gini: {},
  fifa: "",
  car: { signs: [], side: "" },
  timezones: [],
  continents: [],
  coatOfArms: { png: "", svg: "" },
  startOfWeek: "",
  capitalInfo: { latlng: [0, 0] },
}

describe("CountryCard", () => {
  it("renders country information correctly", () => {
    render(<CountryCard country={mockCountry} />)

    // Check if country name is displayed
    expect(screen.getByText("Test Country")).toBeInTheDocument()

    // Check if region is displayed
    expect(screen.getByText("Test Region, Test Subregion")).toBeInTheDocument()

    // Check if capital is displayed
    expect(screen.getByText("Test City")).toBeInTheDocument()

    // Check if population is displayed
    expect(screen.getByText("1,000,000")).toBeInTheDocument()
  })

  it("renders a link to the country detail page", () => {
    render(<CountryCard country={mockCountry} />)

    const links = screen.getAllByRole("link")
    expect(links.some((link) => link.getAttribute("href") === "/country/TST")).toBe(true)
  })
})
