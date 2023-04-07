import type { ChainInfo, Keplr } from '@keplr-wallet/types';
import type { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { CommerceClient, CommerceQueryClient, TrustClient, TrustQueryClient } from '@swiftprotocol/types';
import Wallet from './wallet/index.js';
declare global {
    interface Window {
        wallet: Keplr;
        keplr: Keplr;
        leap: Keplr;
    }
}
export interface SwiftClientConstructor {
    chainInfo: ChainInfo;
    commerceContract: string;
    trustContract?: string;
    walletType?: 'keplr' | 'leap';
}
export declare class SwiftClient {
    private _cosmWasmClient;
    signingCosmWasmClient: SigningCosmWasmClient | null;
    commerceClient: CommerceQueryClient | null;
    signingCommerceClient: CommerceClient | null;
    trustClient: TrustQueryClient | null;
    signingTrustClient: TrustClient | null;
    commerceContract: string;
    trustContract: string | null;
    chainInfo: ChainInfo;
    walletType: 'keplr' | 'leap' | null;
    private _wallet;
    constructor({ chainInfo, commerceContract, trustContract, walletType, }: SwiftClientConstructor);
    connect(): Promise<void>;
    connectSigning(): Promise<import("./wallet/types.js").WalletInfo>;
    disconnectSigning(): Promise<void>;
    connectSigningClient(): Promise<SigningCosmWasmClient>;
    private createCommerceClient;
    private createTrustClient;
    get cosmWasmClient(): CosmWasmClient;
    get wallet(): Wallet;
}
