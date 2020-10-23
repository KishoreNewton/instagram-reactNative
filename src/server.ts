import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from './schema';

const PORT = 4000;

const app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
  )
);
