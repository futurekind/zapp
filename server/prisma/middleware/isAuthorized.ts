import { verify } from 'jsonwebtoken';
import { AppContext } from '../../utils/types';

export const isAuthorized = async ({ prisma, headers }: AppContext) => {
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

        return user.id;
    } catch (err) {
        throw new Error('Not authorized');
    }
};
