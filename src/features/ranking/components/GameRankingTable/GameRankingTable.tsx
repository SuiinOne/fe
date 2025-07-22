import { Table, Text, Badge, Flex } from "@radix-ui/themes";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useGameRankings } from "../../hooks/useRankings";
// import { GameRank } from "../../api/rankingApi";

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

export function GameRankingTable() {
  const { data: gameRanks, isLoading, error } = useGameRankings();

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Text style={{ color: "white" }}>게임 랭킹을 불러오는 중...</Text>
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

  if (!gameRanks || gameRanks.length === 0) {
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
            <Table.ColumnHeaderCell>게임명</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>등록 아이템</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>거래 수</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>총 거래량</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>변동</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {gameRanks.map((game) => (
            <Table.Row key={game.id}>
              <Table.RowHeaderCell>
                <Flex align="center" gap="2">
                  <Text size="4" weight="bold" style={{ 
                    color: game.rank <= 3 ? "gold" : "white",
                    minWidth: "20px" 
                  }}>
                    #{game.rank}
                  </Text>
                </Flex>
              </Table.RowHeaderCell>
              
              <Table.Cell>
                <Text size="3" weight="bold" style={{ color: "white" }}>
                  {game.game_name}
                </Text>
              </Table.Cell>
              
              <Table.Cell>
                <Text size="3" style={{ color: "var(--blue-11)" }}>
                  {game.total_items}개
                </Text>
              </Table.Cell>
              
              <Table.Cell>
                <Text size="3" style={{ color: "var(--green-11)" }}>
                  {game.total_trades}회
                </Text>
              </Table.Cell>
              
              <Table.Cell>
                <Text size="3" weight="bold" style={{ color: "var(--orange-11)" }}>
                  {game.total_volume} SUI
                </Text>
              </Table.Cell>
              
              <Table.Cell>
                <Flex align="center" gap="2">
                  {getRankChangeIcon(game.change)}
                  {getRankChangeBadge(game.change)}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}