import { ApolloClient, InMemoryCache } from '@apollo/client';
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http'
import { endPoint } from '../clientConfig';

const link = createHttpLink({
    uri: endPoint,
    // uri: process.env.NEXT_PUBLIC_ENDPOINT,
    credentials: 'include',
});

const cacheConfig = {
    typePolicies: {
        Query: {
            fields: {
                getImageGallery: {
                    merge(_, incoming) {
                        /* Equivalent to what happens if there is no custom merge function.
                        Explicitly permit replacement while silencing warning. */
                        return incoming;
                    },
                },
                getProductItems: {
                    keyArgs: false,
                    merge(existing = [], incoming) {
                        return { ...existing, ...incoming };
                    },
                },
            },
        },
    },
};

const apolloProvider =  {
    // eslint-disable-next-line
    render: ({ Page, props }) => {
        return (
            <ApolloProvider client={props.apollo}>
                <Page {...props} />
            </ApolloProvider>
        );
    },
};

const apolloClient = new ApolloClient({
    link,
    // cache: new InMemoryCache(cacheConfig).restore(initialState || {}),
    cache: new InMemoryCache(cacheConfig),
});

export default withApollo(
    // ({ initialState }) => {
    () => {
        return apolloClient;
    }, apolloProvider,
);

export { apolloClient };