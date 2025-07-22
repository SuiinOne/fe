import { ConnectButton } from "@mysten/dapp-kit";
import { Flex, Heading } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { NotificationBell } from "../../features/notifications/components/NotificationBell";
import { DarkModeToggle } from "../../shared/components/ui/DarkModeToggle";
import { useTheme } from "../../shared/contexts/ThemeContext";

export function Header() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const headerStyles = {
    light: {
      background: 'hsl(var(--card))',
      borderColor: 'hsl(var(--border))',
      boxShadow: 'var(--shadow)',
      color: 'hsl(var(--card-foreground))',
    },
    dark: {
      background: 'hsl(var(--card))',
      borderColor: 'hsl(var(--border))',
      boxShadow: 'var(--shadow-lg)',
      color: 'hsl(var(--card-foreground))',
    }
  };

  const buttonStyles = {
    light: {
      background: 'hsl(var(--accent))',
      color: 'hsl(var(--accent-foreground))',
      border: '1px solid hsl(var(--border))',
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer',
      padding: '8px 16px',
      borderRadius: 8,
      transition: 'all 150ms ease-in-out',
      boxShadow: 'var(--shadow-sm)',
    },
    dark: {
      background: 'hsl(var(--accent))',
      color: 'hsl(var(--accent-foreground))',
      border: '1px solid hsl(var(--border))',
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer',
      padding: '8px 16px',
      borderRadius: 8,
      transition: 'all 150ms ease-in-out',
      boxShadow: 'var(--shadow-sm)',
    }
  };

  const currentHeaderStyle = headerStyles[theme];
  const currentButtonStyle = buttonStyles[theme];

  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      ...currentHeaderStyle,
      transition: 'all 150ms ease-in-out'
    }}>
      <Flex
        px="4"
        py="3"
        justify="between"
        align="center"
        style={{
          borderBottom: `1px solid ${currentHeaderStyle.borderColor}`,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <Flex align="center" gap="4">
          <Heading 
            size="5"
            style={{ 
              cursor: 'pointer', 
              color: 'hsl(var(--foreground))',
              transition: 'color 150ms ease-in-out'
            }} 
            onClick={() => navigate('/')}
          >
            SuiinOne
          </Heading>
          
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              style={currentButtonStyle}
              onClick={() => navigate('/')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = currentButtonStyle.boxShadow;
              }}
            >
              마켓플레이스
            </button>
            <button
              style={currentButtonStyle}
              onClick={() => navigate('/my-nfts')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = currentButtonStyle.boxShadow;
              }}
            >
              내 NFT
            </button>
            <button
              style={currentButtonStyle}
              onClick={() => navigate('/favorites')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = currentButtonStyle.boxShadow;
              }}
            >
              좋아요 모아보기
            </button>
            <button
              style={currentButtonStyle}
              onClick={() => navigate('/theme-test')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = currentButtonStyle.boxShadow;
              }}
            >
              테마 테스트
            </button>
          </nav>
        </Flex>
        
        <Flex align="center" gap="3" style={{ marginLeft: 'auto' }}>
          <NotificationBell />
          <DarkModeToggle />
          <ConnectButton 
            style={{ 
              background: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              borderRadius: 8, 
              boxShadow: 'var(--shadow-sm)', 
              fontWeight: 600,
              border: '1px solid hsl(var(--primary))',
              transition: 'all 150ms ease-in-out'
            }} 
          />
        </Flex>
      </Flex>
    </header>
  );
}
