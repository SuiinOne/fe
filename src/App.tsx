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
      className="min-h-screen bg-gradient-to-br from-[#FAFBFF] via-[#F0F4FF] to-[#E8EFFF] text-foreground dark:from-[#111827] dark:to-[#1E293B] dark:text-foreground"
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
          }}
          className="bg-card text-card-foreground"
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
