import { useState } from 'react';
import { Container, Flex, Text, TextField, Button, Card, Badge, Callout } from '@radix-ui/themes';
import { AlertCircle, CheckCircle, Loader2, Info, ExternalLink } from 'lucide-react';
import { useRegisterItemType, useValidateOwnership } from '../../hooks/useItemRegistration';

interface FormData {
  module_address: string;
  type_name: string;
  type: string;
  url: string;
  owner: string;
  password: string;
}

const initialFormData: FormData = {
  module_address: '',
  type_name: '',
  type: '',
  url: '',
  owner: '',
  password: '',
};

export function ItemRegistrationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  
  const registerMutation = useRegisterItemType();
  const { validateOwner, currentAccount } = useValidateOwnership();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAutoFillOwner = () => {
    if (currentAccount?.address) {
      setFormData(prev => ({ ...prev, owner: currentAccount.address }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const ownerValidation = validateOwner(formData.owner);
    if (!ownerValidation.isValid) {
      alert(ownerValidation.error);
      return;
    }

    registerMutation.mutate(formData, {
      onSuccess: () => {
        setFormData(initialFormData);
      }
    });
  };

  return (
    <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Flex direction="column" gap="4">
        {/* 헤더 */}
        <Flex direction="column" gap="2" style={{ marginBottom: '1rem' }}>
          <Text size="6" weight="bold" style={{ color: 'white' }}>
            아이템 타입 등록
          </Text>
          <Text size="3" color="gray">
            게임 내 아이템을 NFT로 등록하기 위한 구조체 타입을 등록합니다
          </Text>
        </Flex>

        {/* 안내 정보 */}
        <Callout.Root color="blue">
          <Callout.Icon>
            <Info size={16} />
          </Callout.Icon>
          <Callout.Text>
            등록된 타입은 게임 개발자가 해당 구조체 기반의 NFT를 생성할 때 사용됩니다. 
            정확한 모듈 주소와 타입 정보를 입력해주세요.
          </Callout.Text>
        </Callout.Root>

        {/* 등록 폼 */}
        <Card style={{ background: 'var(--gray-3)', padding: '1.5rem' }}>
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              {/* 게임 Dapp 주소 */}
              <Flex direction="column" gap="2">
                <Text size="3" weight="medium" style={{ color: 'white' }}>
                  게임 Dapp 주소 *
                </Text>
                <TextField.Root
                  placeholder="0x1234...abcd (게임 패키지 주소)"
                  value={formData.module_address}
                  onChange={(e) => handleInputChange('module_address', e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
                <Text size="2" color="gray">
                  게임이 배포된 Move 패키지의 주소를 입력하세요
                </Text>
              </Flex>

              {/* 타입 이름 */}
              <Flex direction="column" gap="2">
                <Text size="3" weight="medium" style={{ color: 'white' }}>
                  타입 이름 *
                </Text>
                <TextField.Root
                  placeholder="예: GameX::Sword, RPGWorld::Armor"
                  value={formData.type_name}
                  onChange={(e) => handleInputChange('type_name', e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
                <Text size="2" color="gray">
                  모듈명::구조체명 형태로 입력하세요
                </Text>
              </Flex>

              {/* 타입 구조 */}
              <Flex direction="column" gap="2">
                <Text size="3" weight="medium" style={{ color: 'white' }}>
                  타입 구조 *
                </Text>
                <TextField.Root
                  placeholder="struct Sword { id: ID, name: String, damage: u64 }"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
                <Text size="2" color="gray">
                  Move 언어의 구조체 정의를 입력하세요
                </Text>
              </Flex>

              {/* 게임 링크 */}
              <Flex direction="column" gap="2">
                <Text size="3" weight="medium" style={{ color: 'white' }}>
                  게임 링크 *
                </Text>
                <Flex gap="2" align="center">
                  <TextField.Root
                    placeholder="https://your-game.com"
                    value={formData.url}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    required
                    style={{ flex: 1 }}
                  />
                  {formData.url && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="2"
                      onClick={() => window.open(formData.url, '_blank')}
                    >
                      <ExternalLink size={14} />
                    </Button>
                  )}
                </Flex>
              </Flex>

              {/* 실행자 주소 */}
              <Flex direction="column" gap="2">
                <Flex justify="between" align="center">
                  <Text size="3" weight="medium" style={{ color: 'white' }}>
                    실행자 주소 *
                  </Text>
                  {currentAccount && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="1"
                      onClick={handleAutoFillOwner}
                    >
                      현재 지갑 주소 사용
                    </Button>
                  )}
                </Flex>
                <TextField.Root
                  placeholder="실행할 지갑 주소"
                  value={formData.owner}
                  onChange={(e) => handleInputChange('owner', e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
                {currentAccount && (
                  <Flex align="center" gap="2">
                    <Badge color={formData.owner === currentAccount.address ? 'green' : 'yellow'}>
                      {formData.owner === currentAccount.address ? '연결된 지갑' : '다른 주소'}
                    </Badge>
                    {formData.owner !== currentAccount.address && (
                      <Text size="2" color="orange">
                        현재 연결된 지갑과 다른 주소입니다
                      </Text>
                    )}
                  </Flex>
                )}
              </Flex>

              {/* 비밀번호 */}
              <Flex direction="column" gap="2">
                <Text size="3" weight="medium" style={{ color: 'white' }}>
                  비밀번호 *
                </Text>
                <TextField.Root
                  type={showPassword ? 'text' : 'password'}
                  placeholder="등록 확인용 비밀번호"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '숨기기' : '보이기'}
                </Button>
              </Flex>

              {/* 등록 버튼 */}
              <Button
                type="submit"
                size="3"
                style={{ marginTop: '1rem' }}
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <Flex align="center" gap="2">
                    <Loader2 size={16} className="animate-spin" />
                    등록 중...
                  </Flex>
                ) : (
                  '타입 등록하기'
                )}
              </Button>

              {/* 결과 메시지 */}
              {registerMutation.isSuccess && (
                <Callout.Root color="green">
                  <Callout.Icon>
                    <CheckCircle size={16} />
                  </Callout.Icon>
                  <Callout.Text>
                    아이템 타입이 성공적으로 등록되었습니다!
                  </Callout.Text>
                </Callout.Root>
              )}

              {registerMutation.isError && (
                <Callout.Root color="red">
                  <Callout.Icon>
                    <AlertCircle size={16} />
                  </Callout.Icon>
                  <Callout.Text>
                    등록 실패: {registerMutation.error?.message}
                  </Callout.Text>
                </Callout.Root>
              )}
            </Flex>
          </form>
        </Card>
      </Flex>
    </Container>
  );
}