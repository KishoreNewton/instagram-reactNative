import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import * as path from 'path';

const allTypes = loadFilesSync(
  path.join(__dirname, '/graphql/**/**/*.graphql')
);
const allResolvers = loadFilesSync(
  path.join(__dirname, '/graphql/**/**/*.ts')
);

interface makeExe {
  typeDefs: any
  resolvers: any 
}

const schema = makeExecutableSchema<makeExe>({
  typeDefs: mergeTypeDefs(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
