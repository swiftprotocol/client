export default function useCommerce(): {
    commerceClient: import("@swiftprotocol/types/Commerce.client").CommerceQueryClient;
    signingCommerceClient: import("@swiftprotocol/types/Commerce.client").CommerceClient;
};
