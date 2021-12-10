import { FC } from 'react';
import { createClient, Provider } from 'urql';

const client = createClient({
    url: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
});

const App: FC = () => {
    return (
        <Provider value={client}>
            <h1>App</h1>
        </Provider>
    );
};

export default App;
