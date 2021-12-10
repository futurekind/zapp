import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { AppContext } from '../../utils/types';

export const isAuthorized: MiddlewareFn<AppContext> = async (
    { context: { prisma, headers } },
    next
) => {
    const token = headers.authorization?.replace('Bearer ', '');

    if (!token) throw new Error('Not authorized');

    try {
        const tokenData = verify(token, process.env.JWT_SECRET as string) as {
            id: string;
        };
        const user = await prisma.user.findUnique({
            where: { id: tokenData.id },
        });

        if (!user) throw new Error('Not authorized');
    } catch (err) {
        throw new Error('Not authorized');
    }

    return next();
};
