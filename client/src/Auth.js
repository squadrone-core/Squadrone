import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        static propTypes = {
            isAuthenticated: PropTypes.bool,
            redirect: PropTypes.func.isRequired,
            user: PropTypes.object
        };

        render() {
            return (
                <div>
                    { localStorage.getItem('token') ? <ComposedComponent {...this.props}>
                        { this.props.children }
                    </ComposedComponent> : <Redirect to="/login" /> }
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            user: state.auth.user
        };
    };

    return connect(
        mapStateToProps)(Authenticate);
}
