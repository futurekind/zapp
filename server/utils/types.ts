import { PrismaClient } from '@prisma/client';
import { ExpressContext } from 'apollo-server-express';

export interface AppContext {
    prisma: PrismaClient;
    headers: ExpressContext['req']['headers'];
}
