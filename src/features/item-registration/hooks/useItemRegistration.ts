import { useMutation, useQuery } from '@tanstack/react-query';
import { registerItemType, getRegisteredTypes, ItemType, RegisterTypeRequest, RegisterTypeResponse } from '../api/itemTypeApi';
import { useCurrentAccount } from '@mysten/dapp-kit';

export const useRegisterItemType = () => {
  return useMutation<RegisterTypeResponse, Error, RegisterTypeRequest>({
    mutationFn: registerItemType,
    onSuccess: (data) => {
      console.log('Item type registered successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to register item type:', error);
    },
  });
};

export const useRegisteredTypes = () => {
  return useQuery<ItemType[], Error>({
    queryKey: ['registeredTypes'],
    queryFn: getRegisteredTypes,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useValidateOwnership = () => {
  const currentAccount = useCurrentAccount();
  
  const validateOwner = (ownerAddress: string) => {
    if (!currentAccount) {
      return { isValid: false, error: '지갑이 연결되지 않았습니다' };
    }
    
    if (currentAccount.address !== ownerAddress) {
      return { isValid: false, error: '소유자 주소가 현재 연결된 지갑과 일치하지 않습니다' };
    }
    
    return { isValid: true, error: null };
  };
  
  return { validateOwner, currentAccount };
};