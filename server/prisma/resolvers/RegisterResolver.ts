import { Args, Ctx, Mutation, Resolver } from 'type-graphql';
import { AppContext } from '../../utils/types';
import { CreateUserArgs, User } from '../generated/type-graphql';
import * as bcrypt from 'bcryptjs';

@Resolver()
class RegisterResolver {
    @Mutation(() => User!)
    async register(
        @Ctx() { prisma }: AppContext,
        @Args() { data }: CreateUserArgs
    ): Promise<User> {
        const password = await bcrypt.hash(data.password, 10);

        return prisma.user.create({
            data: {
                ...data,
                password,
            },
        });
    }
}

export default RegisterResolver;
