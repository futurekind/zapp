import { FC } from 'react';
import { ProtectedPage, withProtection } from 'utils/withProtection';
import Page from 'components/Page';

const Home: FC<ProtectedPage> = ({ me }) => {
    return <Page me={me} pageTitle="Deine Liste" />;
};

export default withProtection(Home);
