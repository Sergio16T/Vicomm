import { ApolloClient, InMemoryCache } from '@apollo/client';
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http'
// import { endPoint } from '../clientConfig'; 

const link = createHttpLink({
  // uri: endPoint,
  uri: process.env.NEXT_PUBLIC_ENDPOINT,
  credentials: 'include'
});


export default withApollo(
    ({ initialState }) => {
      return new ApolloClient({
        link, 
        cache: new InMemoryCache().restore(initialState || {}),
        fetchOptions: {
          mode: 'no-cors',
        },
      });
    },
    {
      render: ({ Page, props }) => {
        return (
          <ApolloProvider client={props.apollo}>
            <Page {...props} />
          </ApolloProvider>
        );
      }
    }
  );
