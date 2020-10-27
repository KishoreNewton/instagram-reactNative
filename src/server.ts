import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from './schema';
import logger from 'morgan';
import { sendSecretMail } from './utils';

sendSecretMail('kishorenke@gmail.com', '123');
// @ts-ignore
const PORT: number = process.env.INSTAGRAMRN_PORT | 4000;
const app = express.default();
app.use(logger('dev'));

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
