import { Args, Ctx, Mutation, Resolver } from 'type-graphql';
import { AppContext } from '../../utils/types';
import { CreateFeedArgs, Feed } from '@generated/type-graphql';
import { isAuthorized } from '../middleware/isAuthorized';

@Resolver()
class FeedResolver {
    @Mutation(() => Feed!)
    async createFeed(
        @Ctx() ctx: AppContext,
        @Args() { data }: CreateFeedArgs
    ): Promise<Feed> {
        const userId = await isAuthorized(ctx);

        const feed = await ctx.prisma.feed.create({
            data: {
                ...data,
                orderIndex: 0,
                user: { connect: { id: userId } },
            },
        });

        return feed;
    }
}

export default FeedResolver;
