import { useApiQuery, useApiMutation } from '../../../shared/hooks/useApi';
import { 
  getUserFavorites, 
  addToFavorites, 
  removeFromFavorites,
  isFavorited 
} from '../api/favoritesApi';

export function useFavorites(userAddress?: string) {
  return useApiQuery({
    queryKey: ['favorites', userAddress || ''],
    queryFn: () => userAddress ? getUserFavorites(userAddress) : Promise.resolve([]),
    enabled: !!userAddress,
  });
}

export function useAddToFavorites() {
  return useApiMutation({
    mutationFn: addToFavorites,
    invalidateQueries: [['favorites'], ['listing-stats']],
  });
}

export function useRemoveFromFavorites() {
  return useApiMutation({
    mutationFn: removeFromFavorites,
    invalidateQueries: [['favorites'], ['listing-stats']],
  });
}

export function useIsFavorited(listingId: string, userAddress?: string) {
  return useApiQuery({
    queryKey: ['is-favorited', listingId, userAddress || ''],
    queryFn: () => userAddress ? isFavorited(listingId, userAddress) : Promise.resolve(false),
    enabled: !!userAddress && !!listingId,
  });
}