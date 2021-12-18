// import { Feed, User } from '@prisma/client';
import { Ctx, Query, Resolver } from 'type-graphql';
import { AppContext } from '../../utils/types';
import { User } from '@generated/type-graphql';
import { isAuthorized } from '../middleware/isAuthorized';

@Resolver()
class MeResolver {
    @Query(() => User)
    async me(@Ctx() ctx: AppContext): Promise<User | null> {
        const userId = await isAuthorized(ctx);
        const user = await ctx.prisma.user.findFirst({
            where: { id: userId },
            include: { feed: true },
        });

        return user as User | null;
    }
}

export default MeResolver;
