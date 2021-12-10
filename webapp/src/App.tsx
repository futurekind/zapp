import Home from 'pages/Home';
import { FC } from 'react';
import { createClient, Provider } from 'urql';

const client = createClient({
    url: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
});

const App: FC = () => {
    return (
        <Provider value={client}>
            <Home />
        </Provider>
    );
};

export default App;
