import { render } from "@testing-library/react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"

const AllProviders = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }
