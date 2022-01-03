import { FC } from 'react';
import { ProtectedPage, withProtection } from 'utils/withProtection';
import Page from 'components/Page';

const Home: FC<ProtectedPage> = ({ me }) => {
    return (
        <Page me={me} pageTitle="All Feeds">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis, fuga.
            </p>
        </Page>
    );
};

export default withProtection(Home);
