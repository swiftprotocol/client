import { WalletInfo } from './types.js'

export default async function getWallet(
  chainId: string,
  walletType: 'keplr' | 'leap'
): Promise<WalletInfo | null> {
  switch (walletType) {
    case 'keplr':
      window.wallet = window.keplr
      break
    case 'leap':
      window.wallet = window.leap
      break
  }

  const wallet = window.wallet

  if (!wallet) {
    return null
  }
  // @ts-ignore
  if (window.wallet) {
    // @ts-ignore
    window.wallet.defaultOptions = {
      sign: {
        preferNoSetFee: true,
      },
    }
  }
  const walletInfo = await wallet.getKey(chainId)

  return {
    address: walletInfo.bech32Address,
    name: walletInfo.name,
  }
}
