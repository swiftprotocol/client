import React from 'react'
import { SwiftClient } from '../../core/index.js'

export default React.createContext<{
  client: SwiftClient | null
  connectSigning: () => void
}>({
  client: null,
  connectSigning: () => {},
})
