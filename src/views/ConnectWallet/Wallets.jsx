import { InjectedConnector } from '@web3-react/injected-connector';

// MetaMask
export const Injected = new InjectedConnector({
    supportedChainIds: [80001],
});