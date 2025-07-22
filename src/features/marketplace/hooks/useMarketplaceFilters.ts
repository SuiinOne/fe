import { useState, useCallback } from 'react';
import { MarketplaceFilters } from '../api/types';

export function useMarketplaceFilters() {
  const [filters, setFilters] = useState<MarketplaceFilters>({
    sort_by: 'created_at',
    status: 'active',
  });

  const updateFilters = useCallback((newFilters: Partial<MarketplaceFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      sort_by: 'created_at',
      status: 'active',
    });
  }, []);

  const setSearch = useCallback((search: string) => {
    updateFilters({ search: search || undefined });
  }, [updateFilters]);

  const setPriceRange = useCallback((min_price?: string, max_price?: string) => {
    updateFilters({ min_price, max_price });
  }, [updateFilters]);

  const setTypeFilter = useCallback((type_name?: string) => {
    updateFilters({ type_name });
  }, [updateFilters]);

  const setSortBy = useCallback((sort_by: MarketplaceFilters['sort_by']) => {
    updateFilters({ sort_by });
  }, [updateFilters]);

  return {
    filters,
    updateFilters,
    resetFilters,
    setSearch,
    setPriceRange,
    setTypeFilter,
    setSortBy,
  };
}