// Base URL for the REST Countries API
const API_BASE_URL = "https://restcountries.com/v3.1";

const cache = new Map();

// Get all countries
export async function getAllCountries() {
  const cacheKey = "all-countries";

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/all`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    return [];
  }
}

// Get country by code (alpha code)
export async function getCountryByCode(code) {
  try {
    const response = await fetch(`${API_BASE_URL}/alpha/${code}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch country with code ${code}`);
    }

    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error(`Error fetching country with code ${code}:`, error);
    return null;
  }
}

// Get countries by region
export async function getCountriesByRegion(region) {
  const cacheKey = `region-${region.toLowerCase()}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/region/${region}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch countries in region ${region}`);
    }

    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching countries in region ${region}:`, error);
    return [];
  }
}

// Search countries by name
export async function searchCountriesByName(name) {
  const cacheKey = `search-${name.toLowerCase()}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/name/${name}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      // If not found, return empty array instead of throwing
      if (response.status === 404) {
        return [];
      }
      throw new Error(`Failed to search countries with name ${name}`);
    }

    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error searching countries with name ${name}:`, error);
    return [];
  }
}

// Get all unique regions
export async function getAllRegions() {
  try {
    const countries = await getAllCountries();
    const regions = new Set(
      countries.map((country) => country.region).filter(Boolean)
    );
    return Array.from(regions).sort();
  } catch (error) {
    console.error("Error fetching regions:", error);
    return [];
  }
}

export async function getAllLanguages() {
  try {
    const countries = await getAllCountries();
    const languages = new Set();

    countries.forEach((country) => {
      if (country.languages) {
        Object.values(country.languages).forEach((language) => {
          languages.add(language);
        });
      }
    });

    return Array.from(languages).sort();
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
}

// Get border countries
export async function getBorderCountries(borderCodes) {
  if (!borderCodes.length) return [];

  try {
    const borderCountries = await Promise.all(
      borderCodes.map((code) => getCountryByCode(code))
    );

    return borderCountries.filter(Boolean);
  } catch (error) {
    console.error("Error fetching border countries:", error);
    return [];
  }
}

// In a real app, these functions would interact with your backend
// For this demo, we'll use localStorage to simulate a backend

// Check if a country is in favorites
export async function isFavorite(userId, countryCode) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100));

  const favorites = JSON.parse(
    localStorage.getItem(`favorites-${userId}`) || "[]"
  );
  return favorites.some((fav) => fav.code === countryCode);
}

// Toggle favorite status
export async function toggleFavorite(userId, countryCode, countryName) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300));

  const favorites = JSON.parse(
    localStorage.getItem(`favorites-${userId}`) || "[]"
  );
  const existingIndex = favorites.findIndex((fav) => fav.code === countryCode);

  if (existingIndex >= 0) {
    // Remove from favorites
    favorites.splice(existingIndex, 1);
    localStorage.setItem(`favorites-${userId}`, JSON.stringify(favorites));
    return { isFavorited: false };
  } else {
    // Add to favorites
    favorites.push({
      code: countryCode,
      name: countryName,
      addedAt: new Date().toISOString(),
    });
    localStorage.setItem(`favorites-${userId}`, JSON.stringify(favorites));
    return { isFavorited: true };
  }
}

// Get favorite countries
export async function getFavoriteCountries(userId) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  const favorites = JSON.parse(
    localStorage.getItem(`favorites-${userId}`) || "[]"
  );

  if (!favorites.length) return [];

  const favoriteCountries = await Promise.all(
    favorites.map((fav) => getCountryByCode(fav.code))
  );

  return favoriteCountries.filter(Boolean);
}


export async function getCountriesByLanguage(language) {
  try {
    const countries = await getAllCountries();
    return countries.filter((country) => {
      if (!country.languages) return false;
      return Object.values(country.languages).includes(language);
    });
  } catch (error) {
    console.error(Error`fetching countries with language ${language}:`, error);
    return [];
  }
}
