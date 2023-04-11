import React from 'react';
import { SwiftClient } from '../../core/index.js';
declare const _default: React.Context<{
    client: SwiftClient | null;
    connectSigning: (walletType: 'keplr' | 'leap') => Promise<void>;
}>;
export default _default;
