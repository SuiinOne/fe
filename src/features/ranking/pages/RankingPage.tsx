import { useState } from "react";
import { Container, Flex, Heading, Text, Tabs } from "@radix-ui/themes";
import { Trophy, Users, Gamepad2 } from "lucide-react";
import { GameRankingTable } from "../components/GameRankingTable";
import { UserRankingTable } from "../components/UserRankingTable";
import { useUserRank } from "../hooks/useRankings";
import { useCurrentAccount } from "@mysten/dapp-kit";

export function RankingPage() {
  const currentAccount = useCurrentAccount();
  const { data: userRank } = useUserRank(currentAccount?.address);
  const [activeTab, setActiveTab] = useState("games");

  return (
    <Container style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <Flex direction="column" gap="4">
        {/* 페이지 헤더 */}
        <Flex justify="between" align="center" style={{ padding: "1rem 0" }}>
          <Flex align="center" gap="3">
            <Trophy size={32} style={{ color: "gold" }} />
            <Heading size="6" style={{ color: "white" }}>
              랭킹
            </Heading>
          </Flex>
        </Flex>

        {/* 내 랭킹 정보 (로그인된 경우만) */}
        {currentAccount && userRank && (
          <div style={{ 
            background: "var(--blue-3)", 
            borderRadius: "8px", 
            padding: "1rem",
            border: "1px solid var(--blue-6)" 
          }}>
            <Flex justify="between" align="center">
              <Flex direction="column" gap="1">
                <Text size="2" color="gray">내 순위</Text>
                <Text size="5" weight="bold" style={{ color: "white" }}>
                  #{userRank.rank}
                </Text>
              </Flex>
              <Flex gap="4">
                <Flex direction="column" align="center">
                  <Text size="3" weight="bold" style={{ color: "var(--green-11)" }}>
                    {userRank.total_trades}
                  </Text>
                  <Text size="1" color="gray">총 거래</Text>
                </Flex>
                <Flex direction="column" align="center">
                  <Text size="3" weight="bold" style={{ color: "var(--orange-11)" }}>
                    {userRank.total_volume}
                  </Text>
                  <Text size="1" color="gray">거래량 (SUI)</Text>
                </Flex>
                <Flex direction="column" align="center">
                  <Text size="3" weight="bold" style={{ color: "var(--blue-11)" }}>
                    {userRank.owned_nfts}
                  </Text>
                  <Text size="1" color="gray">보유 NFT</Text>
                </Flex>
              </Flex>
            </Flex>
          </div>
        )}

        {/* 랭킹 탭 */}
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Trigger value="games">
              <Flex align="center" gap="2">
                <Gamepad2 size={16} />
                게임별 랭킹
              </Flex>
            </Tabs.Trigger>
            <Tabs.Trigger value="users">
              <Flex align="center" gap="2">
                <Users size={16} />
                유저별 랭킹
              </Flex>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="games" style={{ marginTop: "1rem" }}>
            <Flex direction="column" gap="3">
              <Text size="4" weight="bold" style={{ color: "white" }}>
                게임별 랭킹
              </Text>
              <Text size="2" color="gray">
                구조체 기반 아이템 등록 수 및 거래 수 기준
              </Text>
              <GameRankingTable />
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="users" style={{ marginTop: "1rem" }}>
            <Flex direction="column" gap="3">
              <Text size="4" weight="bold" style={{ color: "white" }}>
                유저별 랭킹
              </Text>
              <Text size="2" color="gray">
                구조체 등록 수, 거래 실적, 보유 NFT 수 기준
              </Text>
              <UserRankingTable />
            </Flex>
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </Container>
  );
}