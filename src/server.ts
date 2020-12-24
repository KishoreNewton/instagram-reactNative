import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from './schema';
import logger from 'morgan';
import { isAuthenticated } from "./middlewares";
import { authenticateJwt } from './passport';

// @ts-ignore
const PORT: number = process.env.INSTAGRAMRN_PORT | 4000;
const app = express.default();
app.use(logger('dev'));
app.use(authenticateJwt);

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

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({req, isAuthenticated})
});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
  )
);
