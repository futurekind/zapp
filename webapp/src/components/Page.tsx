import { FC } from 'react';

import { MeQuery } from 'generated/graphql';

const Page: FC<{ me: MeQuery['me']; pageTitle?: string }> = ({
    me,
    pageTitle,
    children,
}) => {
    return <h1 className="text-3xl font-bold underline">Hey</h1>;
};

export default Page;
