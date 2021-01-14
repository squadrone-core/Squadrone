import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import LoginUI from './LoginUI';
import * as loginActions from '../../actions/auth';
import Loader from '../Loader';

class Login extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
        loginAction: PropTypes.func
    };
    handleLogin = (email,password) => {
        this.props.loginAction(email,password);
    };
    render() {
        if(this.props.isFetching) {
            return <Loader />
        }
        return (
            <LoginUI login={this.handleLogin} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        isFetching: state.auth.isFetching,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({loginAction: loginActions.login}, dispatch);

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

