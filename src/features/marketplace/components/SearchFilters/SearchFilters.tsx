import React from "react";
import { Flex, TextField, Select, Button, Text } from "@radix-ui/themes";
import { Search, X } from "lucide-react";
import { MarketplaceFilters } from "../../api/types";
import { useMarketplaceFilters } from "../../hooks/useMarketplaceFilters";
import { useApiQuery } from "../../../../shared/hooks/useApi";
import { getAcceptedTypes } from "../../api/marketplaceApi";

interface SearchFiltersProps {
  onFiltersChange: (filters: MarketplaceFilters) => void;
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const { 
    filters, 
    setSearch, 
    setPriceRange, 
    setTypeFilter, 
    setSortBy, 
    resetFilters 
  } = useMarketplaceFilters();

  const { data: acceptedTypes } = useApiQuery({
    queryKey: ['accepted-types'],
    queryFn: getAcceptedTypes,
  });

  // Trigger filter changes
  React.useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  return (
    <Flex direction="column" gap="4" style={{ padding: "1rem" }}>
      {/* Search Bar */}
      <Flex align="center" gap="2">
        <Search size={20} style={{ color: "var(--gray-11)" }} />
        <TextField.Root
          placeholder="Search NFTs..."
          value={filters.search || ''}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
      </Flex>

      {/* Filters Row */}
      <Flex wrap="wrap" gap="3" align="center">
        {/* Type Filter */}
        <Flex direction="column" gap="1">
          <Text size="2" color="gray">Type</Text>
          <Select.Root
            value={filters.type_name || 'all'}
            onValueChange={(value) => setTypeFilter(value === 'all' ? undefined : value)}
          >
            <Select.Trigger placeholder="All Types" />
            <Select.Content>
              <Select.Item value="all">All Types</Select.Item>
              {acceptedTypes?.map((type) => (
                <Select.Item key={type.id} value={type.type_name}>
                  {type.type_name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>

        {/* Price Range */}
        <Flex direction="column" gap="1">
          <Text size="2" color="gray">Min Price (SUI)</Text>
          <TextField.Root
            placeholder="0"
            type="number"
            value={filters.min_price || ''}
            onChange={(e) => setPriceRange(e.target.value || undefined, filters.max_price)}
            style={{ width: "120px" }}
          />
        </Flex>

        <Flex direction="column" gap="1">
          <Text size="2" color="gray">Max Price (SUI)</Text>
          <TextField.Root
            placeholder="∞"
            type="number"
            value={filters.max_price || ''}
            onChange={(e) => setPriceRange(filters.min_price, e.target.value || undefined)}
            style={{ width: "120px" }}
          />
        </Flex>

        {/* Sort By */}
        <Flex direction="column" gap="1">
          <Text size="2" color="gray">Sort By</Text>
          <Select.Root
            value={filters.sort_by || 'created_at'}
            onValueChange={(value) => setSortBy(value as MarketplaceFilters['sort_by'])}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="created_at">Recently Listed</Select.Item>
              <Select.Item value="price_asc">Price: Low to High</Select.Item>
              <Select.Item value="price_desc">Price: High to Low</Select.Item>
              <Select.Item value="likes">Most Liked</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>

        {/* Clear Filters */}
        <Button 
          variant="outline" 
          onClick={resetFilters}
          style={{ alignSelf: "flex-end" }}
        >
          <X size={16} />
          Clear
        </Button>
      </Flex>
    </Flex>
  );
}