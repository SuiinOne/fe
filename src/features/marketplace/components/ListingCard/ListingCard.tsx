import { Card, Text, Badge, Flex, Box, Tooltip } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { Listing } from "../../api/types";
import { Button } from "../../../../shared/components/ui/Button";
import { Heart, Eye, ExternalLink } from "lucide-react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useIsFavorited } from "../../../favorites/hooks/useFavorites";
import { useAddToFavorites, useRemoveFromFavorites } from "../../../favorites/hooks/useFavorites";

interface ListingCardProps {
  listing: Listing;
  onLike?: (listingId: string) => void;
  onUnlike?: (listingId: string) => void;
  isLiked?: boolean;
  showLikeButton?: boolean;
  compact?: boolean;
}

export function ListingCard({ 
  listing, 
  showLikeButton = true,
  compact = false
}: ListingCardProps) {
  const currentAccount = useCurrentAccount();
  const { data: isLiked = false } = useIsFavorited(listing.id, currentAccount?.address);
  const { mutate: addToFavorites } = useAddToFavorites();
  const { mutate: removeFromFavorites } = useRemoveFromFavorites();

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentAccount?.address) return;

    if (isLiked) {
      removeFromFavorites({
        listingId: listing.id,
        userAddress: currentAccount.address,
      });
    } else {
      addToFavorites({
        listingId: listing.id,
        userAddress: currentAccount.address,
      });
    }
  };

  const formatPrice = (price: string | null) => {
    if (!price) return "Not for sale";
    return `${Number(price) / 1e9} SUI`;
  };

  return (
    <Card
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        transition: "all 150ms ease-in-out",
        position: "relative",
        overflow: "hidden",
        height: compact ? "auto" : "400px",
      }}
      className="hover-lift"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    >
      <Link 
        to={`/listing/${listing.id}`}
        style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          display: 'block',
          height: '100%'
        }}
      >
        <Flex direction="column" style={{ height: '100%' }}>
          {/* Image Container with Overlay Actions */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            {listing.metadata?.image ? (
              <img
                src={listing.metadata.image}
                alt={listing.metadata?.name || "NFT"}
                style={{
                  width: "100%",
                  height: compact ? "150px" : "220px",
                  objectFit: "cover",
                  transition: 'transform 150ms ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            ) : (
              <Box
                style={{
                  width: "100%",
                  height: compact ? "150px" : "220px",
                  background: "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text size="2" color="gray">No Image</Text>
              </Box>
            )}

            {/* Overlay Actions */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                display: 'flex',
                gap: '8px',
                opacity: 0,
                transition: 'opacity 150ms ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              className="card-actions"
            >
              {showLikeButton && (
                <Tooltip content={isLiked ? "좋아요 취소" : "좋아요"}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLikeClick}
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: isLiked ? 'var(--red-11)' : 'var(--gray-11)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Heart size={16} fill={isLiked ? 'var(--red-11)' : 'none'} />
                  </Button>
                </Tooltip>
              )}
              <Tooltip content="상세보기">
                <Button
                  variant="ghost"
                  size="sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: 'var(--gray-11)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Eye size={16} />
                </Button>
              </Tooltip>
            </div>

            {/* Status Badge */}
            {listing.status && (
              <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
                <Badge 
                  color={listing.status === 'active' ? 'green' : 'gray'}
                  variant="solid"
                  style={{ 
                    backdropFilter: 'blur(8px)',
                    background: listing.status === 'active' ? 'var(--green-9)' : 'var(--gray-9)'
                  }}
                >
                  {listing.status === 'active' ? '판매중' : '판매 완료'}
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <Flex direction="column" gap="3" p="3" style={{ flex: 1 }}>
            {/* Title */}
            <Text 
              weight="bold" 
              size={compact ? "3" : "4"}
              style={{ 
                color: 'var(--foreground)',
                lineHeight: '1.2',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {listing.metadata?.name || "Unknown Item"}
            </Text>

            {/* Description */}
            {!compact && listing.metadata?.description && (
              <Text 
                size="2" 
                style={{ 
                  color: 'var(--muted-foreground)',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: '1.4'
                }}
              >
                {listing.metadata.description}
              </Text>
            )}

            {/* Type Badge */}
            {listing.type_name && (
              <Flex justify="start">
                <Badge color="blue" variant="soft" size="1">
                  {listing.type_name}
                </Badge>
              </Flex>
            )}

            {/* Bottom Section - Price and Owner */}
            <div style={{ marginTop: 'auto' }}>
              <Flex justify="between" align="center" mb="2">
                <Text 
                  weight="bold" 
                  size={compact ? "3" : "4"}
                  style={{ color: 'var(--green-11)' }}
                >
                  {formatPrice(listing.price)}
                </Text>
                <ExternalLink size={14} style={{ color: 'var(--muted-foreground)' }} />
              </Flex>
              
              <Text 
                size="1" 
                style={{ 
                  color: 'var(--muted-foreground)',
                  fontFamily: 'monospace'
                }}
              >
                {listing.owner.slice(0, 8)}...{listing.owner.slice(-6)}
              </Text>
            </div>
          </Flex>
        </Flex>
      </Link>

    </Card>
  );
}