import { WalletInfo } from './types';
export default function getWallet(chainId: string): Promise<WalletInfo | null>;
