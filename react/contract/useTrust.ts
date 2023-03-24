import useSwiftClient from '../client/useSwiftClient'

export default function useTrust() {
  const { client } = useSwiftClient()

  return {
    trustClient: client?.trustClient,
    signingTrustClient: client?.signingTrustClient,
  }
}
