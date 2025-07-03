import { useParams } from "react-router-dom";
import { dummyListings } from "../utils/dummy";
import { Card, Container, Text } from "@radix-ui/themes";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();

  const listing = dummyListings.find((item) => item.id === id);

  if (!listing) return <p>Listing not found</p>;

  return (
    <Container mt="4">
      <Card>
        <Text weight="bold" size="4">
          {listing.metadata?.name}
        </Text>
        <Text>{listing.metadata?.description}</Text>
        <Text>Owner: {listing.owner}</Text>
        <Text>Type: {listing.type_name}</Text>
        <Text>Price: {Number(listing.price) / 1e9} SUI</Text>
      </Card>
    </Container>
  );
}
