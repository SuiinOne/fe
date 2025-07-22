import { useState } from 'react';
import { Container, Flex, Heading, Text, Tabs, Badge } from '@radix-ui/themes';
import { Plus, List } from 'lucide-react';
import { ItemRegistrationForm } from '../components/ItemRegistrationForm';
import { RegisteredTypesTable } from '../components/RegisteredTypesTable';
import { useRegisteredTypes } from '../hooks/useItemRegistration';

export function ItemRegistrationPage() {
  const [activeTab, setActiveTab] = useState('register');
  const { data: types } = useRegisteredTypes();

  return (
    <Container style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <Flex direction="column" gap="4">
        {/* 페이지 헤더 */}
        <Flex justify="between" align="center" style={{ padding: '1rem 0' }}>
          <Flex align="center" gap="3">
            <Plus size={32} style={{ color: 'var(--blue-11)' }} />
            <Flex direction="column" gap="1">
              <Heading size="6" style={{ color: 'white' }}>
                아이템 타입 등록
              </Heading>
              <Text size="3" color="gray">
                게임 내 아이템을 NFT로 만들기 위한 구조체 타입을 등록하세요
              </Text>
            </Flex>
          </Flex>
          <Badge color="blue" variant="soft">
            총 {types?.length || 0}개 타입 등록됨
          </Badge>
        </Flex>

        {/* 탭 */}
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Trigger value="register">
              <Flex align="center" gap="2">
                <Plus size={16} />
                새 타입 등록
              </Flex>
            </Tabs.Trigger>
            <Tabs.Trigger value="list">
              <Flex align="center" gap="2">
                <List size={16} />
                등록된 타입 목록
                {types && types.length > 0 && (
                  <Badge color="blue" size="1">
                    {types.length}
                  </Badge>
                )}
              </Flex>
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="register" style={{ marginTop: '2rem' }}>
            <ItemRegistrationForm />
          </Tabs.Content>

          <Tabs.Content value="list" style={{ marginTop: '2rem' }}>
            <Flex direction="column" gap="3">
              <Text size="4" weight="bold" style={{ color: 'white' }}>
                등록된 아이템 타입
              </Text>
              <Text size="2" color="gray">
                현재 플랫폼에 등록된 모든 게임 아이템 타입을 확인할 수 있습니다
              </Text>
              <RegisteredTypesTable />
            </Flex>
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </Container>
  );
}