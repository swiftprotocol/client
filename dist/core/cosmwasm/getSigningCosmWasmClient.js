var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import {
//   AminoTypes,
//   createGovAminoConverters,
//   createBankAminoConverters,
//   createStakingAminoConverters,
//   createDistributionAminoConverters,
// } from '@cosmjs/stargate'
import { 
// createWasmAminoConverters,
SigningCosmWasmClient, } from '@cosmjs/cosmwasm-stargate';
import { getKeplrFromWindow } from '@keplr-wallet/stores';
import { gasPrice } from '../config/gas';
export default function getSigningCosmWasmClient(chainInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!chainInfo) {
            throw new Error('No Chain Info provided to connect CosmWasmClient');
        }
        const keplr = yield getKeplrFromWindow();
        if (!keplr) {
            throw new Error('Keplr not available.');
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
        yield keplr.experimentalSuggestChain(chainInfo);
        yield keplr.enable(chainInfo.chainId);
        // get offline signer for signing txs
        const offlineSigner = yield keplr.getOfflineSignerAuto(chainInfo.chainId);
        // make client
        // const customAminoTypes = new AminoTypes({
        //   ...createWasmAminoConverters(),
        //   ...createGovAminoConverters(),
        //   ...createBankAminoConverters(),
        //   ...createStakingAminoConverters('ujuno'),
        //   ...createDistributionAminoConverters(),
        // })
        const client = yield SigningCosmWasmClient.connectWithSigner(chainInfo.rpc, offlineSigner, {
            gasPrice,
        });
        return client;
    });
}
//# sourceMappingURL=getSigningCosmWasmClient.js.map