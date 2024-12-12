import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet, metaMaskWallet, rainbowWallet, tokenPocketWallet, uniswapWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { createClient, http } from "viem";
import { mainnet, bevmMainnet, merlin } from "viem/chains";
import { createConfig } from "wagmi";

const projectId = "123e23ac15abc13f7df4392e27f9c070";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [rainbowWallet, metaMaskWallet, tokenPocketWallet, walletConnectWallet, uniswapWallet],
    },
  ],
  {
    appName: "CycleX",
    projectId,
  }
);
export const config = createConfig({
  connectors,
  chains: [mainnet, bevmMainnet, merlin],
  transports: {
    [mainnet.id]: http(),
    [bevmMainnet.id]: http(),
    [merlin.id]: http(),
  },
});
