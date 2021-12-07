// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
    Query: {
        hello: (_: any, { name }: any) => `Hello ${name || 'World'}`,
    },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start({ port: process.env.GRAPHQL_SERVER_PORT }, () =>
    console.log(
        `Server is running on localhost:${process.env.GRAPHQL_SERVER_PORT}`
    )
);
