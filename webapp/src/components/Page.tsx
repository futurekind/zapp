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
            <PageHeader
                avatarInitials={`${me.firstname.charAt(0)}${me.lastname.charAt(
                    0
                )}`}
            />

            <Sidebar />
        </div>
    );
};

export default Page;
