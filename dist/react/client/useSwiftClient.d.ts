export default function useSwiftClient(): {
    client: import("../../index.js").SwiftClient;
    connectSigning: (walletType: "keplr" | "leap") => Promise<void>;
};
