import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import UserProfileUI from './UserProfileUI';
import * as locationsActions from '../../actions/location';
import * as usersActions from '../../actions/users';
import * as flightActions from '../../actions/flight';

class Login extends Component {
    static propTypes = {
        usersActions: PropTypes.object,
        flights: PropTypes.array
    };
    componentDidMount() {
        this.props.usersActions.getRecentFlights();
        this.props.usersActions.getRecentWorkReqs(2)
    }
    render() {
        const { flights, workReqs, openDrawer } = this.props;
        return (
            <UserProfileUI flights={flights} workReqs={workReqs}  />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        flights: state.users.flights,
        workReqs: state.users.workReqs,
        openDrawer: state.users.openDrawer
    };
};

const mapDispatchToProps = dispatch => ({
    usersActions: bindActionCreators(usersActions, dispatch),
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

