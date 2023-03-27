import './storageFix.js';
export default function useWallet(): {
    wallet?: import("../../core/wallet/types.js").WalletInfo;
    login: () => void;
    logout: () => void;
    refreshBalance: () => void;
};
