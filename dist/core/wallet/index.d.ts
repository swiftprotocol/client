import type { WalletInfo } from './types.js';
import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
export default class Wallet {
    cosmWasmClient: CosmWasmClient;
    commerceContract: string;
    chainId: string;
    private _denom;
    private _walletInfo;
    constructor({ cosmWasmClient, commerceContract, chainId, }: {
        cosmWasmClient: CosmWasmClient;
        commerceContract: string;
        chainId: string;
    });
    getBalance(): Promise<import("cosmwasm").Coin>;
    getDenom(): Promise<string>;
    getWallet(walletType: 'keplr' | 'leap'): Promise<WalletInfo>;
    get wallet(): WalletInfo | null;
    get address(): string;
    get name(): string;
    get balance(): import("cosmwasm").Coin;
    get denom(): string;
    set address(address: string);
}
