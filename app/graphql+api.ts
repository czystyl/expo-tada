import { createYoga } from 'graphql-yoga';
import { writeFileSync } from 'fs';
import { printSchema, lexicographicSortSchema } from 'graphql';
import SchemaBuilder from '@pothos/core';

const builder = new SchemaBuilder({});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (_parent, { name }) => `hello, ${name || 'World'}`,
    }),
  }),
});

const schema = builder.toSchema();
const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync('./schema.graphql', schemaAsString);

const { handleRequest } = createYoga({
  schema: builder.toSchema(),
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
