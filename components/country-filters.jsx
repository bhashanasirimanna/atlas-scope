"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getAllRegions, getAllLanguages } from "@/lib/api";
import { useDebounce } from "@/hooks/use-debounce";

export default function CountryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedRegion, setSelectedRegion] = useState(
    searchParams.get("region") || "all"
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    searchParams.get("language") || "all"
  );
  const [regions, setRegions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    async function fetchFilters() {
      const [regionsList, languagesList] = await Promise.all([
        getAllRegions(),
        getAllLanguages()
      ]);
      setRegions(regionsList);
      setLanguages(languagesList);
    }

    fetchFilters();
  }, []);

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      
      if (debouncedSearchTerm) {
        params.set("search", debouncedSearchTerm);
      } else {
        params.delete("search");
      }
      
      if (selectedRegion && selectedRegion !== "all") {
        params.set("region", selectedRegion);
      } else {
        params.delete("region");
      }
      
      if (selectedLanguage && selectedLanguage !== "all") {
        params.set("language", selectedLanguage);
      } else {
        params.delete("language");
      }
      
      router.replace(`/?${params.toString()}`, { scroll: false });
    });
  }, [debouncedSearchTerm, selectedRegion, selectedLanguage, searchParams, router]);

  function handleSearch(term) {
    setSearchTerm(term);
  }

  function handleRegionChange(region) {
    setSelectedRegion(region);
  }

  function handleLanguageChange(language) {
    setSelectedLanguage(language);
  }

  function handleReset() {
    setSearchTerm("");
    setSelectedRegion("all");
    setSelectedLanguage("all");

    startTransition(() => {
      router.replace("/", { scroll: false });
    });
  }

  return (
    <div className="space-y-4 px-6 md:px-0">
      <h2 className="text-2xl font-bold">Explore Countries</h2>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search countries..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={selectedRegion} onValueChange={handleRegionChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(searchTerm || selectedRegion !== "all" || selectedLanguage !== "all") && (
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          )}
        </div>
      </div>

      {isPending && (
        <div className="h-1 w-full overflow-hidden bg-muted rounded-full">
          <div className="h-full w-1/3 animate-pulse bg-primary rounded-full"></div>
        </div>
      )}
    </div>
  );
}