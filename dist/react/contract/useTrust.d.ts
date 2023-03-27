export default function useTrust(): {
    trustClient: import("@swiftprotocol/types").TrustQueryClient;
    signingTrustClient: import("@swiftprotocol/types").TrustClient;
};
