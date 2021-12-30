import { FC } from 'react';

import { MeQuery } from 'generated/graphql';
import PageHeader from './PageHeader';
import Sidebar from './Sidebar';

const Page: FC<{ me: MeQuery['me']; pageTitle?: string }> = ({
    me,
    pageTitle,
    children,
}) => {
    return (
        <div>
            <Sidebar me={me} />
        </div>
    );
};

export default Page;
