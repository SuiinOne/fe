import { useApiQuery, useApiMutation } from '../../../shared/hooks/useApi';
import { getUserNFTs, createListing, cancelNFTListing, transferNFT } from '../api/userNftsApi';

export function useUserNFTs(userAddress?: string) {
  return useApiQuery({
    queryKey: ['user-nfts', userAddress || ''],
    queryFn: () => userAddress ? getUserNFTs(userAddress) : Promise.resolve([]),
    enabled: !!userAddress,
  });
}

export function useCreateListing() {
  return useApiMutation({
    mutationFn: createListing,
    invalidateQueries: [['user-nfts'], ['listings']],
  });
}

export function useCancelListing() {
  return useApiMutation({
    mutationFn: cancelNFTListing,
    invalidateQueries: [['user-nfts'], ['listings']],
  });
}

export function useTransferNFT() {
  return useApiMutation({
    mutationFn: transferNFT,
    invalidateQueries: [['user-nfts']],
  });
}