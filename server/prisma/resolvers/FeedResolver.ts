import {
    Arg,
    Args,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql';
import { AppContext } from '../../utils/types';
import { CreateFeedArgs, Feed } from '@generated/type-graphql';
import { isAuthorized } from '../middleware/isAuthorized';
import Parser from 'rss-parser';

@ObjectType()
class ParserOutput {
    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    feedUrl?: string;

    @Field({ nullable: true })
    iconUrl?: string;
}

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
                category: data.category,
            },
        });

        return feed;
    }

    @Query(() => ParserOutput!)
    async parseFeed(
        @Ctx() ctx: AppContext,
        @Arg('url') url: string
    ): Promise<ParserOutput | null> {
        const parser = new Parser();
        const result = await parser.parseURL(url);

        return result;
    }
}

export default FeedResolver;
