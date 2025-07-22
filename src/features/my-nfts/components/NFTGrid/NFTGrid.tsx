import { Container, Grid, Text, Flex, Button } from "@radix-ui/themes";
import { Plus, Wallet } from "lucide-react";
import { useUserNFTs } from "../../hooks/useUserNFTs";
import { NFTCard } from "../NFTCard";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useNavigate } from "react-router-dom";

interface NFTGridProps {
  onListForSale?: (nftId: string) => void;
  onCancelListing?: (listingId: string) => void;
  onTransfer?: (nftId: string) => void;
}

export function NFTGrid({ onListForSale, onCancelListing, onTransfer }: NFTGridProps) {
  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();
  const { data: nfts, isLoading, error } = useUserNFTs(currentAccount?.address);

  const handleViewDetails = (nftId: string) => {
    navigate(`/listing/${nftId}`);
  };

  if (!currentAccount) {
    return (
      <Container style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <Flex direction="column" align="center" gap="4">
          <Wallet size={64} style={{ color: "var(--gray-9)" }} />
          <Text size="6" weight="bold" style={{ color: "white" }}>
            Connect Your Wallet
          </Text>
          <Text size="3" color="gray">
            Connect your Sui wallet to view and manage your NFTs
          </Text>
        </Flex>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "white" }}>Loading your NFTs...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "red" }}>Error loading your NFTs</Text>
      </Container>
    );
  }

  if (!nfts || nfts.length === 0) {
    return (
      <Container style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <Flex direction="column" align="center" gap="4">
          <Plus size={64} style={{ color: "var(--gray-9)" }} />
          <Text size="6" weight="bold" style={{ color: "white" }}>
            No NFTs Found
          </Text>
          <Text size="3" color="gray">
            You don't own any NFTs yet. Start by purchasing from the marketplace!
          </Text>
          <Button size="3" onClick={() => navigate('/')}>
            Browse Marketplace
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
        {nfts.map((nft) => (
          <NFTCard
            key={nft.id}
            nft={nft}
            onListForSale={onListForSale}
            onCancelListing={onCancelListing}
            onTransfer={onTransfer}
            onViewDetails={handleViewDetails}
          />
        ))}
      </Grid>
    </Container>
  );
}