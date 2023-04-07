var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getCosmWasmClient from './cosmwasm/getCosmWasmClient.js';
import { CommerceClient, CommerceQueryClient, TrustClient, TrustQueryClient, } from '@swiftprotocol/types';
import getSigningCosmWasmClient from './cosmwasm/getSigningCosmWasmClient.js';
import Wallet from './wallet/index.js';
export class SwiftClient {
    constructor({ chainInfo, commerceContract, trustContract, }) {
        this._cosmWasmClient = null;
        this.signingCosmWasmClient = null;
        this.commerceClient = null;
        this.signingCommerceClient = null;
        this.trustClient = null;
        this.signingTrustClient = null;
        this._wallet = null;
        this.chainInfo = chainInfo;
        this.commerceContract = commerceContract;
        this.trustContract = trustContract || null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._cosmWasmClient) {
                return;
            }
            this._cosmWasmClient = yield getCosmWasmClient(this.chainInfo.rpc);
            yield this.createCommerceClient();
            yield this.createTrustClient();
        });
    }
    connectSigning(walletType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connectSigningClient();
                if (!this.cosmWasmClient)
                    throw new Error('Could not load CosmWasmClient');
                if (!this.signingCosmWasmClient)
                    throw new Error('Could not load SigningCosmWasmClient');
                const wallet = yield this.wallet.getWallet(walletType);
                yield this.createCommerceClient();
                yield this.createTrustClient();
                return wallet;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    disconnectSigning() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.signingCosmWasmClient) === null || _a === void 0 ? void 0 : _a.disconnect();
            this._wallet = null;
            yield this.createCommerceClient();
            yield this.createTrustClient();
        });
    }
    connectSigningClient() {
        return __awaiter(this, void 0, void 0, function* () {
            this.signingCosmWasmClient = yield getSigningCosmWasmClient(this.chainInfo);
            return this.signingCosmWasmClient;
        });
    }
    createCommerceClient() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.address) && this.signingCosmWasmClient) {
                this.signingCommerceClient = new CommerceClient(this.signingCosmWasmClient, this._wallet.address, this.commerceContract);
            }
            else if (this.cosmWasmClient) {
                this.commerceClient = new CommerceQueryClient(this.cosmWasmClient, this.commerceContract);
            }
            return (_b = this.signingCommerceClient) !== null && _b !== void 0 ? _b : this.commerceClient;
        });
    }
    createTrustClient() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.trustContract) {
                if (((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.address) && this.signingCosmWasmClient) {
                    this.signingTrustClient = new TrustClient(this.signingCosmWasmClient, this._wallet.address, this.trustContract);
                }
                else if (this.cosmWasmClient) {
                    this.trustClient = new TrustQueryClient(this.cosmWasmClient, this.trustContract);
                }
                return (_b = this.signingTrustClient) !== null && _b !== void 0 ? _b : this.trustClient;
            }
            else {
                return null;
            }
        });
    }
    get cosmWasmClient() {
        return this._cosmWasmClient;
    }
    get wallet() {
        if (!this.cosmWasmClient)
            throw new Error('Could not find CosmWasmClient');
        if (this._wallet) {
            return this._wallet;
        }
        // Create wallet
        this._wallet = new Wallet({
            cosmWasmClient: this.cosmWasmClient,
            commerceContract: this.commerceContract,
            chainId: this.chainInfo.chainId,
        });
        return this._wallet;
    }
}
//# sourceMappingURL=index.js.map