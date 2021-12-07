// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { resolvers } from './prisma/generated/type-graphql';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

const main = async () => {
    const prisma = new PrismaClient();

    const schema = await buildSchema({ resolvers, validate: false });

    const server = new ApolloServer({
        schema,
        context: () => ({ prisma }),
    });

    const { url } = await server.listen(process.env.GRAPHQL_SERVER_PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
};

main();
