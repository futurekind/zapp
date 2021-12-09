// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import LoginResolver from './prisma/resolvers/LoginResolver';
import { resolvers } from './prisma/generated/type-graphql';
import RegisterResolver from './prisma/resolvers/RegisterResolver';

const main = async () => {
    const prisma = new PrismaClient();

    const schema = await buildSchema({
        resolvers: [...resolvers, LoginResolver, RegisterResolver],
        validate: false,
    });

    const server = new ApolloServer({
        schema,
        context: () => ({ prisma }),
    });

    const { url } = await server.listen(process.env.GRAPHQL_SERVER_PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
};

main();
