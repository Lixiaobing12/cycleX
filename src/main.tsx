import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';
import './global.css';
import './polyfills';

const { chains, publicClient } = configureChains(
  [bsc],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'PowPepe',
  projectId: 'f0b5506e58c1188dbafa3c0faadedc2e',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains} locale="en-US">
      <Router>
        <App />
      </Router>
    </RainbowKitProvider>
  </WagmiConfig>
);
