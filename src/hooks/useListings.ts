// src/hooks/useListings.ts
import { useQuery } from "@tanstack/react-query";
import { getListings } from "../api/listingApi";
import { Listing } from "../types/Listing";

export function useListings() {
    return useQuery<Listing[]>({
      queryKey: ["listings"],
      queryFn: () => getListings(),
    });
  }