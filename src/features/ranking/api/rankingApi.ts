// import apiClient from '../../../shared/api/client';
// import { API_ENDPOINTS } from '../../../shared/api/endpoints';

export interface GameRank {
  id: string;
  game_name: string;
  total_items: number;
  total_trades: number;
  total_volume: string; // SUI amount
  rank: number;
  change: number; // 순위 변동 (+1, -1, 0)
}

export interface UserRank {
  id: string;
  user_address: string;
  username?: string;
  registered_types: number;
  total_trades: number;
  total_volume: string; // SUI amount
  owned_nfts: number;
  rank: number;
  change: number;
}

// 더미 게임 랭킹 데이터
const dummyGameRanks: GameRank[] = [
  {
    id: '1',
    game_name: 'GameX',
    total_items: 150,
    total_trades: 89,
    total_volume: '245.5',
    rank: 1,
    change: 0,
  },
  {
    id: '2',
    game_name: 'GameY',
    total_items: 98,
    total_trades: 67,
    total_volume: '178.3',
    rank: 2,
    change: 1,
  },
  {
    id: '3',
    game_name: 'GameZ',
    total_items: 76,
    total_trades: 45,
    total_volume: '123.7',
    rank: 3,
    change: -1,
  },
  {
    id: '4',
    game_name: 'SuperGame',
    total_items: 124,
    total_trades: 34,
    total_volume: '95.2',
    rank: 4,
    change: 0,
  },
  {
    id: '5',
    game_name: 'MetaWorld',
    total_items: 67,
    total_trades: 28,
    total_volume: '78.9',
    rank: 5,
    change: 2,
  },
];

// 더미 유저 랭킹 데이터
const dummyUserRanks: UserRank[] = [
  {
    id: '1',
    user_address: '0xTopTrader1',
    username: 'NFTKing',
    registered_types: 5,
    total_trades: 234,
    total_volume: '1,245.7',
    owned_nfts: 89,
    rank: 1,
    change: 0,
  },
  {
    id: '2',
    user_address: '0xGameMaster2',
    username: 'GameMaster',
    registered_types: 3,
    total_trades: 198,
    total_volume: '987.3',
    owned_nfts: 156,
    rank: 2,
    change: 1,
  },
  {
    id: '3',
    user_address: '0xCollector3',
    username: 'Collector',
    registered_types: 1,
    total_trades: 167,
    total_volume: '876.5',
    owned_nfts: 234,
    rank: 3,
    change: -1,
  },
  {
    id: '4',
    user_address: '0xTrader4',
    registered_types: 2,
    total_trades: 145,
    total_volume: '654.2',
    owned_nfts: 67,
    rank: 4,
    change: 2,
  },
  {
    id: '5',
    user_address: '0xInvestor5',
    username: 'SmartInvestor',
    registered_types: 0,
    total_trades: 123,
    total_volume: '543.8',
    owned_nfts: 45,
    rank: 5,
    change: 0,
  },
];

// Get game rankings
export const getGameRankings = async (): Promise<GameRank[]> => {
  // TODO: Replace with real API call
  // const response = await apiClient.get<ApiResponse<GameRank[]>>('/rankings/games');
  // return response.data.data;
  
  return Promise.resolve(dummyGameRanks);
};

// Get user rankings
export const getUserRankings = async (): Promise<UserRank[]> => {
  // TODO: Replace with real API call
  // const response = await apiClient.get<ApiResponse<UserRank[]>>('/rankings/users');
  // return response.data.data;
  
  return Promise.resolve(dummyUserRanks);
};

// Get user's own rank
export const getUserRank = async (userAddress: string): Promise<UserRank | null> => {
  // TODO: Replace with real API call
  // const response = await apiClient.get<ApiResponse<UserRank>>(`/rankings/users/${userAddress}`);
  // return response.data.data;
  
  const userRank = dummyUserRanks.find(rank => rank.user_address === userAddress);
  return Promise.resolve(userRank || null);
};