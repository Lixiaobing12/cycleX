import { connectorsForWallets, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { injectedWallet, metaMaskWallet, rainbowWallet, tokenPocketWallet, uniswapWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import 'animate.css';
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { createConfig, useReconnect } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, http } from 'wagmi'
import { bevmMainnet, mainnet, merlin } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import App from "./App";
import "./global.css";
import "./i18n/config";
import "./polyfills";
import { createClient } from "viem";
import { config } from "./middleware/wagmi.config";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider locale="en-US" modalSize="compact">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#000",
              controlOutlineWidth: 1,
              fontFamily: "nomal-font",
            },
            components: {
              Table: {
                cellFontSizeMD: 12,
                cellFontSizeSM: 12,
                cellFontSize: 12,
                cellPaddingBlock: 12,
                cellPaddingInline: 12,
              },
              Menu: {
                itemSelectedBg: "rgba(0, 0, 0, 0.06)",
                darkItemSelectedBg: "transparent",
                darkItemBg: "#000",
                darkItemColor: "#fff",
              },
              Select: {
                optionSelectedColor: "#fff",
              },
              Tabs: {
                inkBarColor: "#000",
                itemActiveColor: "#000",
                itemHoverColor: "#000",
                itemColor: "rgba(0,0,0,0.38)",
                itemSelectedColor: "#000",
              },
            },
          }}>
          <Router>
            <App />
          </Router>
        </ConfigProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
