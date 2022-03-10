import { BrowserLaunchArgumentOptions, Page } from 'puppeteer';

import { Path } from './setup/metamaskDownloader';

export type LaunchOptions = OfficialOptions | CustomOptions;

export type OfficialOptions = BrowserLaunchArgumentOptions & {
  metamaskVersion: 'v10.10.1' | 'latest' | string;
  metamaskLocation?: Path;
};

export type CustomOptions = BrowserLaunchArgumentOptions & {
  metamaskVersion?: undefined;
  metamaskPath: string;
};

export type MetamaskOptions = {
  seed?: string;
  password?: string;
  showTestNets?: boolean;
  hideSeed?: boolean;
};

export type AddNetwork = {
  networkName: string;
  rpc: string;
  chainId: number;
  symbol?: string;
  explorer?: string;
};

export type AddToken = {
  tokenAddress: string;
  symbol?: string;
  decimals?: number;
};

export type Dappeteer = {
  lock: () => Promise<void>;
  unlock: (password: string) => Promise<void>;
  addNetwork: (options: AddNetwork) => Promise<void>;
  addToken: (options: AddToken) => Promise<void>;
  importPK: (pk: string) => Promise<void>;
  switchAccount: (accountNumber: number) => Promise<void>;
  switchNetwork: (network: string) => Promise<void>;
  confirmTransaction: (options?: TransactionOptions) => Promise<void>;
  sign: () => Promise<void>;
  approve: () => Promise<void>;
  helpers: {
    getTokenBalance: (tokenSymbol: string) => Promise<number>;
    deleteAccount: (accountNumber: number) => Promise<void>;
    deleteNetwork: (name: string) => Promise<void>;
  };
  page: Page;
};

export type TransactionOptions = {
  gas?: number;
  gasLimit?: number;
};
