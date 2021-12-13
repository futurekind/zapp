import { FC } from 'react';
import { ProtectedPage, withProtection } from 'utils/withProtection';
import { EuiPageTemplate } from '@elastic/eui';

const Home: FC<ProtectedPage> = ({ me }) => {
    return (
        <EuiPageTemplate
            template="centeredBody"
            pageContentProps={{ paddingSize: 'none' }}
        >
            <span>Hey {me.firstname}</span>
        </EuiPageTemplate>
    );
};

export default withProtection(Home);
