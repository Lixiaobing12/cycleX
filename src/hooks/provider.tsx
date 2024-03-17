import { providers } from "ethers";
import React from "react";
import { WalletClient, useWalletClient } from "wagmi";

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  let provider = new providers.Web3Provider(transport, network);
  if (window.ethereum) {
    provider = new providers.Web3Provider(window.ethereum, network);
  }
  return provider;
}

export const useClient = ({ chainId }: { chainId?: number } = {}) => {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
};
