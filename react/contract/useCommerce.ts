import useSwiftClient from '../client/useSwiftClient'

export default function useCommerce() {
  const { client } = useSwiftClient()

  return {
    commerceClient: client?.commerceClient,
    signingCommerceClient: client?.signingCommerceClient,
  }
}
