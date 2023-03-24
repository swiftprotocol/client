import { ReactNode, useCallback, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { TxProvider } from 'react/hooks/tx'
import { SwiftClient } from '../../core'
import WalletProvider from '../wallet/WalletProvider'
import SwiftContext from './SwiftContext'

export default function SwiftProvider({
  client,
  children,
}: {
  client: SwiftClient
  children: ReactNode
}) {
  const [, updateState] = useState<{}>()
  const forceUpdate = useCallback(() => updateState({}), [])

  const connectSigning = useCallback(async () => {
    if (client) {
      await client?.connectSigning()
      forceUpdate()
    }
  }, [client, forceUpdate])

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
