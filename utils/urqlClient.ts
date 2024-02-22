import { Client, cacheExchange, fetchExchange } from 'urql';

export const client = new Client({
  url: 'http://localhost:8081/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

import { initGraphQLTada } from 'gql.tada';
import type { introspection } from '../graphql-env.d.ts';

export const graphql = initGraphQLTada<{
  introspection: introspection;
}>();

export type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada';
export { readFragment } from 'gql.tada';
