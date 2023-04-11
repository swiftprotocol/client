import { ReactNode, useCallback, useEffect, useState } from 'react'
import { WalletInfo } from '../../core/wallet/types.js'
import useSwiftClient from '../client/useSwiftClient.js'
import WalletContext from './WalletContext.js'

export default function WalletProvider({ children }: { children: ReactNode }) {
  const { client, connectSigning } = useSwiftClient()
  const [wallet, setWallet] = useState<WalletInfo>()

  const logout = useCallback(async () => {
    localStorage.removeItem('address')
    localStorage.removeItem('walletName')
    localStorage.removeItem('walletType')
    setWallet(undefined)
    await client?.disconnectSigning()
  }, [client])

  const login = useCallback(
    async (walletType: 'keplr' | 'leap') => {
      await logout()
      await client?.connect()
      await connectSigning(walletType)

      const w = client?.wallet
      if (w?.wallet) {
        setWallet(w.wallet)
        localStorage.setItem('walletType', walletType)
      }
    },
    [client, connectSigning]
  )

  // Keplr Wallet Changed
  useEffect(() => {
    window.addEventListener('keplr_keystorechange', () => {
      console.log(
        'Key store in Keplr is changed. You may need to refetch the account info.'
      )

      logout().then(() => {
        login('keplr')
      })
    })
  }, [login, logout])

  // Leap Wallet Changed
  useEffect(() => {
    window.addEventListener('leap_keystorechange', () => {
      console.log(
        'Key store in Leap is changed. You may need to refetch the account info.'
      )

      logout().then(() => {
        login('leap')
      })
    })
  }, [login, logout])

  // Auto-login if in localstorage:
  useEffect(() => {
    async function loadLocalWallet() {
      const address = localStorage.getItem('address')
      const name = localStorage.getItem('walletName')
      const type = localStorage.getItem('walletType')

      if (client && address && name) {
        await client?.connect()
        client.wallet.address = address
        const balance = await client.wallet.getBalance()

        setWallet({
          address,
          name,
          balance,
        })

        connectSigning(type as 'keplr' | 'leap')
        return
      }
    }

    loadLocalWallet()
  }, [client, connectSigning])

  useEffect(() => {
    if (wallet && wallet.address && wallet.name) {
      localStorage.setItem('address', wallet.address)
      localStorage.setItem('walletName', wallet.name)
    }
  }, [wallet])

  async function refreshBalance() {
    const newBalance = await client?.wallet?.getBalance()

    if (client?.wallet?.wallet) {
      setWallet({
        ...client.wallet.wallet,
        balance: newBalance,
      })
    }
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        refreshBalance,
        login,
        logout,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
