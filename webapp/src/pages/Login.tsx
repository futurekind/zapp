import { FC, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { MutationLoginArgs, useLoginMutation } from 'generated/graphql';
import { setCookie } from 'utils/cookie';
import { useNavigate } from 'react-router-dom';
import { useAuthorization } from 'hooks/useAuthorization';
import { useEffect } from 'react';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Bitte gebe eine richtige E-Mail Adresse an')
        .required('Bitte gebe deine E-Mail Adresse an'),
    password: yup.string().required('Bitte gebe dein Passwort ein'),
});

const Login: FC = () => {
    const [{ fetching }, login] = useLoginMutation();
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();
    const user = useAuthorization();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const { values, errors, touched, handleSubmit, handleChange } =
        useFormik<MutationLoginArgs>({
            initialValues: {
                email: '',
                password: '',
            },
            onSubmit: async (values) => {
                setHasError(false);
                const { data, error } = await login(values);

                if (error && error.message.includes('Wrong login credentials'))
                    setHasError(true);

                if (data && data.login) {
                    setCookie(
                        process.env.REACT_APP_TOKEN_COOKIE_NAME as string,
                        data.login
                    );
                    navigate('/');
                }
            },
            validationSchema,
        });

    return (
        <form onSubmit={handleSubmit}>
            {hasError && <p style={{ color: 'red' }}>Falsche Daten</p>}
            <label>
                E-Mail{' '}
                <input
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                />
                {errors.email && touched.email && (
                    <span style={{ color: 'red' }}>{errors.email}</span>
                )}
            </label>
            <br />
            <label>
                Passwort{' '}
                <input
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                />
                {errors.password && touched.password && (
                    <span style={{ color: 'red' }}>{errors.password}</span>
                )}
            </label>
            <br />
            <button disabled={fetching} type="submit">
                Login
            </button>
        </form>
    );
};

export default Login;
