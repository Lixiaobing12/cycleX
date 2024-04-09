import { connectorsForWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { injectedWallet, metaMaskWallet, rainbowWallet, tokenPocketWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import App from "./App";
import "./global.css";
import "./i18n/config";
import "./polyfills";

const projectId = "50b9173be949d82c3ec0d89211b8967e";
const { chains, publicClient } = configureChains([bsc], [publicProvider()]);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      tokenPocketWallet({ projectId, chains }),
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains} locale="en-US">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#000",
            controlOutlineWidth: 1,
          },
          components: {
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
  </WagmiConfig>
);
