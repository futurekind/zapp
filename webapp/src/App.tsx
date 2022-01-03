import Home from 'pages/Home';
import { FC } from 'react';
import { createClient, Provider } from 'urql';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { getCookie } from 'utils/cookie';
import Login from 'pages/Login';
import Add from 'components/Add';

const client = createClient({
    url: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
    fetchOptions: () => {
        const token = getCookie(
            process.env.REACT_APP_TOKEN_COOKIE_NAME as string
        );
        return {
            headers: { authorization: token ? `Bearer ${token}` : '' },
        };
    },
});

const App: FC = () => {
    return (
        <Provider value={client}>
            <main className="bg-slate-700 h-screen overflow-hidden text-white">
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate replace to="/all" />}
                        />
                        <Route path="/all" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/add" element={<Add />} />
                    </Routes>
                </Router>
            </main>
        </Provider>
    );
};

export default App;
