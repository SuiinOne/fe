import { BaseEntity } from '../../../shared/types';

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface Listing extends BaseEntity {
  owner: string;
  type_name: string | null;
  price: string | null; // BIGINT는 보통 string으로 다룸
  metadata: NFTMetadata | null;
  listed_at: string | null;
  status: 'active' | 'sold' | 'cancelled';
}

export interface ListingStats {
  likes: number;
  sales: number;
  views: number;
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

export interface MarketplaceFilters {
  search?: string;
  type_name?: string;
  min_price?: string;
  max_price?: string;
  sort_by?: 'price_asc' | 'price_desc' | 'created_at' | 'likes';
  status?: 'active' | 'sold' | 'all';
}