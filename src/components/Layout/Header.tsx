import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#61b6fbff', boxShadow: '0 2px 16px #61b6fb44' }}>
      <Flex
        px="4"
        py="2"
        justify="between"
        align="center"
        style={{
          borderBottom: "1px solid #aee6ff",
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <Flex align="center" gap="4">
          <Heading style={{ cursor: 'pointer', color: '#fff', textShadow: '0 2px 8px #aee6ff' }} onClick={() => navigate('/')}>SuiinOne</Heading>
          <button
            style={{
              background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', fontSize: 16, fontWeight: 500,
              cursor: 'pointer', padding: '6px 16px', borderRadius: 8, marginLeft: 8,
              transition: 'background 0.2s',
              boxShadow: '0 1px 4px #aee6ff55',
            }}
            onClick={() => navigate('/')}
          >
            홈
          </button>
          <button
            style={{
              background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', fontSize: 16, fontWeight: 500,
              cursor: 'pointer', padding: '6px 16px', borderRadius: 8, marginLeft: 8,
              transition: 'background 0.2s',
              boxShadow: '0 1px 4px #aee6ff55',
            }}
            onClick={() => navigate('/register-type')}
          >
            게임 아이템 타입 등록
          </button>
        </Flex>
        <Box style={{ marginLeft: 'auto' }}>
          <ConnectButton style={{ background: '#fff', color: '#61b6fbff', borderRadius: 8, boxShadow: '0 2px 8px #aee6ff55', fontWeight: 700 }} />
        </Box>
      </Flex>
    </header>
  );
}
