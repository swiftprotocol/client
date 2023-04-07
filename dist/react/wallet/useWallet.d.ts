import './storageFix.js';
export default function useWallet(): {
    wallet?: import("../../core/wallet/types.js").WalletInfo;
    login: (walletType: "keplr" | "leap") => void;
    logout: () => void;
    refreshBalance: () => void;
};
