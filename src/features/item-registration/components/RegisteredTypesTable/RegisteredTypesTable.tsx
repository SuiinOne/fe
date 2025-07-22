import { Table, Text, Badge, Flex, Button } from '@radix-ui/themes';
import { ExternalLink, Calendar } from 'lucide-react';
import { useRegisteredTypes } from '../../hooks/useItemRegistration';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatAddress = (address: string) => {
  return `${address.slice(0, 8)}...${address.slice(-6)}`;
};

export function RegisteredTypesTable() {
  const { data: types, isLoading, error } = useRegisteredTypes();

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Text style={{ color: 'white' }}>등록된 타입을 불러오는 중...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Text style={{ color: 'red' }}>타입 정보를 불러오는데 실패했습니다</Text>
      </div>
    );
  }

  if (!types || types.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Text style={{ color: 'gray' }}>등록된 아이템 타입이 없습니다</Text>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--gray-3)', borderRadius: '8px', overflow: 'hidden' }}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>게임명</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>타입명</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>모듈 주소</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>아이템 수</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>등록일</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>링크</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {types.map((type) => (
            <Table.Row key={type.id}>
              <Table.Cell>
                <Flex direction="column" gap="1">
                  <Text size="3" weight="bold" style={{ color: 'white' }}>
                    {type.game_name || 'Unknown Game'}
                  </Text>
                  <Text size="2" style={{ color: 'var(--gray-11)' }}>
                    {type.type_name.split('::')[0]}
                  </Text>
                </Flex>
              </Table.Cell>
              
              <Table.Cell>
                <Flex direction="column" gap="1">
                  <Text size="3" style={{ color: 'var(--blue-11)' }}>
                    {type.type_name.split('::')[1] || type.type_name}
                  </Text>
                  <Badge color="purple" size="1">
                    Struct
                  </Badge>
                </Flex>
              </Table.Cell>
              
              <Table.Cell>
                <Text size="2" style={{ 
                  color: 'var(--gray-11)', 
                  fontFamily: 'monospace' 
                }}>
                  {formatAddress(type.module_address)}
                </Text>
              </Table.Cell>
              
              <Table.Cell>
                <Badge color="green" variant="soft">
                  {type.total_items}개
                </Badge>
              </Table.Cell>
              
              <Table.Cell>
                <Flex align="center" gap="2">
                  <Calendar size={14} color="gray" />
                  <Text size="2" style={{ color: 'var(--gray-11)' }}>
                    {formatDate(type.created_at)}
                  </Text>
                </Flex>
              </Table.Cell>
              
              <Table.Cell>
                <Button
                  size="1"
                  variant="ghost"
                  onClick={() => window.open(type.url, '_blank')}
                >
                  <ExternalLink size={14} />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}