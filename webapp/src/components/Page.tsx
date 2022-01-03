import { FC } from 'react';

import { MeQuery } from 'generated/graphql';
import Sidebar from './Sidebar';

const Page: FC<{ me: MeQuery['me']; pageTitle?: string }> = ({
    me,
    pageTitle,
    children,
}) => {
    return (
        <div>
            <Sidebar me={me} />
            <div className="ml-14 lg:ml-80 p-4 lg:p-10 pt-6 lg:pt-7">
                {pageTitle && (
                    <h1 className="text-xl pb-2 border-b border-b-slate-500 mb-8">
                        {pageTitle}
                    </h1>
                )}
                {children}
            </div>
        </div>
    );
};

export default Page;
