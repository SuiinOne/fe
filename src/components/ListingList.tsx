import { Card, Container, Flex, Text } from "@radix-ui/themes";
import { useListings } from "../hooks/useListings";
import { Listing } from "../types/Listing";
import { Link } from "react-router-dom";

export default function ListingList() {
  const { data, isLoading } = useListings();

  if (isLoading)
    return (
      <p style={{ color: "white" }}>Loading...</p>
    );

  if (!data || data.length === 0) {
    return (
      <p style={{ color: "white" }}>
        No Listings Found
      </p>
    );
  }

  return (
    <Container
      style={{
        background: "var(--gray-4)",
        padding: "1rem",
      }}
    >
      <Flex direction="column" gap="3">
        {data.map((item: Listing) => (
          <Link key={item.id} to={`/listing/${item.id}`}>
            <Card
              style={{
                background: "var(--gray-6)",
                color: "white",
              }}
            >
              <Text weight="bold" size="3">
                {item.metadata?.name || "Unknown Item"}
              </Text>
              <Text>{item.metadata?.description}</Text>
              <Text>Price: {Number(item.price) / 1e9} SUI</Text>
            </Card>
          </Link>
        ))}
      </Flex>
    </Container>
  );
}
