require('dotenv').config();
import { GraphQLServer } from 'GraphqlServer';

const typeDefs = `
    type: Query {
        hello: String!
    }
`;

const resolvers = {
  Query: {
    hello: () => 'Hi'
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
