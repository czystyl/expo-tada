import { writeFileSync } from 'fs';
import { printSchema, lexicographicSortSchema } from 'graphql';
import SchemaBuilder from '@pothos/core';
import { getRandomFact } from './getRandomFact';
import type { RandomFact } from './getRandomFact';
import { getNumberFact } from './getNumberFact';

const builder = new SchemaBuilder<{
  Objects: {
    RandomFact: RandomFact;
    NumberFact: { text: string };
  };
}>({});

builder.objectType('RandomFact', {
  fields: (t) => ({
    id: t.exposeID('id'),
    text: t.exposeString('text'),
    source: t.exposeString('source'),
    sourceUrl: t.exposeString('source_url'),
    language: t.exposeString('language'),
    permalink: t.exposeString('permalink'),
  }),
});

builder.objectType('NumberFact', {
  fields: (t) => ({
    text: t.exposeString('text'),
  }),
});

builder.queryType({
  fields: (t) => ({
    randomFact: t.field({
      type: 'RandomFact',
      resolve: (_parent) => getRandomFact(),
    }),

    numberFact: t.field({
      type: 'NumberFact',
      args: {
        number: t.arg.int({ required: true }),
      },
      resolve: (_parent, args) => getNumberFact(args.number),
    }),
  }),
});

export const schema = builder.toSchema();
/**
 * Write schema to file for gql.tada to use
 */
const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync('./schema.graphql', schemaAsString);
