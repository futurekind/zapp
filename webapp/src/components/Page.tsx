import { FC } from 'react';

import { MeQuery } from 'generated/graphql';
import PageHeader from './PageHeader';

const Page: FC<{ me: MeQuery['me']; pageTitle?: string }> = ({
    me,
    pageTitle,
    children,
}) => {
    return (
        <>
            <PageHeader />
        </>
    );
};

export default Page;
