import { Container, Grid, Text, Flex, Button } from "@radix-ui/themes";
import { Heart, ShoppingCart } from "lucide-react";
import { useFavorites, useRemoveFromFavorites } from "../../hooks/useFavorites";
import { ListingCard } from "../../../marketplace/components/ListingCard";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useNavigate } from "react-router-dom";

interface FavoritesListProps {
  showRemoveButton?: boolean;
}

export function FavoritesList({ showRemoveButton = true }: FavoritesListProps) {
  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();
  const { data: favorites, isLoading, error } = useFavorites(currentAccount?.address);
  const { mutate: removeFromFavorites } = useRemoveFromFavorites();

  const handleRemoveFromFavorites = (listingId: string) => {
    if (!currentAccount?.address) return;
    removeFromFavorites({
      listingId,
      userAddress: currentAccount.address,
    });
  };

  if (!currentAccount) {
    return (
      <Container style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <Flex direction="column" align="center" gap="4">
          <Heart size={64} style={{ color: "var(--gray-9)" }} />
          <Text size="6" weight="bold" style={{ color: "white" }}>
            지갑을 연결해주세요
          </Text>
          <Text size="3" color="gray">
            좋아요한 NFT를 확인하려면 Sui 지갑을 연결해주세요
          </Text>
        </Flex>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "white" }}>좋아요한 NFT를 불러오는 중...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "red" }}>좋아요 목록을 불러오는데 실패했습니다</Text>
      </Container>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <Container style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <Flex direction="column" align="center" gap="4">
          <Heart size={64} style={{ color: "var(--gray-9)" }} />
          <Text size="6" weight="bold" style={{ color: "white" }}>
            좋아요한 NFT가 없습니다
          </Text>
          <Text size="3" color="gray">
            마켓플레이스에서 마음에 드는 NFT에 좋아요를 눌러보세요!
          </Text>
          <Button size="3" onClick={() => navigate('/')}>
            <ShoppingCart size={16} />
            마켓플레이스 둘러보기
          </Button>
        </Flex>
      </Container>
    );
  }

  return (
    <Container style={{ padding: "1rem" }}>
      <Grid 
        columns={{
          initial: "1",
          sm: "2", 
          md: "3",
          lg: "4"
        }} 
        gap="4"
      >
        {favorites.map((listing) => (
          <div key={listing.id} style={{ position: "relative" }}>
            <ListingCard
              listing={listing}
              onUnlike={showRemoveButton ? handleRemoveFromFavorites : undefined}
              isLiked={true}
              showLikeButton={showRemoveButton}
            />
          </div>
        ))}
      </Grid>
    </Container>
  );
}