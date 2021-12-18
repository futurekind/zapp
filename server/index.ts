// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import LoginResolver from './prisma/resolvers/LoginResolver';
import RegisterResolver from './prisma/resolvers/RegisterResolver';
import MeResolver from './prisma/resolvers/MeResolver';
import { UserRelationsResolver } from '@generated/type-graphql';

const main = async () => {
    const prisma = new PrismaClient();

    const schema = await buildSchema({
        resolvers: [
            UserRelationsResolver,
            LoginResolver,
            RegisterResolver,
            MeResolver,
        ],
        validate: false,
    });

    const server = new ApolloServer({
        schema,
        context: ({ req }) => ({ prisma, headers: req.headers }),
    });

    const { url } = await server.listen(process.env.GRAPHQL_SERVER_PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
};

main();
