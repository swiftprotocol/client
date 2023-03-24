import { useContext } from 'react'
import SwiftContext from './SwiftContext'

export default function useSwiftClient() {
  const client = useContext(SwiftContext)
  return client
}
