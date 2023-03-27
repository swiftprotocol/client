import type { ChainInfo } from '@keplr-wallet/types';
import type { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { CommerceClient, CommerceQueryClient, TrustClient, TrustQueryClient } from '@swiftprotocol/types';
import Wallet from './wallet/index';
declare global {
    interface Window extends KeplrWindow {
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
    connectSigning(): Promise<import("./wallet/types").WalletInfo>;
    disconnectSigning(): Promise<void>;
    connectSigningClient(): Promise<SigningCosmWasmClient>;
    private createCommerceClient;
    private createTrustClient;
    get cosmWasmClient(): CosmWasmClient;
    get wallet(): Wallet;
}
