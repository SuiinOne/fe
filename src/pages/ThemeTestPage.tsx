import { useState } from 'react';
import { Container, Flex, Heading, Text, Card, Badge, Button } from '@radix-ui/themes';
import { Sun, Moon, Star, Heart, Settings, Search } from 'lucide-react';
import { useTheme } from '../shared/contexts/ThemeContext';
import { DarkModeToggle } from '../shared/components/ui/DarkModeToggle';
import { Button as CustomButton } from '../shared/components/ui/Button';

export function ThemeTestPage() {
  const { theme } = useTheme();
  const [counter, setCounter] = useState(0);

  return (
    <Container style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <Flex direction="column" gap="6">
        {/* Header */}
        <Flex justify="between" align="center">
          <Heading size="8" style={{ color: 'var(--foreground)' }}>
            테마 테스트 페이지
          </Heading>
          <Flex align="center" gap="3">
            <Text size="2" style={{ color: 'var(--muted-foreground)' }}>
              현재 테마: {theme}
            </Text>
            <DarkModeToggle />
          </Flex>
        </Flex>

        {/* Color Palette */}
        <Card style={{ padding: '1.5rem', background: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}>
          <Heading size="5" mb="4" style={{ color: 'hsl(var(--card-foreground))' }}>
            색상 팔레트
          </Heading>
          <Flex direction="column" gap="4">
            <Flex gap="3" wrap="wrap">
              <div style={{ 
                width: '120px', 
                height: '80px', 
                background: 'hsl(var(--primary))', 
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'hsl(var(--primary-foreground))',
                fontSize: '11px',
                fontWeight: 'bold',
                border: '1px solid hsl(var(--border))',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div>Primary</div>
                <div style={{ fontSize: '10px', opacity: 0.8 }}>#6C8EFF</div>
              </div>
              <div style={{ 
                width: '120px', 
                height: '80px', 
                background: 'hsl(var(--secondary))', 
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'hsl(var(--secondary-foreground))',
                fontSize: '11px',
                fontWeight: 'bold',
                border: '1px solid hsl(var(--border))',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div>Secondary</div>
                <div style={{ fontSize: '10px', opacity: 0.8 }}>#3DE9E3</div>
              </div>
              <div style={{ 
                width: '120px', 
                height: '80px', 
                background: 'hsl(var(--accent))', 
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'hsl(var(--accent-foreground))',
                fontSize: '11px',
                fontWeight: 'bold',
                border: '1px solid hsl(var(--border))',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div>Accent</div>
                <div style={{ fontSize: '10px', opacity: 0.8 }}>Light</div>
              </div>
              <div style={{ 
                width: '120px', 
                height: '80px', 
                background: 'hsl(var(--muted))', 
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'hsl(var(--muted-foreground))',
                fontSize: '11px',
                fontWeight: 'bold',
                border: '1px solid hsl(var(--border))',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div>Muted</div>
                <div style={{ fontSize: '10px', opacity: 0.8 }}>Gray</div>
              </div>
            </Flex>

            {/* Background Colors */}
            <Flex gap="3" wrap="wrap" style={{ marginTop: '1rem' }}>
              <div style={{ 
                width: '120px', 
                height: '80px', 
                background: 'hsl(var(--background))', 
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'hsl(var(--foreground))',
                fontSize: '11px',
                fontWeight: 'bold',
                border: '2px solid hsl(var(--border))',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div>Background</div>
                <div style={{ fontSize: '10px', opacity: 0.8 }}>Main</div>
              </div>
              <div style={{ 
                width: '120px', 
                height: '80px', 
                background: 'hsl(var(--card))', 
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'hsl(var(--card-foreground))',
                fontSize: '11px',
                fontWeight: 'bold',
                border: '2px solid hsl(var(--border))',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div>Card</div>
                <div style={{ fontSize: '10px', opacity: 0.8 }}>Surface</div>
              </div>
              <div style={{ 
                width: '120px', 
                height: '80px', 
                background: 'hsl(var(--destructive))', 
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'hsl(var(--destructive-foreground))',
                fontSize: '11px',
                fontWeight: 'bold',
                border: '1px solid hsl(var(--border))',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div>Destructive</div>
                <div style={{ fontSize: '10px', opacity: 0.8 }}>Error</div>
              </div>
            </Flex>
          </Flex>
        </Card>

        {/* Interactive Components */}
        <Card style={{ padding: '1.5rem', background: 'var(--card)' }}>
          <Heading size="5" mb="4" style={{ color: 'var(--card-foreground)' }}>
            인터랙티브 컴포넌트
          </Heading>
          <Flex direction="column" gap="4">
            {/* Radix UI Buttons */}
            <Flex gap="3" wrap="wrap">
              <Button variant="solid" size="2">
                <Star size={16} />
                Solid Button
              </Button>
              <Button variant="soft" size="2">
                <Heart size={16} />
                Soft Button
              </Button>
              <Button variant="outline" size="2">
                <Settings size={16} />
                Outline Button
              </Button>
              <Button variant="ghost" size="2">
                <Search size={16} />
                Ghost Button
              </Button>
            </Flex>

            {/* Custom Buttons */}
            <Flex gap="3" wrap="wrap">
              <CustomButton variant="default" size="default">
                Default Custom
              </CustomButton>
              <CustomButton variant="secondary" size="default">
                Secondary Custom
              </CustomButton>
              <CustomButton variant="outline" size="default">
                Outline Custom
              </CustomButton>
              <CustomButton variant="ghost" size="default">
                Ghost Custom
              </CustomButton>
            </Flex>

            {/* Counter Test */}
            <Flex align="center" gap="3">
              <Text size="3" style={{ color: 'var(--foreground)' }}>
                카운터: {counter}
              </Text>
              <Button 
                variant="soft" 
                size="1" 
                onClick={() => setCounter(c => c + 1)}
              >
                +1
              </Button>
              <Button 
                variant="soft" 
                size="1" 
                onClick={() => setCounter(c => c - 1)}
              >
                -1
              </Button>
              <Button 
                variant="outline" 
                size="1" 
                onClick={() => setCounter(0)}
              >
                Reset
              </Button>
            </Flex>
          </Flex>
        </Card>

        {/* Cards & Badges */}
        <Card style={{ padding: '1.5rem', background: 'var(--card)' }}>
          <Heading size="5" mb="4" style={{ color: 'var(--card-foreground)' }}>
            카드 & 뱃지
          </Heading>
          <Flex direction="column" gap="4">
            <Flex gap="3" wrap="wrap">
              <Badge color="blue" size="2">Blue Badge</Badge>
              <Badge color="green" size="2">Green Badge</Badge>
              <Badge color="orange" size="2">Orange Badge</Badge>
              <Badge color="red" size="2">Red Badge</Badge>
              <Badge color="purple" size="2">Purple Badge</Badge>
            </Flex>

            <Flex gap="4" wrap="wrap">
              <Card 
                style={{ 
                  padding: '1rem', 
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'all 150ms ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}
              >
                <Text size="2" style={{ color: 'var(--card-foreground)' }}>
                  호버 효과가 있는 카드
                </Text>
              </Card>

              <Card style={{ padding: '1rem', background: 'var(--muted)' }}>
                <Text size="2" style={{ color: 'var(--muted-foreground)' }}>
                  Muted 배경 카드
                </Text>
              </Card>
            </Flex>
          </Flex>
        </Card>

        {/* Typography */}
        <Card style={{ padding: '1.5rem', background: 'var(--card)' }}>
          <Heading size="5" mb="4" style={{ color: 'var(--card-foreground)' }}>
            타이포그래피
          </Heading>
          <Flex direction="column" gap="3">
            <Heading size="6" style={{ color: 'var(--foreground)' }}>
              Heading 6 - 메인 제목
            </Heading>
            <Heading size="4" style={{ color: 'var(--foreground)' }}>
              Heading 4 - 서브 제목
            </Heading>
            <Text size="3" style={{ color: 'var(--foreground)' }}>
              일반 텍스트 - 기본 텍스트 스타일입니다.
            </Text>
            <Text size="2" style={{ color: 'var(--muted-foreground)' }}>
              보조 텍스트 - 덜 중요한 정보를 표시합니다.
            </Text>
            <Text size="1" style={{ color: 'var(--muted-foreground)' }}>
              작은 텍스트 - 캡션이나 라벨에 사용됩니다.
            </Text>
          </Flex>
        </Card>

        {/* Contrast Test */}
        <Card style={{ padding: '1.5rem', background: 'hsl(var(--card))' }}>
          <Heading size="5" mb="4" style={{ color: 'hsl(var(--card-foreground))' }}>
            대비 및 가독성 테스트
          </Heading>
          <Flex direction="column" gap="3">
            <div style={{ 
              padding: '1rem',
              background: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              borderRadius: '8px',
              border: '1px solid hsl(var(--border))'
            }}>
              <Text size="3" weight="bold">Primary 배경에 Primary Foreground 텍스트</Text>
              <Text size="2">이 텍스트가 명확하게 읽힐 수 있어야 합니다.</Text>
            </div>
            
            <div style={{ 
              padding: '1rem',
              background: 'hsl(var(--secondary))',
              color: 'hsl(var(--secondary-foreground))',
              borderRadius: '8px',
              border: '1px solid hsl(var(--border))'
            }}>
              <Text size="3" weight="bold">Secondary 배경에 Secondary Foreground 텍스트</Text>
              <Text size="2">민트 컬러와 텍스트의 대비를 확인하세요.</Text>
            </div>

            <div style={{ 
              padding: '1rem',
              background: 'hsl(var(--muted))',
              color: 'hsl(var(--muted-foreground))',
              borderRadius: '8px',
              border: '1px solid hsl(var(--border))'
            }}>
              <Text size="3" weight="bold">Muted 배경에 Muted Foreground 텍스트</Text>
              <Text size="2">회색 배경에서의 텍스트 가독성을 확인하세요.</Text>
            </div>

            <div style={{ 
              padding: '1rem',
              background: 'hsl(var(--accent))',
              color: 'hsl(var(--accent-foreground))',
              borderRadius: '8px',
              border: '1px solid hsl(var(--border))'
            }}>
              <Text size="3" weight="bold">Accent 배경에 Accent Foreground 텍스트</Text>
              <Text size="2">강조 영역에서의 텍스트 가독성을 확인하세요.</Text>
            </div>
          </Flex>
        </Card>

        {/* Current Theme Info */}
        <Card style={{ padding: '1.5rem', background: 'hsl(var(--card))' }}>
          <Heading size="5" mb="4" style={{ color: 'hsl(var(--card-foreground))' }}>
            현재 테마 정보
          </Heading>
          <Flex direction="column" gap="2">
            <Text size="3" style={{ color: 'hsl(var(--foreground))' }}>
              <strong>활성 테마:</strong> {theme === 'light' ? '라이트 모드' : '다크 모드'}
            </Text>
            <Text size="2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {theme === 'light' 
                ? '밝은 배경과 어두운 텍스트로 주간 사용에 최적화' 
                : '어두운 배경과 밝은 텍스트로 야간 사용에 최적화'
              }
            </Text>
            <Text size="2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              배경 그라데이션: {theme === 'light' 
                ? '연한 파란색 그라데이션 (#F0F4FF → #D6E4FF → #B1C8FF)' 
                : '어두운 회색 그라데이션 (#111827 → #1E293B)'
              }
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
}