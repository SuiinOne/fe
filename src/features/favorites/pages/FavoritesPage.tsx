import { Container, Flex, Heading, Text } from "@radix-ui/themes";
import { Heart } from "lucide-react";
import { FavoritesList } from "../components/FavoritesList";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useFavorites } from "../hooks/useFavorites";

export function FavoritesPage() {
  const currentAccount = useCurrentAccount();
  const { data: favorites } = useFavorites(currentAccount?.address);

  return (
    <Container style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <Flex direction="column" gap="4">
        {/* 페이지 헤더 */}
        <Flex justify="between" align="center" style={{ padding: "1rem 0" }}>
          <Flex align="center" gap="3">
            <Heart size={32} style={{ color: "red" }} />
            <Heading size="6" style={{ color: "white" }}>
              좋아요 모아보기
            </Heading>
          </Flex>
          {currentAccount && favorites && (
            <Text size="3" color="gray">
              총 {favorites.length}개의 NFT
            </Text>
          )}
        </Flex>

        {/* 좋아요 목록 */}
        <FavoritesList />
      </Flex>
    </Container>
  );
}