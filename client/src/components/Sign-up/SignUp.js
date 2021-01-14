import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import SignUpUI from './SignUpUI';
import * as loginActions from '../../actions/auth';
import * as messageActions from '../../actions/message';
import Loader from '../Loader';

class SignUp extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
        signupAction: PropTypes.func.isRequired
    };
    handleSignUp = (email, password, country, age) => {
        this.props.signupAction(email, password, country, age,'user');
    };
    render() {
        if(this.props.isFetching) {
            return <Loader />
        }
        return (
            <SignUpUI signup={this.handleSignUp}/>
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

const mapDispatchToProps = dispatch => bindActionCreators({signupAction: loginActions.signup}, dispatch);

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);

