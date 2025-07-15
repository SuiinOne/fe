import { useCurrentAccount } from "@mysten/dapp-kit";
import { Container, Flex, Heading, Text } from "@radix-ui/themes";
// import { OwnedObjects } from "./OwnedObjects";

export function WalletStatus() {
  const account = useCurrentAccount();

  return (
    <Container my="2" style={{
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 24px #61b6fb33',
      padding: 24,
      maxWidth: 420,
      margin: '24px auto',
      border: '1.5px solid #aee6ff',
    }}>
      <Heading mb="2" style={{ color: '#61b6fbff', fontWeight: 800, textShadow: '0 2px 8px #aee6ff' }}>Wallet Status</Heading>
      {account ? (
        <Flex direction="column" gap="2">
          <Text style={{ color: '#23262F', fontWeight: 600 }}>Wallet connected</Text>
          <Text style={{ color: '#61b6fbff', fontWeight: 700 }}>Address: {account.address}</Text>
        </Flex>
      ) : (
        <Text style={{ color: '#23262F', fontWeight: 600 }}>Wallet not connected</Text>
      )}
      {/* <OwnedObjects /> */}
    </Container>
  );
}
