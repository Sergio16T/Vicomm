import { ApolloClient, InMemoryCache } from '@apollo/client';
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/client';
import { endPoint } from '../config'; 


export default withApollo(
    ({ initialState }) => {
      return new ApolloClient({
        uri: endPoint,
        cache: new InMemoryCache().restore(initialState || {})
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
