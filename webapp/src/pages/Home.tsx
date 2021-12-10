import { FC } from 'react';
import { useAuthorization } from 'hooks/useAuthorization';

const Home: FC = () => {
    const me = useAuthorization();
    if (!me) return null;

    return <span>Hey {me.firstname}</span>;
};

export default Home;
