/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { IResolvers } from '@graphql-tools/utils';
import * as glob from 'glob';
import type { DocumentNode } from 'graphql';
import {
  DateTimeTypeDefinition,
  EmailAddressTypeDefinition,
  JSONDefinition,
} from 'graphql-scalars';

const typeDefs: DocumentNode | string[] = [
  DateTimeTypeDefinition,
  EmailAddressTypeDefinition,
  JSONDefinition,
];

const resolvers: IResolvers[] = [];

glob.sync(__dirname + '/modules/*/graphql.ts').forEach((file) => {
  const f = require(file);
  if (f.typeDef) typeDefs.push(f.typeDef);
  if (f.resolvers) resolvers.push(f.resolvers);
});

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
});
