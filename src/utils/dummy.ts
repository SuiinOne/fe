import { Listing, AcceptedType, SalesHistory, Like } from "../types/Listing";

export const dummyListings: Listing[] = [
  {
    id: "0xabc123",
    owner: "0xOwnerAddress",
    type_name: "GameX::Sword",
    price: "100000000",
    metadata: {
      name: "Epic Sword",
      description: "An epic sword from GameX",
    },
    listed_at: new Date().toISOString(),
  },
  {
    id: "0xdef456",
    owner: "0xAnotherOwner",
    type_name: "GameY::Shield",
    price: "200000000",
    metadata: {
      name: "Legendary Shield",
      description: "A shield from GameY",
    },
    listed_at: new Date().toISOString(),
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
