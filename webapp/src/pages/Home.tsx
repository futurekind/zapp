import { FC } from 'react';
import { ProtectedPage, withProtection } from 'utils/withProtection';

const Home: FC<ProtectedPage> = ({ me }) => {
    return <span>Hey {me.firstname}</span>;
};

export default withProtection(Home);
