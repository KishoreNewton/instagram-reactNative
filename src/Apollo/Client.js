import ApolloClient from 'apollo-boost';

const ApolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

export default ApolloClient;
