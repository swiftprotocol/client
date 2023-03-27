import { useContext } from 'react';
import SwiftContext from './SwiftContext.js';
export default function useSwiftClient() {
    const client = useContext(SwiftContext);
    return client;
}
//# sourceMappingURL=useSwiftClient.js.map