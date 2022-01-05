import { Args, Ctx, Mutation, Resolver } from 'type-graphql';
import { AppContext } from '../../utils/types';
import { CreateUserArgs, User as GQLUser } from '../generated/type-graphql';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

@Resolver()
class RegisterResolver {
    @Mutation(() => GQLUser!)
    async register(
        @Ctx() { prisma }: AppContext,
        @Args() { data }: CreateUserArgs
    ): Promise<User> {
        const password = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                ...data,
                password,
            },
        });

        return user;
    }
}

export default RegisterResolver;
