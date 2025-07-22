// Global shared types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface User {
  address: string;
  nickname?: string;
  avatar?: string;
  joinedAt: string;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}