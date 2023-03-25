import type { ChainInfo } from '@keplr-wallet/types'
import type {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import getCosmWasmClient from './cosmwasm/getCosmWasmClient'

import { Window as KeplrWindow } from '@keplr-wallet/types'
import {
  CommerceClient,
  CommerceQueryClient,
  TrustClient,
  TrustQueryClient,
} from '@swiftprotocol/types'
import getSigningCosmWasmClient from './cosmwasm/getSigningCosmWasmClient'
import Wallet from './wallet/index'

declare global {
  interface Window extends KeplrWindow {}
}

export interface SwiftClientConstructor {
  chainInfo: ChainInfo
  commerceContract: string
  trustContract?: string
}

export class SwiftClient {
  private _cosmWasmClient: CosmWasmClient | null = null
  public signingCosmWasmClient: SigningCosmWasmClient | null = null

  public commerceClient: CommerceQueryClient | null = null
  public signingCommerceClient: CommerceClient | null = null

  public trustClient: TrustQueryClient | null = null
  public signingTrustClient: TrustClient | null = null

  public commerceContract: string
  public trustContract: string | null
  public chainInfo: ChainInfo

  private _wallet: Wallet | null = null

  constructor({
    chainInfo,
    commerceContract,
    trustContract,
  }: SwiftClientConstructor) {
    this.chainInfo = chainInfo
    this.commerceContract = commerceContract
    this.trustContract = trustContract || null
  }

  public async connect() {
    if (this._cosmWasmClient) {
      return
    }

    this._cosmWasmClient = await getCosmWasmClient(this.chainInfo.rpc)

    await this.createCommerceClient()
    await this.createTrustClient()
  }

  public async connectSigning() {
    try {
      await this.connectSigningClient()

      if (!this.cosmWasmClient) throw new Error('Could not load CosmWasmClient')

      if (!this.signingCosmWasmClient)
        throw new Error('Could not load SigningCosmWasmClient')

      const wallet = await this.wallet.getWallet()

      await this.createCommerceClient()
      await this.createTrustClient()

      return wallet
    } catch (e) {
      console.error(e)
    }
  }

  public async disconnectSigning() {
    this.signingCosmWasmClient?.disconnect()
    this._wallet = null

    await this.createCommerceClient()
    await this.createTrustClient()
  }

  public async connectSigningClient() {
    this.signingCosmWasmClient = await getSigningCosmWasmClient(this.chainInfo)
    return this.signingCosmWasmClient
  }

  private async createCommerceClient() {
    if (this._wallet?.address && this.signingCosmWasmClient) {
      this.signingCommerceClient = new CommerceClient(
        this.signingCosmWasmClient,
        this._wallet.address,
        this.commerceContract
      )
    } else if (this.cosmWasmClient) {
      this.commerceClient = new CommerceQueryClient(
        this.cosmWasmClient,
        this.commerceContract
      )
    }

    return this.signingCommerceClient ?? this.commerceClient
  }

  private async createTrustClient() {
    if (this.trustContract) {
      if (this._wallet?.address && this.signingCosmWasmClient) {
        this.signingTrustClient = new TrustClient(
          this.signingCosmWasmClient,
          this._wallet.address,
          this.trustContract
        )
      } else if (this.cosmWasmClient) {
        this.trustClient = new TrustQueryClient(
          this.cosmWasmClient,
          this.trustContract
        )
      }

      return this.signingTrustClient ?? this.trustClient
    } else {
      return null
    }
  }

  public get cosmWasmClient(): CosmWasmClient {
    return this._cosmWasmClient as CosmWasmClient
  }

  public get wallet(): Wallet {
    if (!this.cosmWasmClient) throw new Error('Could not find CosmWasmClient')

    if (this._wallet) {
      return this._wallet
    }

    // Create wallet
    this._wallet = new Wallet({
      cosmWasmClient: this.cosmWasmClient,
      commerceContract: this.commerceContract,
      chainId: this.chainInfo.chainId,
    })

    return this._wallet
  }
}
