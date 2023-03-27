import React from 'react'
import { WalletInfo } from '../../core/wallet/types.js'

type WalletContextValue = {
  wallet?: WalletInfo
  login: () => void
  logout: () => void
  refreshBalance: () => void
}

const WalletContext = React.createContext<WalletContextValue>({
  wallet: undefined,
  login: () => {},
  logout: () => {},
  refreshBalance: () => {},
})
export default WalletContext
