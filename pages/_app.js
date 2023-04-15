import "../styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import FetchPokemons from "./fetchPokemons";

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app/",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <FetchPokemons>
        <Component {...pageProps} />
      </FetchPokemons>
    </ApolloProvider>
  );
}
