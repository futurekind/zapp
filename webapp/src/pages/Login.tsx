import { FC, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { MutationLoginArgs, useLoginMutation } from 'generated/graphql';
import { setCookie } from 'utils/cookie';
import { useNavigate } from 'react-router-dom';
import { useAuthorization } from 'hooks/useAuthorization';
import { useEffect } from 'react';
import {
    EuiPageTemplate,
    EuiFieldText,
    EuiFormRow,
    EuiForm,
    EuiCallOut,
    EuiSpacer,
    EuiTitle,
    EuiButton,
    EuiFlexGroup,
} from '@elastic/eui';

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
        <EuiPageTemplate
            template="centeredBody"
            pageContentProps={{ paddingSize: 'm' }}
        >
            <EuiForm onSubmit={handleSubmit} component="form">
                <EuiTitle>
                    <h1>Login</h1>
                </EuiTitle>
                <EuiSpacer size="xxl" />
                {hasError && (
                    <>
                        <EuiCallOut
                            title="Probleme beim Einloggen"
                            color="danger"
                            iconType="alert"
                        >
                            Die angegebenen Zugangsdaten scheinen nicht zu
                            stimmen.
                        </EuiCallOut>
                        <EuiSpacer size="l" />
                    </>
                )}

                <EuiFormRow
                    label="E-Mail Adresse"
                    error={errors.email}
                    isInvalid={touched.email && errors.email !== undefined}
                >
                    <EuiFieldText
                        value={values.email}
                        onChange={handleChange}
                        name="email"
                        size={100}
                    />
                </EuiFormRow>

                <EuiFormRow
                    label="Passwort"
                    error={errors.password}
                    isInvalid={
                        touched.password && errors.password !== undefined
                    }
                >
                    <EuiFieldText
                        value={values.password}
                        onChange={handleChange}
                        name="password"
                        type="password"
                    />
                </EuiFormRow>

                <EuiSpacer size="l" />

                <EuiFlexGroup alignItems="flexEnd" gutterSize="none">
                    <EuiButton
                        isLoading={fetching}
                        type="submit"
                        color="accent"
                    >
                        Login
                    </EuiButton>
                </EuiFlexGroup>
            </EuiForm>
        </EuiPageTemplate>
    );
};

export default Login;
