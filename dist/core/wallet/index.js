var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getWallet from './getWallet.js';
import { CommerceQueryClient } from '@swiftprotocol/types';
export default class Wallet {
    constructor({ cosmWasmClient, commerceContract, chainId, }) {
        this._walletInfo = null;
        this.cosmWasmClient = cosmWasmClient;
        this.commerceContract = commerceContract;
        this.chainId = chainId;
    }
    getBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._walletInfo && this.address) {
                this._walletInfo.balance = yield this.cosmWasmClient.getBalance(this.address, this.denom);
            }
            return this.balance;
        });
    }
    getDenom() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.address && this.commerceContract) {
                const commerceClient = new CommerceQueryClient(this.cosmWasmClient, this.address);
                const { config } = yield commerceClient.config();
                this._denom = config.token.denom;
            }
            return this.denom;
        });
    }
    getWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._walletInfo) {
                const wallet = yield getWallet(this.chainId);
                this._walletInfo = wallet;
                yield this.getBalance();
            }
            return this._walletInfo;
        });
    }
    get wallet() {
        return this._walletInfo;
    }
    get address() {
        var _a, _b;
        return (_b = (_a = this._walletInfo) === null || _a === void 0 ? void 0 : _a.address) !== null && _b !== void 0 ? _b : '';
    }
    get name() {
        var _a;
        return (_a = this._walletInfo) === null || _a === void 0 ? void 0 : _a.name;
    }
    get balance() {
        var _a;
        return (_a = this._walletInfo) === null || _a === void 0 ? void 0 : _a.balance;
    }
    get denom() {
        return this._denom;
    }
    set address(address) {
        this._walletInfo = Object.assign(Object.assign({}, this._walletInfo), { address });
    }
}
//# sourceMappingURL=index.js.map