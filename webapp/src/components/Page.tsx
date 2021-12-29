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
            <PageHeader
                avatarInitials={`${me.firstname.charAt(0)}${me.lastname.charAt(
                    0
                )}`}
            />
        </>
    );
};

export default Page;
