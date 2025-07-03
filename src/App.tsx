import { Container } from "@radix-ui/themes";
import { Header } from "./components/Layout/Header";
import AppRouter from "./routes/AppRouter";
import { WalletStatus } from "./WalletStatus";

function App() {
  return (
    <>
      <Header />
      <Container mt="5" pt="2" px="4" style={{ background: "var(--gray-a2)", minHeight: 500 }}>
        <WalletStatus />
        <AppRouter />
      </Container>
    </>
  );
}

export default App;
