import { Card, Text, Badge, Flex, Box, Button } from "@radix-ui/themes";
import { Eye, Tag, Send } from "lucide-react";
import { Listing } from "../../../marketplace/api/types";

interface NFTCardProps {
  nft: Listing;
  onListForSale?: (nftId: string) => void;
  onCancelListing?: (listingId: string) => void;
  onTransfer?: (nftId: string) => void;
  onViewDetails?: (nftId: string) => void;
}

export function NFTCard({ 
  nft, 
  onListForSale, 
  onCancelListing, 
  onTransfer, 
  onViewDetails 
}: NFTCardProps) {
  const isListed = nft.status === 'active' && nft.price;
  
  const formatPrice = (price: string | null) => {
    if (!price) return "Not listed";
    return `${Number(price) / 1e9} SUI`;
  };

  return (
    <Card
      style={{
        background: "var(--gray-6)",
        color: "white",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
      }}
      className="hover:scale-105 hover:shadow-lg"
    >
      <Flex direction="column" gap="3">
        {/* NFT Image */}
        {nft.metadata?.image && (
          <Box style={{ position: "relative" }}>
            <img
              src={nft.metadata.image}
              alt={nft.metadata?.name || "NFT"}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            {isListed && (
              <Badge
                color="green"
                variant="solid"
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                }}
              >
                Listed
              </Badge>
            )}
          </Box>
        )}

        {/* NFT Info */}
        <Flex direction="column" gap="2">
          <Text weight="bold" size="4">
            {nft.metadata?.name || "Unknown Item"}
          </Text>

          <Text size="2" color="gray">
            {nft.metadata?.description}
          </Text>

          {/* Type and Price */}
          <Flex justify="between" align="center">
            {nft.type_name && (
              <Badge color="blue" variant="soft">
                {nft.type_name}
              </Badge>
            )}
            <Text weight="bold" size="3" color={isListed ? "green" : "gray"}>
              {formatPrice(nft.price)}
            </Text>
          </Flex>

          {/* Action Buttons */}
          <Flex gap="2" style={{ marginTop: "8px" }}>
            <Button
              size="2"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.(nft.id);
              }}
              style={{ flex: 1 }}
            >
              <Eye size={14} />
              View
            </Button>

            {isListed ? (
              <Button
                size="2"
                variant="outline"
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  onCancelListing?.(nft.id);
                }}
                style={{ flex: 1 }}
              >
                Cancel
              </Button>
            ) : (
              <Button
                size="2"
                variant="outline"
                color="green"
                onClick={(e) => {
                  e.stopPropagation();
                  onListForSale?.(nft.id);
                }}
                style={{ flex: 1 }}
              >
                <Tag size={14} />
                List
              </Button>
            )}

            <Button
              size="2"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onTransfer?.(nft.id);
              }}
            >
              <Send size={14} />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}