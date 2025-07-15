import api from "./axios";
import {
  Listing,
  Like,
  SalesHistory,
  AcceptedType,
} from "../types/Listing";
import {
    dummyListings,
    dummyAcceptedTypes,
    dummyLikes,
    dummySalesHistory,
  } from "../utils/dummy";

export const getListings = (): Promise<Listing[]> => {
    return Promise.resolve(dummyListings);
  };

// ✅ real API
// export const getListings = () => api.get<Listing[]>("/listings");
  
export const getAcceptedTypes = (): Promise<AcceptedType[]> => {
    return Promise.resolve(dummyAcceptedTypes);
};

// ✅ real API
// export const getAcceptedTypes = () => api.get<AcceptedType[]>("/accepted-types");

export const getListing = (id: string): Promise<Listing | undefined> => {
    const listing = dummyListings.find((item) => item.id === id);
    return Promise.resolve(listing);
};
    
// ✅ real API
// export const getListing = (id: string) => api.get<Listing>(`/listings/${id}`);

export const registerListing = (data: Partial<Listing>) =>
  api.post("/listing/register", data);

export const buyListing = (
  listingId: string,
  buyerAddress: string,
  txHash: string
) =>
  api.post("/listing/buy", {
    listingId,
    buyerAddress,
    txHash,
  });

export const addAcceptedType = (data: Partial<AcceptedType>) =>
  api.post("/accepted-types", data);

export const likeListing = (id: string, userAddress: string) =>
  api.post(`/listing/${id}/like`, { userAddress });

export const unlikeListing = (id: string, userAddress: string) =>
  api.delete(`/listing/${id}/like`, {
    data: { userAddress },
  });

export const getListingLikes = (id: string) =>
  api.get<Like[]>(`/listing/${id}/likes`);

export const getListingHistory = (id: string) =>
  api.get<SalesHistory[]>(`/listing/${id}/history`);

export const getListingStats = (id: string) =>
  api.get<{ likes: number; sales: number }>(`/listing/${id}/stats`);

// NFT 등록 요청 (mock)
export async function listNFT(listingData: any) {
  // 실제로는 서버에 POST 요청
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, txHash: '0xLIST123', ...listingData });
    }, 800);
  });
}

// NFT 등록 취소 요청 (mock)
export async function cancelListing(cancelData: any) {
  // 실제로는 서버에 POST 요청
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, txHash: '0xCANCEL123', ...cancelData });
    }, 800);
  });
}
