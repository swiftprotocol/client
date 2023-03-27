import './storageFix';
export default function useWallet(): {
    wallet?: import("../../core/wallet/types").WalletInfo;
    login: () => void;
    logout: () => void;
    refreshBalance: () => void;
};
