import { useState } from "react";
import { Container, Flex, Heading, Button, Dialog, TextField, Text } from "@radix-ui/themes";
import { NFTGrid } from "../components/NFTGrid";
import { useCreateListing, useCancelListing, useTransferNFT } from "../hooks/useUserNFTs";
import { useCurrentAccount } from "@mysten/dapp-kit";

export function MyNFTsPage() {
  const currentAccount = useCurrentAccount();
  const { mutate: createListing } = useCreateListing();
  const { mutate: cancelListing } = useCancelListing();
  const { mutate: transferNFT } = useTransferNFT();

  const [listingModal, setListingModal] = useState<{ isOpen: boolean; nftId?: string }>({
    isOpen: false,
  });
  const [transferModal, setTransferModal] = useState<{ isOpen: boolean; nftId?: string }>({
    isOpen: false,
  });
  const [listingPrice, setListingPrice] = useState("");
  const [transferAddress, setTransferAddress] = useState("");

  const handleListForSale = (nftId: string) => {
    setListingModal({ isOpen: true, nftId });
    setListingPrice("");
  };

  const handleCancelListing = (listingId: string) => {
    if (!currentAccount?.address) return;
    
    cancelListing({
      listingId,
      userAddress: currentAccount.address,
    });
  };

  const handleTransfer = (nftId: string) => {
    setTransferModal({ isOpen: true, nftId });
    setTransferAddress("");
  };

  const confirmListing = () => {
    if (!currentAccount?.address || !listingModal.nftId || !listingPrice) return;

    const priceInMist = (parseFloat(listingPrice) * 1e9).toString();
    
    createListing({
      nftId: listingModal.nftId,
      price: priceInMist,
      userAddress: currentAccount.address,
    });

    setListingModal({ isOpen: false });
  };

  const confirmTransfer = () => {
    if (!currentAccount?.address || !transferModal.nftId || !transferAddress) return;

    // TODO: Implement actual blockchain transaction
    const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    
    transferNFT({
      nftId: transferModal.nftId,
      fromAddress: currentAccount.address,
      toAddress: transferAddress,
      txHash: mockTxHash,
    });

    setTransferModal({ isOpen: false });
  };

  return (
    <Container style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <Flex direction="column" gap="4">
        {/* Page Header */}
        <Flex justify="between" align="center" style={{ padding: "1rem 0" }}>
          <Heading size="6" style={{ color: "white" }}>
            My NFTs
          </Heading>
        </Flex>

        {/* NFT Grid */}
        <NFTGrid
          onListForSale={handleListForSale}
          onCancelListing={handleCancelListing}
          onTransfer={handleTransfer}
        />

        {/* List for Sale Modal */}
        <Dialog.Root 
          open={listingModal.isOpen} 
          onOpenChange={(open) => setListingModal({ isOpen: open })}
        >
          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>List NFT for Sale</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Set a price for your NFT in SUI tokens.
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Price (SUI)
                </Text>
                <TextField.Root
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  value={listingPrice}
                  onChange={(e) => setListingPrice(e.target.value)}
                />
              </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button onClick={confirmListing} disabled={!listingPrice}>
                List for Sale
              </Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>

        {/* Transfer Modal */}
        <Dialog.Root 
          open={transferModal.isOpen} 
          onOpenChange={(open) => setTransferModal({ isOpen: open })}
        >
          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Transfer NFT</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Enter the recipient's Sui address to transfer this NFT.
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Recipient Address
                </Text>
                <TextField.Root
                  placeholder="0x..."
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                />
              </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button 
                onClick={confirmTransfer} 
                disabled={!transferAddress}
                color="orange"
              >
                Transfer
              </Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Container>
  );
}