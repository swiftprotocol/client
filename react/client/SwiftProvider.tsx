import { ReactNode, useCallback, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { TxProvider } from '../hooks/tx.js'
import { SwiftClient } from '../../core/index.js'
import WalletProvider from '../wallet/WalletProvider.js'
import SwiftContext from './SwiftContext.js'

export default function SwiftProvider({
  client,
  children,
}: {
  client: SwiftClient
  children: ReactNode
}) {
  const [, updateState] = useState<{}>()
  const forceUpdate = useCallback(() => updateState({}), [])

  const connectSigning = useCallback(
    async (walletType: 'keplr' | 'leap') => {
      if (!client) return
      await client?.connectSigning(walletType)
      forceUpdate()
    },
    [client, forceUpdate]
  )

  // Connect client
  useEffect(() => {
    // Unsigned Client
    async function connectClient() {
      await client?.connect()
      forceUpdate()
    }

    connectClient()
  }, [client, forceUpdate])

  return (
    <SwiftContext.Provider
      value={{
        client,
        connectSigning,
      }}
    >
      <Toaster position="top-right" />
      <WalletProvider>
        <TxProvider>{children}</TxProvider>
      </WalletProvider>
    </SwiftContext.Provider>
  )
}
