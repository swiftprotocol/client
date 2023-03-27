import { createContext, ReactNode, useContext } from 'react'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { isDeliverTxSuccess } from '@cosmjs/stargate'
import { coins } from '@cosmjs/stargate'
import useToaster, { ToastPayload, ToastTypes } from './useToaster'
import useSwiftClient from '../client/useSwiftClient'
import useWallet from '../wallet/useWallet'

// Context to handle simple signingClient transactions
export interface Msg {
  typeUrl: string
  value: any
}

export interface TxOptions {
  gas?: number
  toast?: {
    title?: ToastPayload['title']
    message?: ToastPayload['message']
    type?: ToastTypes
    actions?: JSX.Element
  }
}

export interface TxContext {
  tx: (msgs: Msg[], options: TxOptions, callback?: () => void) => Promise<void>
}

export const Tx = createContext<TxContext>({
  tx: () => new Promise(() => {}),
})

export function TxProvider({ children }: { children: ReactNode }) {
  const { client } = useSwiftClient()
  const { refreshBalance } = useWallet()
  const signingCosmwasmClient = client?.signingCosmWasmClient

  const toaster = useToaster()

  // Method to sign & broadcast transaction
  const tx = async (msgs: Msg[], options: TxOptions, callback?: () => void) => {
    // Gas config
    const fee = {
      amount: coins(0, 'ustars'),
      gas: options.gas ? String(options.gas) : '666666',
    }

    let signed
    try {
      if (client?.wallet?.address) {
        signed = await signingCosmwasmClient?.sign(
          client?.wallet?.address,
          msgs,
          fee,
          ''
        )
      }
    } catch (e) {
      toaster.toast({
        title: 'Error',
        dismissable: true,
        message: (e as Error).message as string,
        type: ToastTypes.Error,
      })
    }

    let broadcastToastId = ''

    broadcastToastId = toaster.toast(
      {
        title: 'Broadcasting transaction...',
        type: ToastTypes.Pending,
      },
      { duration: 999999 }
    )

    if (signingCosmwasmClient && signed) {
      await signingCosmwasmClient
        .broadcastTx(Uint8Array.from(TxRaw.encode(signed).finish()))
        .then((res) => {
          toaster.dismiss(broadcastToastId)
          if (isDeliverTxSuccess(res)) {
            // Run callback
            if (callback) callback()

            // Refresh balance
            refreshBalance()

            toaster.toast({
              title: options.toast?.title || 'Transaction Successful',
              type: options.toast?.type || ToastTypes.Success,
              dismissable: true,
              actions: options.toast?.actions || <></>,
              message: options.toast?.message || <></>,
            })
          } else {
            toaster.toast({
              title: 'Error',
              message: res.rawLog,
              type: ToastTypes.Error,
            })
          }
        })
    } else {
      toaster.dismiss(broadcastToastId)
    }
  }

  return <Tx.Provider value={{ tx }}>{children}</Tx.Provider>
}

export default (): TxContext => useContext(Tx)
