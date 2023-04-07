import React from 'react'
import { SwiftClient } from '../../core/index.js'

export default React.createContext<{
  client: SwiftClient | null
  connectSigning: (walletType: 'keplr' | 'leap') => void
}>({
  client: null,
  connectSigning: () => {},
})
