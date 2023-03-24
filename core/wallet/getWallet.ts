import { getKeplrFromWindow } from '@keplr-wallet/stores'
import { WalletInfo } from './types'

export default async function getWallet(
  chainId: string
): Promise<WalletInfo | null> {
  const keplr = await getKeplrFromWindow()

  if (!keplr) {
    return null
  }
  // @ts-ignore
  if (window.keplr) {
    // @ts-ignore
    window.keplr.defaultOptions = {
      sign: {
        preferNoSetFee: true,
      },
    }
  }
  const walletInfo = await keplr.getKey(chainId)

  return {
    address: walletInfo.bech32Address,
    name: walletInfo.name,
  }
}
