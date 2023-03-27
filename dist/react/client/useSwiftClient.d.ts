export default function useSwiftClient(): {
    client: import("../..").SwiftClient;
    connectSigning: () => void;
};
