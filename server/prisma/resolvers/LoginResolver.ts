import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
class LoginResolver {
    @Mutation((returns) => String!)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        return new Promise((res) => res('hey'));
    }
}

export default LoginResolver;
