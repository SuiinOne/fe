import React from "react";
import ReactDOM from "react-dom/client";
import "@mysten/dapp-kit/dist/index.css";
import "@radix-ui/themes/styles.css";
import "./shared/styles/design-tokens.css";
import "./shared/styles/theme.css";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import { networkConfig } from "./networkConfig.ts";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, useTheme } from "./shared/contexts/ThemeContext";

const queryClient = new QueryClient();

function ThemedApp() {
  const { theme } = useTheme();
  return (
    <Theme 
      appearance={theme}
      accentColor="blue"
      grayColor="slate"
      radius="medium"
      scaling="100%"
    >
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider autoConnect>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </Theme>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <ThemedApp />
    </ThemeProvider>
  </React.StrictMode>,
);
