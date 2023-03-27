import useSwiftClient from '../client/useSwiftClient';
export default function useCommerce() {
    const { client } = useSwiftClient();
    return {
        commerceClient: client === null || client === void 0 ? void 0 : client.commerceClient,
        signingCommerceClient: client === null || client === void 0 ? void 0 : client.signingCommerceClient,
    };
}
//# sourceMappingURL=useCommerce.js.map