import { useState } from "react";
import { Container, Flex, Heading, Button } from "@radix-ui/themes";
import { Filter, Grid, List } from "lucide-react";
import { ListingList } from "../components/ListingList";
import { SearchFilters } from "../components/SearchFilters";
import { MarketplaceFilters } from "../api/types";
import { useIsMobile, useIsTabletOrMobile } from "../../../shared/hooks/useMediaQuery";
import { MobileDrawer, useDrawer } from "../../../shared/components/ui/MobileDrawer";
import { FilterPanel, FilterGroup } from "../../../shared/components/ui/FilterPanel";

export function MarketplacePage() {
  const [filters, setFilters] = useState<MarketplaceFilters>({
    sort_by: 'created_at',
    status: 'active',
  });
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  
  const isMobile = useIsMobile();
  const isTabletOrMobile = useIsTabletOrMobile();
  const { isOpen: isFilterOpen, open: openFilter, close: closeFilter } = useDrawer();

  // Filter groups for advanced filtering
  const filterGroups: FilterGroup[] = [
    {
      id: 'game',
      title: '게임별',
      type: 'multi-select',
      options: [
        { value: 'gamex', label: 'GameX', count: 156 },
        { value: 'rpgworld', label: 'RPG World', count: 89 },
        { value: 'magicquest', label: 'Magic Quest', count: 234 }
      ]
    },
    {
      id: 'type',
      title: '아이템 타입',
      type: 'multi-select',
      options: [
        { value: 'weapon', label: '무기', count: 45 },
        { value: 'armor', label: '방어구', count: 32 },
        { value: 'potion', label: '포션', count: 28 },
        { value: 'accessory', label: '악세서리', count: 19 }
      ]
    },
    {
      id: 'price',
      title: '가격 범위',
      type: 'range',
      min: 0,
      max: 100
    },
    {
      id: 'rarity',
      title: '희귀도',
      type: 'select',
      options: [
        { value: 'common', label: '일반', count: 180 },
        { value: 'rare', label: '레어', count: 92 },
        { value: 'epic', label: '에픽', count: 45 },
        { value: 'legendary', label: '전설', count: 12 }
      ]
    }
  ];

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterValues(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const resetFilters = () => {
    setFilterValues({});
    setSearchQuery('');
  };

  return (
    <Container style={{ maxWidth: "1400px", margin: "0 auto", padding: isMobile ? "0.5rem" : "2rem", background: "transparent" }}>
      <Flex direction="column" gap={isMobile ? "3" : "4"}>
        {/* Page Header */}
        <Flex justify="between" align="center" style={{ padding: isMobile ? "0.5rem 0" : "1rem 0" }}>
          <Heading size={isMobile ? "5" : "6"} style={{ color: "var(--foreground)" }}>
            NFT 마켓플레이스
          </Heading>
          
          {/* View Mode Toggle - Desktop */}
          {!isMobile && (
            <Flex gap="2">
              <Button
                variant={viewMode === 'grid' ? 'solid' : 'ghost'}
                size="2"
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
                그리드
              </Button>
              <Button
                variant={viewMode === 'list' ? 'solid' : 'ghost'}
                size="2"
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
                리스트
              </Button>
            </Flex>
          )}
        </Flex>

        {/* Mobile Filter Button */}
        {isTabletOrMobile && (
          <Flex justify="between" align="center" gap="2">
            <Button variant="soft" onClick={openFilter} style={{ flex: 1 }}>
              <Filter size={16} />
              필터
              {Object.values(filterValues).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length > 0 && (
                <span style={{ 
                  background: 'var(--blue-9)', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '20px', 
                  height: '20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '12px',
                  marginLeft: '8px'
                }}>
                  {Object.values(filterValues).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length}
                </span>
              )}
            </Button>
            
            {isMobile && (
              <Flex gap="1">
                <Button
                  variant={viewMode === 'grid' ? 'solid' : 'ghost'}
                  size="2"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'solid' : 'ghost'}
                  size="2"
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} />
                </Button>
              </Flex>
            )}
          </Flex>
        )}

        {/* Desktop Layout */}
        {!isTabletOrMobile ? (
          <Flex gap="6">
            {/* Left Sidebar - Filters */}
            <div style={{ width: '300px', flexShrink: 0 }}>
              <FilterPanel
                groups={filterGroups}
                values={filterValues}
                onChange={handleFilterChange}
                onReset={resetFilters}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Search and Filters */}
              <SearchFilters onFiltersChange={setFilters} />
              
              {/* Listings */}
              <div style={{ marginTop: '1.5rem' }}>
                <ListingList filters={filters} viewMode={viewMode} />
              </div>
            </div>
          </Flex>
        ) : (
          /* Mobile/Tablet Layout */
          <Flex direction="column" gap="4">
            {/* Search */}
            <SearchFilters onFiltersChange={setFilters} />
            
            {/* Listings */}
            <ListingList filters={filters} viewMode={viewMode} />
          </Flex>
        )}
      </Flex>

      {/* Mobile Filter Drawer */}
      <MobileDrawer
        isOpen={isFilterOpen}
        onClose={closeFilter}
        title="필터"
        position="left"
      >
        <FilterPanel
          groups={filterGroups}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          isCollapsible={false}
        />
      </MobileDrawer>
    </Container>
  );
}