import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { getAccessToken, setAccessToken } from './accessToken';
import jwtDecode from "jwt-decode";
import { setContext } from "apollo-link-context";
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
let apolloClient;

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: "https://blog-server-v1.herokuapp.com/graphql",
    credentials: "include",
    fetch
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch("https://blog-server-v1.herokuapp.com/refresh_token", {
        method: "POST",
        credentials: "include"
      });
    },
    handleFetch: accessToken => {
      setAccessToken(accessToken);
    },
    handleError: err => {
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
    }
  });

  const authLink = setContext((_request, { headers }) => {
    const token = getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : ""
      }
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log(graphQLErrors);
    console.log(networkError);
  });
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([refreshLink, authLink, errorLink, httpLink] as any),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            //
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
