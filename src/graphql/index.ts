import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://birmanila.nat911.com/api/v2/graphql',
    cache: new InMemoryCache(),
});

export default client;