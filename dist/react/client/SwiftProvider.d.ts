import { ReactNode } from 'react';
import { SwiftClient } from '../../core/index.js';
export default function SwiftProvider({ client, children, }: {
    client: SwiftClient;
    children: ReactNode;
}): JSX.Element;
