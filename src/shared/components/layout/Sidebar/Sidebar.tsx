import { Flex, Text, Button, Separator } from "@radix-ui/themes";
import { 
  Wallet, 
  Settings, 
  User, 
  Package, 
  Trophy,
  ChevronLeft,
  ChevronRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCurrentAccount, ConnectButton } from "@mysten/dapp-kit";
import { useSidebarContext } from "../../../contexts/SidebarContext";

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebarContext();
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();

  const sidebarWidth = isCollapsed ? "60px" : "240px";

  const menuItems = [
    {
      icon: Wallet,
      label: "지갑 연결",
      action: "wallet",
      disabled: !currentAccount,
    },
    {
      icon: Trophy,
      label: "랭킹",
      action: "ranking",
    },
    {
      icon: Settings,
      label: "환경 설정",
      action: "settings",
    },
    {
      icon: User,
      label: "계정 설정",
      action: "profile",
      disabled: !currentAccount,
    },
  ];

  const handleMenuClick = (action: string) => {
    switch (action) {
      case "wallet":
        // 지갑 관리 페이지로 이동
        break;
      case "ranking":
        navigate("/ranking");
        break;
      case "settings":
        // 환경 설정 모달 열기
        break;
      case "profile":
        // 계정 설정 모달 열기
        break;
      case "register-type":
        navigate("/register-type");
        break;
    }
  };

  return (
    <div
      style={{
        width: sidebarWidth,
        height: "calc(100vh - 60px)",
        background: "var(--card)",
        borderRight: "1px solid var(--border)",
        position: "fixed",
        left: 0,
        top: "60px",
        transition: "width 0.3s ease, background-color 150ms ease-in-out, border-color 150ms ease-in-out",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* 토글 버튼 */}
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Button
          variant="ghost"
          size="2"
          onClick={toggleSidebar}
          style={{
            width: "100%",
            justifyContent: isCollapsed ? "center" : "flex-start",
          }}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!isCollapsed && <Text style={{ marginLeft: "8px" }}>메뉴</Text>}
        </Button>
      </div>

      {/* 지갑 연결 상태 */}
      <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
        {!isCollapsed && (
          <Text size="2" color="gray" style={{ marginBottom: "8px" }}>
            지갑 상태
          </Text>
        )}
        {currentAccount ? (
          <Flex direction="column" gap="2">
            {!isCollapsed && (
              <>
                <Text size="1" style={{ color: "var(--green-11)" }}>
                  연결됨
                </Text>
                <Text 
                  size="1" 
                  style={{ 
                    fontFamily: "monospace",
                    color: "var(--muted-foreground)",
                    wordBreak: "break-all" 
                  }}
                >
                  {currentAccount.address.slice(0, 6)}...{currentAccount.address.slice(-4)}
                </Text>
              </>
            )}
          </Flex>
        ) : (
          <Flex direction="column" align="center" gap="2">
            {!isCollapsed && (
              <Text size="1" color="gray">
                지갑을 연결하세요
              </Text>
            )}
            <ConnectButton 
              style={{ 
                fontSize: "12px",
                padding: isCollapsed ? "4px" : "6px 12px",
              }} 
            />
          </Flex>
        )}
      </div>

      {/* 메인 메뉴 */}
      <Flex direction="column" style={{ flex: 1, padding: "1rem 0" }}>
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            size="2"
            onClick={() => handleMenuClick(item.action)}
            disabled={item.disabled}
            style={{
              justifyContent: isCollapsed ? "center" : "flex-start",
              padding: isCollapsed ? "8px" : "8px 16px",
              margin: "2px 8px",
              color: item.disabled ? "var(--muted-foreground)" : "var(--foreground)",
              transition: "all 150ms ease-in-out",
            }}
          >
            <item.icon size={20} />
            {!isCollapsed && (
              <Text style={{ marginLeft: "12px" }}>{item.label}</Text>
            )}
          </Button>
        ))}
      </Flex>

      <Separator style={{ margin: "0 1rem" }} />

      {/* 하단 고정 메뉴 */}
      <div style={{ padding: "1rem" }}>
        <Button
          variant="solid"
          size="2"
          onClick={() => handleMenuClick("register-type")}
          style={{
            width: "100%",
            justifyContent: isCollapsed ? "center" : "flex-start",
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "1px solid var(--primary)",
            transition: "all 150ms ease-in-out",
          }}
        >
          <Package size={20} />
          {!isCollapsed && (
            <Text style={{ marginLeft: "12px" }}>아이템 타입 등록</Text>
          )}
        </Button>
        {!isCollapsed && (
          <Text size="1" color="gray" style={{ marginTop: "4px", textAlign: "center" }}>
            게임 개발자 전용
          </Text>
        )}
      </div>
    </div>
  );
}