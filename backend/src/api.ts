/* eslint-disable @typescript-eslint/no-var-requires */
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { IResolvers } from '@graphql-tools/utils';
import * as glob from 'glob';
import type { DocumentNode } from 'graphql';
import { DateTimeTypeDefinition } from 'graphql-scalars';

const typeDefs: DocumentNode | string[] = [DateTimeTypeDefinition];
const resolvers: IResolvers[] = [];

glob.sync(__dirname + '/datastructures/*/graphql.ts').forEach((file) => {
  const f = require(file);
  if (f.typeDef) typeDefs.push(f.typeDef);
  if (f.resolvers) resolvers.push(f.resolvers);
});

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});
