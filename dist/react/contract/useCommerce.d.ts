export default function useCommerce(): {
    commerceClient: import("@swiftprotocol/types").CommerceQueryClient;
    signingCommerceClient: import("@swiftprotocol/types").CommerceClient;
};
