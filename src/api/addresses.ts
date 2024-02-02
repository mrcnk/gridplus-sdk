import {
  BTC_LEGACY_DERIVATION,
  BTC_SEGWIT_DERIVATION,
  BTC_WRAPPED_SEGWIT_DERIVATION,
  DEFAULT_ETH_DERIVATION,
  LEDGER_LEGACY_DERIVATION,
  LEDGER_LIVE_DERIVATION,
  MAX_ADDR,
  SOLANA_DERIVATION,
} from '../constants';
import { getStartPath, queue } from './utilities';

export const fetchAddresses = async (
  overrides?: GetAddressesRequestParams,
): Promise<string[]> => {
  return queue((client) =>
    client
      .getAddresses({
        startPath: DEFAULT_ETH_DERIVATION,
        n: MAX_ADDR,
        ...overrides,
      })
      .then((addrs) => addrs.map((addr) => `${addr}`)),
  );
};

/**
 * Fetches a single address from the device.
 *
 * @note By default, this function fetches m/44'/60'/0'/0/0
 * @param path - either the index of ETH signing path or the derivation path to fetch
 */
export const fetchAddress = async (
  path: number | WalletPath = 0,
): Promise<string> => {
  return fetchAddresses({
    startPath:
      typeof path === 'number'
        ? getStartPath(DEFAULT_ETH_DERIVATION, path)
        : path,
    n: 1,
  }).then((addrs) => addrs[0]);
};

export const fetchBtcLegacyAddresses = async (
  n = MAX_ADDR,
  startPathIndex?: number,
): Promise<string[]> => {
  return fetchAddresses({
    startPath: getStartPath(BTC_LEGACY_DERIVATION, startPathIndex),
    n,
  });
};

export const fetchBtCSegwitAddresses = async (
  n = MAX_ADDR,
  startPathIndex?: number,
): Promise<string[]> => {
  return fetchAddresses({
    startPath: getStartPath(BTC_SEGWIT_DERIVATION, startPathIndex),
    n,
  });
};

export const fetchBtcWrappedSegwitAddresses = async (
  n = MAX_ADDR,
  startPathIndex?: number,
): Promise<string[]> => {
  return fetchAddresses({
    startPath: getStartPath(BTC_WRAPPED_SEGWIT_DERIVATION, startPathIndex),
    n,
  });
};

export const fetchSolanaAddresses = async (
  n = MAX_ADDR,
  startPathIndex?: number,
): Promise<string[]> => {
  return fetchAddresses({
    startPath: getStartPath(SOLANA_DERIVATION, startPathIndex, 2),
    n,
  });
};

export const fetchLedgerLiveAddresses = async (
  n = MAX_ADDR,
  startPathIndex?: number,
): Promise<string[]> => {
  const addresses = [];
  for (let i = 0; i < n; i++) {
    addresses.push(
      queue((client) =>
        client
          .getAddresses({
            startPath: getStartPath(
              LEDGER_LIVE_DERIVATION,
              startPathIndex + i,
              2,
            ),
            n: 1,
          })
          .then((addresses) => addresses.map((address) => `${address}`)),
      ),
    );
  }
  return Promise.all(addresses);
};

export const fetchLedgerLegacyAddresses = async (
  n = MAX_ADDR,
  startPathIndex?: number,
): Promise<string[]> => {
  const addresses = [];
  for (let i = 0; i < n; i++) {
    addresses.push(
      queue((client) =>
        client
          .getAddresses({
            startPath: getStartPath(
              LEDGER_LEGACY_DERIVATION,
              startPathIndex + i,
              3,
            ),
            n: 1,
          })
          .then((addresses) => addresses.map((address) => `${address}`)),
      ),
    );
  }
  return Promise.all(addresses);
};
