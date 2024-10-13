/* eslint-disable @typescript-eslint/no-require-imports */
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { IResolvers } from '@graphql-tools/utils';
import * as glob from 'glob';
import type { DocumentNode } from 'graphql';

const allTypeDefs: DocumentNode[] = [];
const allResolvers: IResolvers[] = [];

glob.sync(__dirname + '/datastructures/*/graphql.ts').forEach((file) => {
  const f = require(file);
  if (f.typeDef) allTypeDefs.push(f.typeDef);
  if (f.resolvers) allResolvers.push(f.resolvers);
});

const typeDefs = mergeTypeDefs(allTypeDefs);
const resolvers = mergeResolvers(allResolvers);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
