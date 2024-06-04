import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet
} from '@rainbow-me/rainbowkit/wallets';
import { http, WagmiProvider } from 'wagmi';
import {
  mainnet,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReduxReducer from './utils/reduxStorage';

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
  ],
  transports: {
    [mainnet.id]: http(),
  },
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, walletConnectWallet, coinbaseWallet],
    },
  ],
});

const queryClient = new QueryClient();

const store = configureStore({
  reducer: {
    dataStore: ReduxReducer
  }
});

const Providers = ({children}) => {
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} modalSize="compact" locale="en-US">
          <Provider store={store}>
            {children}
          </Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Providers;

