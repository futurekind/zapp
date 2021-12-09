import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { AppContext } from '../../utils/types';

@Resolver()
class LoginResolver {
    @Mutation((returns) => String!)
    async login(
        @Ctx() { prisma }: AppContext,
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) throw new Error('Wrong login credentials');

        const passwordsMatch = await compare(password, user.password);

        if (!passwordsMatch) throw new Error('Wrong login credentials');

        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        const token = sign({ id: user.id }, process.env.JWT_SECRET as string);

        return token;
    }
}

export default LoginResolver;
