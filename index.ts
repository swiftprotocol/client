import { SwiftClient } from './core/index.js'

import SwiftProvider from './react/client/SwiftProvider.js'
import useSwiftClient from './react/client/useSwiftClient.js'
import useCommerce from './react/contract/useCommerce.js'
import useTrust from './react/contract/useTrust.js'

import useTx from './react/hooks/tx.js'
import useToaster from './react/hooks/useToaster.js'

// React components & contexts
export {
  SwiftProvider,
  useSwiftClient,
  useCommerce,
  useTrust,
  useTx,
  useToaster,
}

export { SwiftClient }
