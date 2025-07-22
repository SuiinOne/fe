export const API_ENDPOINTS = {
  // Marketplace
  LISTINGS: '/listings',
  LISTING_DETAIL: (id: string) => `/listings/${id}`,
  LISTING_LIKE: (id: string) => `/listings/${id}/like`,
  LISTING_STATS: (id: string) => `/listings/${id}/stats`,
  LISTING_HISTORY: (id: string) => `/listings/${id}/history`,
  
  // User NFTs
  USER_NFTS: '/user/nfts',
  LIST_NFT: '/listings/create',
  CANCEL_LISTING: '/listings/cancel',
  BUY_NFT: '/listings/buy',
  
  // Item Registration
  ACCEPTED_TYPES: '/accepted-types',
  REGISTER_TYPE: '/accepted-types/register',
  
  // Favorites
  FAVORITES: '/user/favorites',
  ADD_FAVORITE: '/user/favorites/add',
  REMOVE_FAVORITE: '/user/favorites/remove',
  
  // Wallet
  WALLET_CONNECT: '/auth/wallet-connect',
  TRANSACTION_HISTORY: '/user/transactions',
} as const;