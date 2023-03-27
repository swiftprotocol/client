export default function useSwiftClient(): {
    client: import("../../index.js").SwiftClient;
    connectSigning: () => void;
};
