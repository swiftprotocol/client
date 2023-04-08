import type { ChainInfo, Keplr } from '@keplr-wallet/types';
import type { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { CommerceClient, CommerceQueryClient, TrustClient, TrustQueryClient } from '@swiftprotocol/types';
import Wallet from './wallet/index.js';
import { juno } from 'juno-network';
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
}
export declare class SwiftClient {
    private _cosmWasmClient;
    signingCosmWasmClient: SigningCosmWasmClient | null;
    api: Awaited<ReturnType<typeof juno.ClientFactory.createLCDClient>> | null;
    commerceClient: CommerceQueryClient | null;
    signingCommerceClient: CommerceClient | null;
    trustClient: TrustQueryClient | null;
    signingTrustClient: TrustClient | null;
    commerceContract: string;
    trustContract: string | null;
    chainInfo: ChainInfo;
    private _wallet;
    constructor({ chainInfo, commerceContract, trustContract, }: SwiftClientConstructor);
    connect(): Promise<void>;
    connectSigning(walletType: 'keplr' | 'leap'): Promise<import("./wallet/types.js").WalletInfo>;
    disconnectSigning(): Promise<void>;
    connectSigningClient(walletType: 'keplr' | 'leap'): Promise<SigningCosmWasmClient>;
    private createCommerceClient;
    private createTrustClient;
    get cosmWasmClient(): CosmWasmClient;
    get wallet(): Wallet;
}
