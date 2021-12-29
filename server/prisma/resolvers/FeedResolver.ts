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
class ParserItem {
    @Field({ nullable: true })
    link?: string;

    @Field({ nullable: true })
    guid?: string;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    pubDate?: string;

    @Field({ nullable: true })
    creator?: string;

    @Field({ nullable: true })
    summary?: string;

    @Field({ nullable: true })
    content?: string;

    @Field({ nullable: true })
    contentSnippet?: string;

    @Field({ nullable: true })
    isoDate?: string;
}

@ObjectType()
class ParserOutput {
    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    feedUrl?: string;

    @Field({ nullable: true })
    link?: string;

    @Field({ nullable: true })
    iconUrl?: string;

    @Field(() => [ParserItem])
    items: ParserItem[];
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
        await isAuthorized(ctx);

        const parser = new Parser();
        const result = await parser.parseURL(url);
        const items = result.items.slice();

        return {
            ...result,
            items: items.sort((a, b) => {
                if (a.isoDate && b.isoDate) {
                    if (a.isoDate > b.isoDate) return -1;
                } else {
                    return -1;
                }

                return 0;
            }),
        };
    }
}

export default FeedResolver;
