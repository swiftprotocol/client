export default function useCommerce(): {
    commerceClient: import("@swiftprotocol/types/Commerce.client.js").CommerceQueryClient;
    signingCommerceClient: import("@swiftprotocol/types/Commerce.client.js").CommerceClient;
};
