import { Container } from "@radix-ui/themes";
import { Header } from "./components/Layout/Header";
import { Sidebar } from "./shared/components/layout/Sidebar";
import { SidebarProvider, useSidebarContext } from "./shared/contexts/SidebarContext";
import AppRouter from "./routes/AppRouter";

function AppContent() {
  const { isCollapsed } = useSidebarContext();
  const sidebarWidth = isCollapsed ? 60 : 240;

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to bottom, #F0F4FF 0%, #D6E4FF 50%, #B1C8FF 100%)', // CLAUDE.md 라이트 모드 그라데이션
        color: '#0F172A', // 본문 텍스트
      }}
      className="dark:bg-gradient-to-b dark:from-[#111827] dark:to-[#1E293B] dark:text-[#F8FAFC]"
    >
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar />
        <Container
          style={{
            minHeight: 'calc(100vh - 60px)',
            marginLeft: `${sidebarWidth}px`,
            transition: 'margin-left 0.3s ease',
            flex: 1,
            padding: '2rem',
            maxWidth: 'none',
            background: '#FAFBFF', // 카드 배경 (라이트)
            color: '#0F172A', // 본문 텍스트 (라이트)
          }}
          className="dark:bg-[#273249] dark:text-[#F8FAFC]"
        >
          <AppRouter />
        </Container>
      </div>
    </div>
  );
}

function App() {
  return (
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  );
}

export default App;
