import { FC } from 'react';
import { useMeQuery } from 'generated/graphql';

const Home: FC = () => {
    const [{ data: meData, error }] = useMeQuery();

    console.log(meData, error);

    return <span>Home</span>;
};

export default Home;
