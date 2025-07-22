// import apiClient from '../../../shared/api/client';
// import { API_ENDPOINTS } from '../../../shared/api/endpoints';
// import { ApiResponse, PaginatedResponse } from '../../../shared/types';
import { Listing, ListingStats, SalesHistory, AcceptedType, MarketplaceFilters } from './types';

// Temporary dummy data import
import {
  dummyListings,
  dummyAcceptedTypes,
  dummySalesHistory,
} from '../../../utils/dummy';

// Get marketplace listings with filters
export const getListings = async (filters?: MarketplaceFilters): Promise<Listing[]> => {
  // TODO: Replace with real API call
  // const response = await apiClient.get<ApiResponse<Listing[]>>(API_ENDPOINTS.LISTINGS, {
  //   params: filters
  // });
  // return response.data.data;
  
  // Temporary dummy data with filtering
  let filtered = [...dummyListings];
  
  if (filters?.search) {
    filtered = filtered.filter(item => 
      item.metadata?.name?.toLowerCase().includes(filters.search!.toLowerCase())
    );
  }
  
  if (filters?.type_name) {
    filtered = filtered.filter(item => item.type_name === filters.type_name);
  }
  
  if (filters?.min_price) {
    filtered = filtered.filter(item => 
      item.price && parseFloat(item.price) >= parseFloat(filters.min_price!)
    );
  }
  
  if (filters?.max_price) {
    filtered = filtered.filter(item => 
      item.price && parseFloat(item.price) <= parseFloat(filters.max_price!)
    );
  }
  
  return Promise.resolve(filtered);
};

// Get single listing details
export const getListing = async (id: string): Promise<Listing | undefined> => {
  // TODO: Replace with real API call
  // const response = await apiClient.get<ApiResponse<Listing>>(API_ENDPOINTS.LISTING_DETAIL(id));
  // return response.data.data;
  
  const listing = dummyListings.find((item) => item.id === id);
  return Promise.resolve(listing);
};

// Get listing statistics
export const getListingStats = async (_id: string): Promise<ListingStats> => {
  // TODO: Replace with real API call
  // const response = await apiClient.get<ApiResponse<ListingStats>>(API_ENDPOINTS.LISTING_STATS(id));
  // return response.data.data;
  
  return Promise.resolve({
    likes: Math.floor(Math.random() * 100),
    sales: Math.floor(Math.random() * 20),
    views: Math.floor(Math.random() * 1000),
  });
};

// Get listing sales history
export const getListingHistory = async (id: string): Promise<SalesHistory[]> => {
  // TODO: Replace with real API call
  // const response = await apiClient.get<ApiResponse<SalesHistory[]>>(API_ENDPOINTS.LISTING_HISTORY(id));
  // return response.data.data;
  
  return Promise.resolve(dummySalesHistory.filter(sale => sale.item_id === id));
};

// Like a listing
export const likeListing = async (listingId: string, userAddress: string): Promise<void> => {
  // TODO: Replace with real API call
  // await apiClient.post(API_ENDPOINTS.LISTING_LIKE(listingId), { userAddress });
  
  console.log(`Liked listing ${listingId} by ${userAddress}`);
  return Promise.resolve();
};

// Unlike a listing
export const unlikeListing = async (listingId: string, userAddress: string): Promise<void> => {
  // TODO: Replace with real API call
  // await apiClient.delete(API_ENDPOINTS.LISTING_LIKE(listingId), {
  //   data: { userAddress }
  // });
  
  console.log(`Unliked listing ${listingId} by ${userAddress}`);
  return Promise.resolve();
};

// Buy a listing
export const buyListing = async (
  listingId: string,
  buyerAddress: string,
  txHash: string
): Promise<void> => {
  // TODO: Replace with real API call
  // await apiClient.post(API_ENDPOINTS.BUY_NFT, {
  //   listingId,
  //   buyerAddress,
  //   txHash,
  // });
  
  console.log(`Bought listing ${listingId} by ${buyerAddress}, tx: ${txHash}`);
  return Promise.resolve();
};

// Get accepted types
export const getAcceptedTypes = async (): Promise<AcceptedType[]> => {
  // TODO: Replace with real API call
  // const response = await apiClient.get<ApiResponse<AcceptedType[]>>(API_ENDPOINTS.ACCEPTED_TYPES);
  // return response.data.data;
  
  return Promise.resolve(dummyAcceptedTypes);
};