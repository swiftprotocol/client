import { WalletInfo } from './types.js';
export default function getWallet(chainId: string): Promise<WalletInfo | null>;
