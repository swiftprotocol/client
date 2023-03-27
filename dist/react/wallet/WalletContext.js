import React from 'react';
const WalletContext = React.createContext({
    wallet: undefined,
    login: () => { },
    logout: () => { },
    refreshBalance: () => { },
});
export default WalletContext;
//# sourceMappingURL=WalletContext.js.map