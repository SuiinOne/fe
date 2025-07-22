import { useApiQuery } from '../../../shared/hooks/useApi';
import { getGameRankings, getUserRankings, getUserRank } from '../api/rankingApi';

export function useGameRankings() {
  return useApiQuery({
    queryKey: ['game-rankings'],
    queryFn: getGameRankings,
    staleTime: 5 * 60 * 1000, // 5분간 캐시
  });
}

export function useUserRankings() {
  return useApiQuery({
    queryKey: ['user-rankings'],
    queryFn: getUserRankings,
    staleTime: 5 * 60 * 1000, // 5분간 캐시
  });
}

export function useUserRank(userAddress?: string) {
  return useApiQuery({
    queryKey: ['user-rank', userAddress || ''],
    queryFn: () => userAddress ? getUserRank(userAddress) : Promise.resolve(null),
    enabled: !!userAddress,
    staleTime: 5 * 60 * 1000, // 5분간 캐시
  });
}