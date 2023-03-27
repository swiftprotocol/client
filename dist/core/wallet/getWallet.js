var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getKeplrFromWindow } from '@keplr-wallet/stores';
export default function getWallet(chainId) {
    return __awaiter(this, void 0, void 0, function* () {
        const keplr = yield getKeplrFromWindow();
        if (!keplr) {
            return null;
        }
        // @ts-ignore
        if (window.keplr) {
            // @ts-ignore
            window.keplr.defaultOptions = {
                sign: {
                    preferNoSetFee: true,
                },
            };
        }
        const walletInfo = yield keplr.getKey(chainId);
        return {
            address: walletInfo.bech32Address,
            name: walletInfo.name,
        };
    });
}
//# sourceMappingURL=getWallet.js.map