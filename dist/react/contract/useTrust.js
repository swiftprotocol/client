import useSwiftClient from '../client/useSwiftClient.js';
export default function useTrust() {
    const { client } = useSwiftClient();
    return {
        trustClient: client === null || client === void 0 ? void 0 : client.trustClient,
        signingTrustClient: client === null || client === void 0 ? void 0 : client.signingTrustClient,
    };
}
//# sourceMappingURL=useTrust.js.map