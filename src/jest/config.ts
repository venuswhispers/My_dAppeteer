import path from 'path';

import { existsSync } from 'node:fs';
import { cwd } from 'node:process';

import { RECOMMENDED_METAMASK_VERSION } from '../index';
import { LaunchOptions } from '../types';

import { DappateerJestConfig } from './global';

export const DAPPETEER_DEFAULT_CONFIG: LaunchOptions = { metaMaskVersion: RECOMMENDED_METAMASK_VERSION };

export async function getDappeteerConfig(): Promise<DappateerJestConfig> {
  const configPath = 'dappeteer.config.js';
  const filePath = path.resolve(cwd(), configPath);

  if (!existsSync(filePath))
    return {
      dappeteer: DAPPETEER_DEFAULT_CONFIG,
      metaMask: {},
    };

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const config = await require(filePath);

  return {
    dappeteer: {
      ...DAPPETEER_DEFAULT_CONFIG,
      ...config.dappeteer,
    },
    metaMask: {
      ...config.metaMask,
    },
  };
}
