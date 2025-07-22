// import apiClient from '../../../shared/api/client';
// import { API_ENDPOINTS } from '../../../shared/api/endpoints';
import { Listing } from '../../marketplace/api/types';
import { dummyListings, dummyLikes } from '../../../utils/dummy';

// Get user's favorite NFTs (mock)
export const getUserFavorites = async (_userAddress: string): Promise<Listing[]> => {
  // TODO: Replace with real API call
  // const response = await apiClient.get<ApiResponse<Listing[]>>(
  //   API_ENDPOINTS.FAVORITES,
  //   { params: { address: userAddress } }
  // );
  // return response.data.data;
  
  // Mock: return some favorite NFTs for any connected wallet
  // 데모용으로 현재 사용자에게 몇 개의 좋아요 NFT 반환
  const likedListingIds = ["0xabc123", "0xdef456"]; // 하드코딩된 좋아요 NFT ID
  
  const favoriteListings = dummyListings.filter(listing => 
    likedListingIds.includes(listing.id)
  );
  
  return Promise.resolve(favoriteListings);
};

// Add NFT to favorites
export const addToFavorites = async (data: {
  listingId: string;
  userAddress: string;
}): Promise<void> => {
  // TODO: Replace with real API call
  // await apiClient.post(API_ENDPOINTS.ADD_FAVORITE, data);
  
  console.log('Adding to favorites:', data);
  return Promise.resolve();
};

// Remove NFT from favorites
export const removeFromFavorites = async (data: {
  listingId: string;
  userAddress: string;
}): Promise<void> => {
  // TODO: Replace with real API call
  // await apiClient.delete(API_ENDPOINTS.REMOVE_FAVORITE, { data });
  
  console.log('Removing from favorites:', data);
  return Promise.resolve();
};

// Check if NFT is favorited by user
export const isFavorited = async (
  listingId: string, 
  userAddress: string
): Promise<boolean> => {
  // TODO: Replace with real API call
  
  // Mock check
  const userLikes = dummyLikes.filter(like => 
    like.user_address === userAddress && like.listing_id === listingId
  );
  
  return Promise.resolve(userLikes.length > 0);
};