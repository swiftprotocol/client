export default function useTrust(): {
    trustClient: import("@swiftprotocol/types/Trust.client").TrustQueryClient;
    signingTrustClient: import("@swiftprotocol/types/Trust.client").TrustClient;
};
