var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import useSwiftClient from '../client/useSwiftClient';
import WalletContext from './WalletContext';
export default function WalletProvider({ children }) {
    const { client, connectSigning } = useSwiftClient();
    const [wallet, setWallet] = useState();
    const logout = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        localStorage.removeItem('address');
        localStorage.removeItem('walletName');
        setWallet(undefined);
        yield (client === null || client === void 0 ? void 0 : client.disconnectSigning());
    }), [client]);
    const login = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        yield (client === null || client === void 0 ? void 0 : client.connect());
        yield connectSigning();
        const w = client === null || client === void 0 ? void 0 : client.wallet;
        if (w === null || w === void 0 ? void 0 : w.wallet)
            setWallet(w.wallet);
    }), [client, connectSigning]);
    // Keplr Wallet Changed
    useEffect(() => {
        window.addEventListener('keplr_keystorechange', () => {
            console.log('Key store in Keplr is changed. You may need to refetch the account info.');
            logout().then(() => {
                login();
            });
        });
    }, [login, logout]);
    // Auto-login if in localstorage:
    useEffect(() => {
        function loadLocalWallet() {
            return __awaiter(this, void 0, void 0, function* () {
                const address = localStorage.getItem('address');
                const name = localStorage.getItem('walletName');
                if (client && address && name) {
                    yield (client === null || client === void 0 ? void 0 : client.connect());
                    client.wallet.address = address;
                    const balance = yield client.wallet.getBalance();
                    setWallet({
                        address,
                        name,
                        balance,
                    });
                    connectSigning();
                    return;
                }
            });
        }
        loadLocalWallet();
    }, [client, connectSigning]);
    useEffect(() => {
        if (wallet && wallet.address && wallet.name) {
            localStorage.setItem('address', wallet.address);
            localStorage.setItem('walletName', wallet.name);
        }
    }, [wallet]);
    function refreshBalance() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const newBalance = yield ((_a = client === null || client === void 0 ? void 0 : client.wallet) === null || _a === void 0 ? void 0 : _a.getBalance());
            if ((_b = client === null || client === void 0 ? void 0 : client.wallet) === null || _b === void 0 ? void 0 : _b.wallet) {
                setWallet(Object.assign(Object.assign({}, client.wallet.wallet), { balance: newBalance }));
            }
        });
    }
    return (_jsx(WalletContext.Provider, Object.assign({ value: {
            wallet,
            refreshBalance,
            login,
            logout,
        } }, { children: children })));
}
//# sourceMappingURL=WalletProvider.js.map