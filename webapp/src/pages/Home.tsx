import { FC } from 'react';
import { ProtectedPage, withProtection } from 'utils/withProtection';
import Page from 'components/Page';
import { Link } from 'react-router-dom';

const Home: FC<ProtectedPage> = ({ me }) => {
    if (me._count.feed === 0) {
        return (
            <Page me={me}>
                <div className="flex flex-col h-screen items-center justify-center">
                    <h1 className="text-2xl mb-2">
                        There are no feeds to show...
                    </h1>
                    <p>
                        Try to{' '}
                        <Link to="/add" className="text-teal-300 underline">
                            add some feeds
                        </Link>{' '}
                        to your reading list.
                    </p>
                </div>
            </Page>
        );
    }
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
