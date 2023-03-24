// import {
//   AminoTypes,
//   createGovAminoConverters,
//   createBankAminoConverters,
//   createStakingAminoConverters,
//   createDistributionAminoConverters,
// } from '@cosmjs/stargate'
import {
  // createWasmAminoConverters,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { getKeplrFromWindow } from '@keplr-wallet/stores'
import { gasPrice } from '../config/gas'
import type { ChainInfo } from '@keplr-wallet/types'

export default async function getSigningCosmWasmClient(
  chainInfo: ChainInfo
): Promise<SigningCosmWasmClient | null> {
  if (!chainInfo) {
    throw new Error('No Chain Info provided to connect CosmWasmClient')
  }

  const keplr = await getKeplrFromWindow()

  if (!keplr) {
    throw new Error('Keplr not available.')
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
  await keplr.experimentalSuggestChain(chainInfo)
  await keplr.enable(chainInfo.chainId)

  // get offline signer for signing txs
  const offlineSigner = await keplr.getOfflineSignerAuto(chainInfo.chainId)

  // make client

  // const customAminoTypes = new AminoTypes({
  //   ...createWasmAminoConverters(),
  //   ...createGovAminoConverters(),
  //   ...createBankAminoConverters(),
  //   ...createStakingAminoConverters('ujuno'),
  //   ...createDistributionAminoConverters(),
  // })

  const client = await SigningCosmWasmClient.connectWithSigner(
    chainInfo.rpc,
    offlineSigner,
    {
      gasPrice,
    }
  )

  return client
}
