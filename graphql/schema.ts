import { writeFileSync } from 'fs';
import { printSchema, lexicographicSortSchema } from 'graphql';
import SchemaBuilder from '@pothos/core';
import { getRandomFact } from './getRandomFact';
import type { Fact } from './getRandomFact';

const builder = new SchemaBuilder<{
  Objects: { Fact: Fact };
}>({});

builder.objectType('Fact', {
  fields: (t) => ({
    id: t.exposeID('id'),
    text: t.exposeString('text'),
    source: t.exposeString('source'),
    sourceUrl: t.exposeString('source_url'),
    language: t.exposeString('language'),
    permalink: t.exposeString('permalink'),
  }),
});

builder.queryType({
  fields: (t) => ({
    randomFact: t.field({
      type: 'Fact',
      resolve: (_parent) => getRandomFact(),
    }),
  }),
});

export const schema = builder.toSchema();
/**
 * Write schema to file for gql.tada to use
 */
const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync('./schema.graphql', schemaAsString);
