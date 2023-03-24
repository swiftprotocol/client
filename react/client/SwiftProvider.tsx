import { ReactNode, useCallback, useEffect, useState } from 'react'
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
      <WalletProvider>{children}</WalletProvider>
    </SwiftContext.Provider>
  )
}
