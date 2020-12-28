import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';

const Client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export default Client;
