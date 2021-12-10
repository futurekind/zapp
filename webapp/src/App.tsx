import Home from 'pages/Home';
import { FC } from 'react';
import { createClient, Provider } from 'urql';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const client = createClient({
    url: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
});

const App: FC = () => {
    return (
        <Provider value={client}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
