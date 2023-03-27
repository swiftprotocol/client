import type { WalletInfo } from './types.js'
import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import getWallet from './getWallet.js'
import { CommerceQueryClient } from '@swiftprotocol/types'

export default class Wallet {
  cosmWasmClient: CosmWasmClient
  commerceContract: string
  chainId: string

  private _denom: string
  private _walletInfo: WalletInfo | null = null

  constructor({
    cosmWasmClient,
    commerceContract,
    chainId,
  }: {
    cosmWasmClient: CosmWasmClient
    commerceContract: string
    chainId: string
  }) {
    this.cosmWasmClient = cosmWasmClient
    this.commerceContract = commerceContract
    this.chainId = chainId
  }

  public async getBalance() {
    if (this._walletInfo && this.address) {
      this._walletInfo.balance = await this.cosmWasmClient.getBalance(
        this.address,
        this.denom
      )
    }

    return this.balance
  }

  public async getDenom() {
    if (this.address && this.commerceContract) {
      const commerceClient = new CommerceQueryClient(
        this.cosmWasmClient,
        this.address
      )
      const { config } = await commerceClient.config()
      this._denom = config.token.denom
    }

    return this.denom
  }

  public async getWallet() {
    if (!this._walletInfo) {
      const wallet = await getWallet(this.chainId)
      this._walletInfo = wallet

      await this.getBalance()
    }

    return this._walletInfo
  }

  public get wallet(): WalletInfo | null {
    return this._walletInfo
  }

  public get address(): string {
    return this._walletInfo?.address ?? ''
  }

  public get name() {
    return this._walletInfo?.name
  }

  public get balance() {
    return this._walletInfo?.balance
  }

  public get denom() {
    return this._denom
  }

  public set address(address: string) {
    this._walletInfo = {
      ...this._walletInfo,
      address,
    }
  }
}
