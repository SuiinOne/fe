import { Container, Text, Flex } from "@radix-ui/themes";
import { useListings } from "../../hooks/useListings";
import { ListingCard } from "../ListingCard";
import { MarketplaceFilters } from "../../api/types";
import { ResponsiveGridCSS } from "../../../../shared/components/ui/ResponsiveGrid";
import { useIsMobile } from "../../../../shared/hooks/useMediaQuery";

interface ListingListProps {
  filters?: MarketplaceFilters;
  showLikeButton?: boolean;
  viewMode?: 'grid' | 'list';
}

export function ListingList({ 
  filters, 
  showLikeButton = true,
  viewMode = 'grid'
}: ListingListProps) {
  const { data, isLoading, error } = useListings(filters);
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <Container style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "var(--foreground)" }}>NFT 목록을 불러오는 중...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "var(--red-11)" }}>NFT 목록을 불러오는데 실패했습니다</Text>
      </Container>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Container style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "var(--muted-foreground)" }}>등록된 NFT가 없습니다</Text>
      </Container>
    );
  }

  // Grid View
  if (viewMode === 'grid') {
    return (
      <ResponsiveGridCSS
        columns={{
          mobile: 1,
          tablet: 2,
          desktop: 3,
          wide: 4
        }}
        gap={isMobile ? "1rem" : "1.5rem"}
        minItemWidth="280px"
        variant="auto-fit"
        style={{
          padding: isMobile ? "0" : "0.5rem"
        }}
      >
        {data.map((listing) => (
          <div key={listing.id} className="grid-item">
            <ListingCard
              listing={listing}
              showLikeButton={showLikeButton}
              compact={isMobile}
            />
          </div>
        ))}
      </ResponsiveGridCSS>
    );
  }

  // List View
  return (
    <Flex direction="column" gap="3" style={{ padding: isMobile ? "0" : "0.5rem" }}>
      {data.map((listing) => (
        <div key={listing.id} style={{ width: '100%' }}>
          <ListingCard
            listing={listing}
            showLikeButton={showLikeButton}
            compact={true}
          />
        </div>
      ))}
    </Flex>
  );
}