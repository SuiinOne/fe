import { useApiQuery, useApiMutation } from '../../../shared/hooks/useApi';
import { 
  getListings, 
  getListing, 
  getListingStats, 
  getListingHistory,
  likeListing,
  unlikeListing,
  buyListing 
} from '../api/marketplaceApi';
import { MarketplaceFilters } from '../api/types';

export function useListings(filters?: MarketplaceFilters) {
  return useApiQuery({
    queryKey: ['listings', JSON.stringify(filters)],
    queryFn: () => getListings(filters),
  });
}

export function useListingDetail(id: string) {
  return useApiQuery({
    queryKey: ['listing', id],
    queryFn: () => getListing(id),
    enabled: !!id,
  });
}

export function useListingStats(id: string) {
  return useApiQuery({
    queryKey: ['listing-stats', id],
    queryFn: () => getListingStats(id),
    enabled: !!id,
  });
}

export function useListingHistory(id: string) {
  return useApiQuery({
    queryKey: ['listing-history', id],
    queryFn: () => getListingHistory(id),
    enabled: !!id,
  });
}

export function useLikeListing() {
  return useApiMutation({
    mutationFn: ({ listingId, userAddress }: { listingId: string; userAddress: string }) =>
      likeListing(listingId, userAddress),
    invalidateQueries: [['listings'], ['listing-stats']],
  });
}

export function useUnlikeListing() {
  return useApiMutation({
    mutationFn: ({ listingId, userAddress }: { listingId: string; userAddress: string }) =>
      unlikeListing(listingId, userAddress),
    invalidateQueries: [['listings'], ['listing-stats']],
  });
}

export function useBuyListing() {
  return useApiMutation({
    mutationFn: ({ 
      listingId, 
      buyerAddress, 
      txHash 
    }: { 
      listingId: string; 
      buyerAddress: string; 
      txHash: string; 
    }) => buyListing(listingId, buyerAddress, txHash),
    invalidateQueries: [['listings'], ['listing'], ['user-nfts']],
  });
}