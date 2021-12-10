import { verify } from 'jsonwebtoken';
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { AppContext } from '../../utils/types';
import { User } from '../generated/type-graphql';
import { isAuthorized } from '../middleware/isAuthorized';

@Resolver()
class MeResolver {
    @Query(() => User!)
    @UseMiddleware(isAuthorized)
    async me(@Ctx() { prisma, headers }: AppContext): Promise<User> {
        const token = headers.authorization?.replace('Bearer ', '');

        const tokenData = verify(token!, process.env.JWT_SECRET as string) as {
            id: string;
        };
        const user = await prisma.user.findUnique({
            where: { id: tokenData.id },
        });

        return user!;
    }
}

export default MeResolver;
