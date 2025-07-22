import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Flex, Text, Button, Badge, Heading, Box } from "@radix-ui/themes";
import { Heart, ArrowLeft, ShoppingCart, Share2 } from "lucide-react";
import { useListingDetail, useListingStats, useLikeListing, useUnlikeListing, useBuyListing } from "../../hooks/useListings";
import { useCurrentAccount } from "@mysten/dapp-kit";

export function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  
  const { data: listing, isLoading } = useListingDetail(id!);
  const { data: stats } = useListingStats(id!);
  const { mutate: likeListing } = useLikeListing();
  const { mutate: unlikeListing } = useUnlikeListing();
  const { mutate: buyListing } = useBuyListing();

  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLike = () => {
    if (!currentAccount?.address) return;
    
    if (isLiked) {
      unlikeListing({ listingId: id!, userAddress: currentAccount.address });
      setIsLiked(false);
    } else {
      likeListing({ listingId: id!, userAddress: currentAccount.address });
      setIsLiked(true);
    }
  };

  const handleBuy = async () => {
    if (!currentAccount?.address || !listing) return;
    
    setIsProcessing(true);
    try {
      // TODO: Implement actual blockchain transaction
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      buyListing({
        listingId: id!,
        buyerAddress: currentAccount.address,
        txHash: mockTxHash,
      });
      // Show success message and redirect
      alert("Purchase successful!");
      navigate("/my-nfts");
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: string | null) => {
    if (!price) return "Not for sale";
    return `${Number(price) / 1e9} SUI`;
  };

  if (isLoading) {
    return (
      <Container style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "white" }}>Loading...</Text>
      </Container>
    );
  }

  if (!listing) {
    return (
      <Container style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "white" }}>Listing not found</Text>
      </Container>
    );
  }

  const isOwner = currentAccount?.address === listing.owner;
  const canBuy = !isOwner && listing.price && listing.status === 'active';

  return (
    <Container style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        style={{ marginBottom: "1rem" }}
      >
        <ArrowLeft size={16} />
        Back
      </Button>

      <Flex gap="6" direction={{ initial: "column", md: "row" }}>
        {/* Left: Image */}
        <Box style={{ flex: "1" }}>
          <Card style={{ padding: "0", overflow: "hidden" }}>
            <img
              src={listing.metadata?.image || 'https://via.placeholder.com/400x400?text=NFT'}
              alt={listing.metadata?.name || "NFT"}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />
          </Card>
        </Box>

        {/* Right: Details */}
        <Box style={{ flex: "1" }}>
          <Card style={{ padding: "2rem", background: "var(--gray-6)" }}>
            <Flex direction="column" gap="4">
              {/* Header */}
              <Flex justify="between" align="start">
                <Box>
                  <Heading size="6" style={{ color: "white", marginBottom: "0.5rem" }}>
                    {listing.metadata?.name || "Unknown Item"}
                  </Heading>
                  {listing.type_name && (
                    <Badge color="blue" variant="soft">
                      {listing.type_name}
                    </Badge>
                  )}
                </Box>
                <Flex gap="2">
                  {currentAccount && (
                    <Button
                      variant="ghost"
                      size="3"
                      onClick={handleLike}
                      style={{
                        color: isLiked ? "red" : "var(--gray-11)",
                      }}
                    >
                      <Heart size={20} fill={isLiked ? "red" : "none"} />
                      {stats?.likes || 0}
                    </Button>
                  )}
                  <Button variant="ghost" size="3">
                    <Share2 size={20} />
                  </Button>
                </Flex>
              </Flex>

              {/* Description */}
              {listing.metadata?.description && (
                <Text size="3" color="gray">
                  {listing.metadata.description}
                </Text>
              )}

              {/* Price */}
              <Flex direction="column" gap="2">
                <Text size="2" color="gray">Price</Text>
                <Text size="6" weight="bold" color="green">
                  {formatPrice(listing.price)}
                </Text>
              </Flex>

              {/* Owner */}
              <Flex direction="column" gap="2">
                <Text size="2" color="gray">Owner</Text>
                <Text size="3" style={{ fontFamily: "monospace" }}>
                  {listing.owner}
                </Text>
              </Flex>

              {/* Stats */}
              {stats && (
                <Flex gap="4">
                  <Flex direction="column" align="center">
                    <Text size="4" weight="bold" color="blue">
                      {stats.likes}
                    </Text>
                    <Text size="2" color="gray">Likes</Text>
                  </Flex>
                  <Flex direction="column" align="center">
                    <Text size="4" weight="bold" color="green">
                      {stats.sales}
                    </Text>
                    <Text size="2" color="gray">Sales</Text>
                  </Flex>
                  <Flex direction="column" align="center">
                    <Text size="4" weight="bold" color="orange">
                      {stats.views}
                    </Text>
                    <Text size="2" color="gray">Views</Text>
                  </Flex>
                </Flex>
              )}

              {/* Action Buttons */}
              <Flex gap="3" style={{ marginTop: "1rem" }}>
                {canBuy && (
                  <Button
                    size="3"
                    style={{ flex: 1 }}
                    onClick={handleBuy}
                    disabled={isProcessing}
                  >
                    <ShoppingCart size={16} />
                    {isProcessing ? "Processing..." : "Buy Now"}
                  </Button>
                )}
                
                {isOwner && listing.status === 'active' && (
                  <Button
                    size="3"
                    variant="outline"
                    style={{ flex: 1 }}
                    disabled={isProcessing}
                  >
                    Cancel Listing
                  </Button>
                )}

                {!currentAccount && (
                  <Text size="2" color="gray" style={{ textAlign: "center", padding: "1rem" }}>
                    Connect your wallet to interact with this NFT
                  </Text>
                )}
              </Flex>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </Container>
  );
}