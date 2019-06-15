import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

import * as actions from '../store/actions/index';

import Alert from '../components/UI/Alert';
import Aux from './Aux';

const errorHandler = (WrappedComponent, axios) => {
    
    class ErrorHandler extends Component {
    
        constructor(props) {
            super(props);

            this.state = { error: null }

            this.reqInterceptor = axios.interceptors.request.use(req => {
                if(req.data !== undefined && !req.data.ignoreAuthCheck) {
                    this.checkExpire();
                }
                const token = this.props.auth.token;
                req.headers.Authorization = token ? `Bearer ${token}`: '';
                return req;
            }, error => {
                this.setState({error: { message: 'Something went wrong. Please try again.' }});
                setInterval(() => {
                    this.setState({error: null});
                }, 3000);
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                console.log('res error 1', err, err.response);
                let error = {
                    message: err.response.statusText,
                    code: err.response.status
                }
                if(err.response.data !== null) {
                    error = {
                        message: err.response.data.content,
                        code: err.response.data.status_code
                    }
                }

                this.setState({error: error});
                setInterval(() => {
                    this.setState({error: null});
                }, 3000);
            });
        }

        checkExpire = () =>  {
            const authExpire = this.props.auth.expireTime;
            if(authExpire <= new Date()) {
                this.setState({error: {message: 'The login token has expired. You are gonna be logged out'}});
                setInterval(() => {
                    actions.logout();
                    this.props.history.push("/");
                }, 1000);
            }
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Alert 
                        classes={this.state.error ? 'error' : ''}
                        alertClose={this.errorConfirmedHandler}
                    >
                    {this.state.error ? this.state.error.message : ''}
                    </Alert>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            auth: state.auth
        }
    };

    return connect(mapStateToProps, null)(ErrorHandler);
}


export default errorHandler;