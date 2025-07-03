export interface Listing {
    id: string;
    owner: string;
    type_name: string | null;
    price: string | null; // BIGINT는 보통 string으로 다룸
    metadata: any | null;
    listed_at: string | null;
  }
  
  export interface ListingHistory {
    txHash: string;
    buyer: string;
    price: number;
    date: string;
  }
  
  export interface ListingStats {
    likes: number;
    sales: number;
  }
  
  export interface Like {
    id: number;
    user_address: string;
    listing_id: string;
    liked_at: string;
  }
  
  export interface SalesHistory {
    id: number;
    item_id: string;
    type_name: string;
    seller: string;
    buyer: string;
    price: string;
    tx_digest: string | null;
    sold_at: string;
  }
  
  export interface AcceptedType {
    id: number;
    type_name: string;
    module_address: string;
    metadata_url: string | null;
    active: boolean;
  }
  