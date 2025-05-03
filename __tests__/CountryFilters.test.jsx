import { render, screen, fireEvent } from "@/lib/test-utils"
import { useRouter, useSearchParams } from "next/navigation"
import CountryFilters from "@/components/country-filters"

// Mock Next.js navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe("CountryFilters", () => {
  beforeEach(() => {
    // Setup mocks
    const mockRouter = {
      push: jest.fn(),
    }

    const mockSearchParams = {
      get: jest.fn(),
      toString: jest.fn().mockReturnValue(""),
    }
    useRouter.mockReturnValue(mockRouter)
    useSearchParams.mockReturnValue(mockSearchParams)
  })

  it("renders search input and region filter", () => {
    render(<CountryFilters />)

    // Check if search input exists
    expect(screen.getByPlaceholderText("Search countries...")).toBeInTheDocument()

    // Check if region filter exists
    expect(screen.getByText("Filter by region")).toBeInTheDocument()
  })

  it("updates search term when typing in search input", () => {
    render(<CountryFilters />)

    const searchInput = screen.getByPlaceholderText("Search countries...")
    fireEvent.change(searchInput, { target: { value: "test" } })

    expect(searchInput).toHaveValue("test")
  })

  it("shows reset button when filters are applied", () => {
    // Mock search params with existing filters
    useSearchParams.mockReturnValue({
      get: jest.fn().mockImplementation((key) => {
        if (key === "search") return "test"
        return null
      }),
      toString: jest.fn().mockReturnValue("search=test"),
    })

    render(<CountryFilters />)

    // Check if reset button is visible
    expect(screen.getByText("Reset")).toBeInTheDocument()
  })
})
