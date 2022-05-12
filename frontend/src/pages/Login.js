// @flow
import React, { useEffect, useState } from 'react';
import useApi from '../services/api';

import { Button, Alert } from 'react-bootstrap';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

// actions
import { resetAuth, loginUser } from '../redux/actions';

// components
import { VerticalForm, FormInput } from '../components';

import AccountLayout from './AccountLayout';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t("Don't have an account?")}{' '}
                <Link to={'/account/register'} className="text-muted ms-1">
                    <b>{t('Sign Up')}</b>
                </Link>
            </p>
        </footer>
    );
};

const Login2 = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const location = useLocation();
    const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/';

    const api = useApi();
    const history = useNavigate();

    const [user, setuser] = useState('');
    const [password, setPass] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const handleLoginButton = async (username, pass) => {
        try {
            if (username && pass) {
                console.log(username);
                console.log('this pass is ',pass);
                setLoading(true);
                const data = {
                    username: username,
                    password: pass,
                };
                const result = await api.login(data);
                setLoading(false);

                if (result.msg === "¡Success!") {
                    localStorage.setItem('token', result.token);
                    console.log(result)
                    history('/');
                } else {
                    setError(result.msg);
                }
            } else {
                setError('Digite os dados');
            }
        } catch (error) {
            setError('#001 - local - Erro de conexão com a API');
        }
    };

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required(t('Please enter Username')),
            password: yup.string().required(t('Please enter Password')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        handleLoginButton(formData['username'], formData['password']);

        // dispatch(loginUser(formData['username'], formData['password']));
    };

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <h4 className="mt-0">{t('Log In')}</h4>
                <p className="text-muted mb-4">{t('Digite seu email e conta para acessar o sistema.')}</p>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
                    <FormInput
                        label={t('Username')}
                        type="text"
                        name="username"
                        placeholder={t('Enter your Username')}
                        containerClass={'mb-3'}
                        value={user}
                        onChange={(e) => setuser(e.target.value)}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder={t('Enter your password')}
                        onChange={(e) => setPass(e.target.value)}
                        containerClass={'mb-3'}></FormInput>

                    <div className="d-grid mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            <i className="mdi mdi-login"></i> {t('Log In')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Login2;
