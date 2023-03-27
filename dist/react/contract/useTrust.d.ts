export default function useTrust(): {
    trustClient: import("@swiftprotocol/types/Trust.client.js").TrustQueryClient;
    signingTrustClient: import("@swiftprotocol/types/Trust.client.js").TrustClient;
};
