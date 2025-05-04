"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { toggleFavorite, isFavorite } from "@/lib/api";

export default function FavoriteButton({
  countryCode,
  countryName,
  size = "icon",
}) {
  const { toast } = useToast();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if country is favorited on component mount
  useEffect(() => {
    let isMounted = true;

    async function checkFavorite() {
      if (isAuthenticated && user) {
        const result = await isFavorite(user.id, countryCode);
        if (isMounted) setIsFavorited(result);
      }
    }

    checkFavorite();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user, countryCode]);

  async function handleToggleFavorite() {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to save favorites",
        variant: "destructive",
      });
      router.push("/auth/login");
      return;
    }

    setIsLoading(true);

    try {
      const result = await toggleFavorite(user.id, countryCode, countryName);
      setIsFavorited(result.isFavorited);

      toast({
        title: result.isFavorited
          ? "Added to favorites"
          : "Removed from favorites",
        description: result.isFavorited
          ? `${countryName} has been added to your favorites`
          : `${countryName} has been removed from your favorites`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size={size}
      className={`${
        isFavorited
          ? "text-red-500 hover:text-red-600"
          : "text-muted-foreground hover:text-foreground"
      }`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleFavorite();
      }}
      disabled={isLoading}
    >
      <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
      <span className="sr-only">
        {isFavorited ? "Remove from favorites" : "Add to favorites"}
      </span>
    </Button>
  );
}
