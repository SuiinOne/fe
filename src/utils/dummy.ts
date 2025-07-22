import { Listing, AcceptedType } from "../features/marketplace/api/types";
import { SalesHistory, Like } from "../types/Listing";

export const dummyListings: Listing[] = [
  {
    id: "0xabc123",
    owner: "0xOwnerAddress",
    type_name: "GameX::Sword",
    price: "100000000",
    metadata: {
      name: "Epic Sword",
      description: "An epic sword from GameX",
      image: "https://via.placeholder.com/400x400?text=Epic+Sword",
      attributes: [
        { trait_type: "Rarity", value: "Epic" },
        { trait_type: "Attack", value: 100 },
      ],
    },
    listed_at: new Date().toISOString(),
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "0xdef456",
    owner: "0xAnotherOwner",
    type_name: "GameY::Shield",
    price: "200000000",
    metadata: {
      name: "Legendary Shield",
      description: "A shield from GameY",
      image: "https://via.placeholder.com/400x400?text=Legendary+Shield",
      attributes: [
        { trait_type: "Rarity", value: "Legendary" },
        { trait_type: "Defense", value: 200 },
      ],
    },
    listed_at: new Date().toISOString(),
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Mock NFTs owned by user (will match connected wallet address for demo)
  {
    id: "0xuser001",
    owner: "0x123456789abcdef", // This will be replaced with actual wallet address in real app
    type_name: "GameX::Bow",
    price: null, // Not listed for sale
    metadata: {
      name: "Mystic Bow",
      description: "A mystical bow with ancient powers",
      image: "https://via.placeholder.com/400x400?text=Mystic+Bow",
      attributes: [
        { trait_type: "Rarity", value: "Rare" },
        { trait_type: "Attack", value: 85 },
      ],
    },
    listed_at: null,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "0xuser002",
    owner: "0x123456789abcdef",
    type_name: "GameZ::Ring",
    price: "50000000", // Listed for sale
    metadata: {
      name: "Ring of Power",
      description: "A powerful magical ring",
      image: "https://via.placeholder.com/400x400?text=Ring+of+Power",
      attributes: [
        { trait_type: "Rarity", value: "Epic" },
        { trait_type: "Magic", value: 150 },
      ],
    },
    listed_at: new Date().toISOString(),
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const dummyAcceptedTypes: AcceptedType[] = [
  {
    id: 1,
    type_name: "GameX::Sword",
    module_address: "0x1abc...",
    metadata_url: "https://example.com/sword.json",
    active: true,
  },
  {
    id: 2,
    type_name: "GameY::Shield",
    module_address: "0x2abc...",
    metadata_url: "https://example.com/shield.json",
    active: true,
  },
];

export const dummySalesHistory: SalesHistory[] = [
  {
    id: 1,
    item_id: "0xabc123",
    type_name: "GameX::Sword",
    seller: "0xSellerAddress",
    buyer: "0xBuyerAddress",
    price: "95000000",
    tx_digest: "0x789...",
    sold_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
];

export const dummyLikes: Like[] = [
  {
    id: 1,
    user_address: "0x123456789abcdef", // 데모용 사용자 주소
    listing_id: "0xabc123",
    liked_at: new Date().toISOString(),
  },
  {
    id: 2,
    user_address: "0x123456789abcdef",
    listing_id: "0xdef456",
    liked_at: new Date().toISOString(),
  },
];
