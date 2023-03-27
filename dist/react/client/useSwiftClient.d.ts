export default function useSwiftClient(): {
    client: import("../../index").SwiftClient;
    connectSigning: () => void;
};
