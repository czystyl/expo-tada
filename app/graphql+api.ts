import { schema } from '@/graphql/schema';
import { createYoga } from 'graphql-yoga';

const { handleRequest } = createYoga({
  schema,
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
