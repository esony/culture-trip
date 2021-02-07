import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { GRAPHQL_FIN } from '../utils/constants'

const client = new ApolloClient({
  uri: GRAPHQL_FIN,
  cache: new InMemoryCache({
    resultCaching: false,
  }),
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
