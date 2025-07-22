export interface RegisterTypeRequest {
  module_address: string;
  type_name: string;
  type: string;
  url: string;
  owner: string;
  password: string;
}

export interface RegisterTypeResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const registerItemType = async (request: RegisterTypeRequest): Promise<RegisterTypeResponse> => {
  try {
    const response = await fetch('/api/register-type', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || '등록에 실패했습니다');
    }

    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('네트워크 오류가 발생했습니다');
  }
};

export interface ItemType {
  id: string;
  module_address: string;
  type_name: string;
  type: string;
  url: string;
  created_at: string;
  game_name?: string;
  total_items: number;
}

export const getRegisteredTypes = async (): Promise<ItemType[]> => {
  return [
    {
      id: '1',
      module_address: '0x1234...abcd',
      type_name: 'GameX::Sword',
      type: 'struct Sword { id: ID, name: String, damage: u64 }',
      url: 'https://gamex.example.com',
      created_at: '2024-12-01T10:00:00Z',
      game_name: 'GameX',
      total_items: 157
    },
    {
      id: '2', 
      module_address: '0x5678...efgh',
      type_name: 'RPGWorld::Armor',
      type: 'struct Armor { id: ID, name: String, defense: u64, durability: u32 }',
      url: 'https://rpgworld.example.com',
      created_at: '2024-12-02T14:30:00Z',
      game_name: 'RPG World',
      total_items: 89
    },
    {
      id: '3',
      module_address: '0x9abc...ijkl', 
      type_name: 'MagicQuest::Potion',
      type: 'struct Potion { id: ID, effect: String, potency: u8 }',
      url: 'https://magicquest.example.com',
      created_at: '2024-12-03T09:15:00Z',
      game_name: 'Magic Quest',
      total_items: 234
    }
  ];
};