import { Table, Text, Badge, Flex } from "@radix-ui/themes";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useUserRankings } from "../../hooks/useRankings";
// import { UserRank } from "../../api/rankingApi";

const getRankChangeIcon = (change: number) => {
  if (change > 0) return <TrendingUp size={16} color="green" />;
  if (change < 0) return <TrendingDown size={16} color="red" />;
  return <Minus size={16} color="gray" />;
};

const getRankChangeBadge = (change: number) => {
  if (change > 0) return <Badge color="green">+{change}</Badge>;
  if (change < 0) return <Badge color="red">{change}</Badge>;
  return <Badge color="gray">-</Badge>;
};

const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function UserRankingTable() {
  const { data: userRanks, isLoading, error } = useUserRankings();

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "white" }}>유저 랭킹을 불러오는 중...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "red" }}>랭킹 정보를 불러오는데 실패했습니다</Text>
      </div>
    );
  }

  if (!userRanks || userRanks.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "gray" }}>랭킹 정보가 없습니다</Text>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--gray-3)", borderRadius: "8px", overflow: "hidden" }}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>순위</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>유저</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>타입 등록</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>거래 수</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>거래량</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>보유 NFT</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>변동</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userRanks.map((user) => (
            <Table.Row key={user.id}>
              <Table.RowHeaderCell>
                <Flex align="center" gap="2">
                  <Text size="4" weight="bold" style={{ 
                    color: user.rank <= 3 ? "gold" : "white",
                    minWidth: "20px" 
                  }}>
                    #{user.rank}
                  </Text>
                </Flex>
              </Table.RowHeaderCell>
              
              <Table.Cell>
                <Flex direction="column" gap="1">
                  {user.username && (
                    <Text size="3" weight="bold" style={{ color: "white" }}>
                      {user.username}
                    </Text>
                  )}
                  <Text size="2" style={{ 
                    color: "var(--gray-11)", 
                    fontFamily: "monospace" 
                  }}>
                    {formatAddress(user.user_address)}
                  </Text>
                </Flex>
              </Table.Cell>
              
              <Table.Cell>
                <Text size="3" style={{ color: "var(--purple-11)" }}>
                  {user.registered_types}개
                </Text>
              </Table.Cell>
              
              <Table.Cell>
                <Text size="3" style={{ color: "var(--green-11)" }}>
                  {user.total_trades}회
                </Text>
              </Table.Cell>
              
              <Table.Cell>
                <Text size="3" weight="bold" style={{ color: "var(--orange-11)" }}>
                  {user.total_volume} SUI
                </Text>
              </Table.Cell>
              
              <Table.Cell>
                <Text size="3" style={{ color: "var(--blue-11)" }}>
                  {user.owned_nfts}개
                </Text>
              </Table.Cell>
              
              <Table.Cell>
                <Flex align="center" gap="2">
                  {getRankChangeIcon(user.change)}
                  {getRankChangeBadge(user.change)}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}