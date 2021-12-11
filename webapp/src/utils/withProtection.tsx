import { MeQuery } from 'generated/graphql';
import { useAuthorization } from 'hooks/useAuthorization';
import { FC } from 'react';

export interface ProtectedPage {
    me: MeQuery['me'];
}

export const withProtection = (Page: FC<ProtectedPage>) => {
    const ProtectedPage: FC = () => {
        const me = useAuthorization();
        if (!me) return null;

        return <Page me={me} />;
    };

    return ProtectedPage;
};
