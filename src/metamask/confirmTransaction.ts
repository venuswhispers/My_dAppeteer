import { Page } from 'puppeteer';

import { TransactionOptions } from '..';
import { clickOnButton, typeOnInputField } from '../helpers';

import { GetSingedIn } from './index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const confirmTransaction = (page: Page, getSingedIn: GetSingedIn, version?: string) => async (
  options?: TransactionOptions,
): Promise<void> => {
  await page.bringToFront();
  if (!(await getSingedIn())) {
    throw new Error("You haven't signed in yet");
  }
  await page.waitForTimeout(500);
  await page.reload();

  if (options) {
    await clickOnButton(page, 'Edit');
    await clickOnButton(page, 'Edit suggested gas fee');

    if (options.gas) await typeOnInputField(page, 'Gas price', String(options.gas), true);
    if (options.gasLimit) await typeOnInputField(page, 'Gas Limit', String(options.gasLimit), true);

    await clickOnButton(page, 'Save');
  }

  await clickOnButton(page, 'Confirm');
};
