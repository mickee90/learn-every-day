import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';

import Alert from '../components/UI/Alert';
import Aux from './Aux';

const errorHandler = (WrappedComponent, axios) => {
    
    const ErrorHandler = props => {
        const [error, setError] = useState(null)
    
        const reqInterceptor = axios.interceptors.request.use(req => {
            if(req.data !== undefined && !req.data.ignoreAuthCheck) {
                checkExpire();
            }
            const token = props.auth.token;
            req.headers.Authorization = token ? `Bearer ${token}`: '';
            return req;
        }, err => {
            setError({message: 'Something went wrong. Please try again.'});
            setTimeout(() => {
                setError(null);
            }, 3000);
        });

        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            
            let new_error = {
                message: err.response.statusText,
                code: err.response.status
            }
            if(err.response.data !== null) {
                new_error = {
                    message: err.response.data.content,
                    code: err.response.data.status_code
                }
            }

            setError(new_error);
            setTimeout(() => {
                setError(null);
            }, 3000);
        });

        const checkExpire = () =>  {
            const authExpire = props.auth.expireTime;
            if(authExpire <= new Date()) {
                setError({message: 'The login token has expired. You are gonna be logged out.'});
                
                setTimeout(() => {
                    actions.logout();
                    props.history.push("/");
                }, 1000);
            }
        };

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Aux>
                <Alert 
                    classes={error ? 'error' : ''}
                    alertClose={errorConfirmedHandler}
                >
                {error ? error.message : ''}
                </Alert>
                <WrappedComponent {...props} />
            </Aux>
        );
    }

    const mapStateToProps = state => {
        return {
            auth: state.auth
        }
    };

    return connect(mapStateToProps, null)(ErrorHandler);
}


export default errorHandler;