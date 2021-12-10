import { useMeQuery } from 'generated/graphql';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthorization = () => {
    const [{ data: me, error }] = useMeQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (error && error.message.includes('Not authorized'))
            navigate('/login');
    }, [error, navigate]);

    return me;
};
