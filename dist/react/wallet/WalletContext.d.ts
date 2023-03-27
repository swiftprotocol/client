import React from 'react';
import { WalletInfo } from '../../core/wallet/types';
declare type WalletContextValue = {
    wallet?: WalletInfo;
    login: () => void;
    logout: () => void;
    refreshBalance: () => void;
};
declare const WalletContext: React.Context<WalletContextValue>;
export default WalletContext;
