// import apiClient from '../../../shared/api/client';
// import { API_ENDPOINTS } from '../../../shared/api/endpoints';
import { Listing } from '../../marketplace/api/types';
import { dummyListings } from '../../../utils/dummy';

// Get user's owned NFTs (mock)
export const getUserNFTs = async (userAddress: string): Promise<Listing[]> => {
  // TODO: Replace with real API call
  // const response = await apiClient.get<ApiResponse<Listing[]>>(
  //   API_ENDPOINTS.USER_NFTS,
  //   { params: { address: userAddress } }
  // );
  // return response.data.data;
  
  // Mock: return some demo NFTs for any connected wallet
  const userNFTs = dummyListings.filter(listing => listing.owner === "0x123456789abcdef");
  
  // Update owner address to match the current user for demo purposes
  const userOwnedNFTs = userNFTs.map(nft => ({
    ...nft,
    owner: userAddress
  }));
  
  return Promise.resolve(userOwnedNFTs);
};

// List NFT for sale
export const createListing = async (data: {
  nftId: string;
  price: string;
  userAddress: string;
}): Promise<void> => {
  // TODO: Replace with real API call
  // await apiClient.post(API_ENDPOINTS.LIST_NFT, data);
  
  console.log('Creating listing:', data);
  return Promise.resolve();
};

// Cancel NFT listing
export const cancelNFTListing = async (data: {
  listingId: string;
  userAddress: string;
}): Promise<void> => {
  // TODO: Replace with real API call
  // await apiClient.post(API_ENDPOINTS.CANCEL_LISTING, data);
  
  console.log('Canceling listing:', data);
  return Promise.resolve();
};

// Transfer NFT
export const transferNFT = async (data: {
  nftId: string;
  fromAddress: string;
  toAddress: string;
  txHash: string;
}): Promise<void> => {
  // TODO: Replace with real API call and blockchain transaction
  
  console.log('Transferring NFT:', data);
  return Promise.resolve();
};