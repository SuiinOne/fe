import { 
  Card, 
  Flex, 
  Text, 
  Badge, 
  Button, 
  Separator,
  Dialog,
  Tooltip
} from '@radix-ui/themes';
import { 
  useCurrentAccount, 
  useDisconnectWallet,
  ConnectButton
} from '@mysten/dapp-kit';
import { 
  Wallet, 
  Copy, 
  ExternalLink, 
  Power,
  Activity,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { useState } from 'react';

interface WalletStatusProps {
  variant?: 'card' | 'compact' | 'inline';
  showBalance?: boolean;
  showActions?: boolean;
  className?: string;
}

export function WalletStatus({ 
  variant = 'card',
  showBalance = true,
  showActions = true,
  className
}: WalletStatusProps) {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Balance는 임시로 더미 데이터 사용 (실제 구현 시 balance hook 사용)
  const balance = {
    totalBalance: '1500000000' // 1.5 SUI in nanoscale
  };

  const copyAddress = async () => {
    if (currentAccount?.address) {
      await navigator.clipboard.writeText(currentAccount.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string, length: number = 6) => {
    return `${address.slice(0, length)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: string | undefined) => {
    if (!balance) return '0';
    return (Number(balance) / 1e9).toFixed(4);
  };

  // 연결되지 않은 상태
  if (!currentAccount) {
    if (variant === 'compact') {
      return (
        <ConnectButton 
          style={{ 
            fontSize: '14px',
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 150ms ease-in-out'
          }}
        />
      );
    }

    return (
      <Card style={{ padding: '1rem', background: 'var(--card)' }} className={className}>
        <Flex direction="column" align="center" gap="3">
          <Wallet size={32} style={{ color: 'var(--muted-foreground)' }} />
          <Text size="3" style={{ color: 'var(--muted-foreground)', textAlign: 'center' }}>
            지갑을 연결해주세요
          </Text>
          <ConnectButton 
            style={{ 
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 'medium',
              cursor: 'pointer'
            }}
          />
        </Flex>
      </Card>
    );
  }

  // Compact 변형
  if (variant === 'compact') {
    return (
      <Flex align="center" gap="2" className={className}>
        <Badge color="green" variant="soft">
          <Wallet size={12} />
          연결됨
        </Badge>
        <Text 
          size="2" 
          style={{ 
            fontFamily: 'monospace',
            color: 'var(--muted-foreground)'
          }}
        >
          {formatAddress(currentAccount.address)}
        </Text>
        {showBalance && balance && (
          <Text size="2" weight="bold" style={{ color: 'var(--green-11)' }}>
            {formatBalance(balance.totalBalance)} SUI
          </Text>
        )}
      </Flex>
    );
  }

  // Inline 변형
  if (variant === 'inline') {
    return (
      <Flex align="center" gap="3" className={className}>
        <Flex align="center" gap="2">
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--green-9)'
            }}
          />
          <Text size="2" style={{ color: 'var(--foreground)' }}>
            {formatAddress(currentAccount.address, 8)}
          </Text>
        </Flex>
        
        {showBalance && balance && (
          <Badge color="green" variant="soft">
            {formatBalance(balance.totalBalance)} SUI
          </Badge>
        )}

        {showActions && (
          <Flex gap="1">
            <Tooltip content={copied ? '복사됨!' : '주소 복사'}>
              <Button variant="ghost" size="1" onClick={copyAddress}>
                <Copy size={12} />
              </Button>
            </Tooltip>
            <Tooltip content="연결 해제">
              <Button variant="ghost" size="1" onClick={() => disconnect()}>
                <Power size={12} />
              </Button>
            </Tooltip>
          </Flex>
        )}
      </Flex>
    );
  }

  // Card 변형 (기본)
  return (
    <>
      <Card 
        style={{ 
          padding: '1.5rem', 
          background: 'var(--card)',
          border: '1px solid var(--border)',
          transition: 'all 150ms ease-in-out'
        }} 
        className={className}
      >
        <Flex direction="column" gap="4">
          {/* Header */}
          <Flex justify="between" align="center">
            <Flex align="center" gap="2">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--green-9), var(--blue-9))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Wallet size={16} style={{ color: 'white' }} />
              </div>
              <div>
                <Text size="3" weight="bold" style={{ color: 'var(--foreground)' }}>
                  연결된 지갑
                </Text>
                <Badge color="green" variant="soft" size="1">
                  활성
                </Badge>
              </div>
            </Flex>
            
            {showActions && (
              <Button variant="ghost" size="1" onClick={() => disconnect()}>
                <Power size={14} />
              </Button>
            )}
          </Flex>

          {/* Address */}
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">주소</Text>
            <Flex justify="between" align="center">
              <Text 
                size="2" 
                style={{ 
                  fontFamily: 'monospace',
                  color: 'var(--foreground)',
                  background: 'var(--muted)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  flex: 1,
                  marginRight: '8px'
                }}
              >
                {formatAddress(currentAccount.address, 12)}
              </Text>
              <Flex gap="1">
                <Tooltip content={copied ? '복사됨!' : '주소 복사'}>
                  <Button variant="ghost" size="1" onClick={copyAddress}>
                    <Copy size={14} />
                  </Button>
                </Tooltip>
                <Tooltip content="익스플로러에서 보기">
                  <Button 
                    variant="ghost" 
                    size="1"
                    onClick={() => window.open(`https://explorer.sui.io/address/${currentAccount.address}`, '_blank')}
                  >
                    <ExternalLink size={14} />
                  </Button>
                </Tooltip>
              </Flex>
            </Flex>
          </Flex>

          {/* Balance Section */}
          {showBalance && balance && (
            <>
              <Separator />
              <Flex justify="between" align="center">
                <Flex align="center" gap="2">
                  <DollarSign size={16} style={{ color: 'var(--green-11)' }} />
                  <Text size="2" color="gray">잔액</Text>
                </Flex>
                <Text size="4" weight="bold" style={{ color: 'var(--green-11)' }}>
                  {formatBalance(balance.totalBalance)} SUI
                </Text>
              </Flex>
            </>
          )}

          {/* Quick Stats */}
          <Flex justify="between" gap="3">
            <Button
              variant="soft"
              size="2"
              style={{ flex: 1 }}
              onClick={() => setShowDetails(true)}
            >
              <Activity size={14} />
              활동 내역
            </Button>
            <Button
              variant="soft"
              size="2"
              style={{ flex: 1 }}
            >
              <TrendingUp size={14} />
              포트폴리오
            </Button>
          </Flex>
        </Flex>
      </Card>

      {/* Details Modal */}
      <Dialog.Root open={showDetails} onOpenChange={setShowDetails}>
        <Dialog.Content style={{ maxWidth: '500px' }}>
          <Dialog.Title>지갑 상세 정보</Dialog.Title>
          <Dialog.Description>
            연결된 지갑의 상세 정보와 활동 내역을 확인할 수 있습니다.
          </Dialog.Description>

          <Flex direction="column" gap="4" my="4">
            <div>
              <Text size="2" color="gray">지갑 주소</Text>
              <Text 
                size="3" 
                style={{ 
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                  background: 'var(--muted)',
                  padding: '8px',
                  borderRadius: '6px',
                  marginTop: '4px'
                }}
              >
                {currentAccount.address}
              </Text>
            </div>

            {balance && (
              <div>
                <Text size="2" color="gray">상세 잔액</Text>
                <Flex justify="between" mt="2">
                  <Text>총 잔액:</Text>
                  <Text weight="bold">{formatBalance(balance.totalBalance)} SUI</Text>
                </Flex>
              </div>
            )}

            <Text size="2" color="gray">
              최근 활동 내역이나 NFT 보유 현황 등을 여기에 표시할 수 있습니다.
            </Text>
          </Flex>

          <Flex justify="end" gap="3">
            <Dialog.Close>
              <Button variant="soft">닫기</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}