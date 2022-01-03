import { FC } from 'react';
import { ProtectedPage, withProtection } from 'utils/withProtection';
import Page from 'components/Page';

const AddFeedPage: FC<ProtectedPage> = ({ me }) => {
    return <Page me={me}></Page>;
};

export default withProtection(AddFeedPage);
