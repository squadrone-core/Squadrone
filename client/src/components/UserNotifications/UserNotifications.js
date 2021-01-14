import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import UserNotificationsUI from './UserNotificationsUI';
import * as locationsActions from '../../actions/location';
import * as usersActions from '../../actions/users';
import * as flightActions from '../../actions/flight';
import history from '../../history';

class UserNotifications extends Component {
    static propTypes = {
        usersActions: PropTypes.object,
        requests: PropTypes.array
    };
    updateRequest = (id,status) => {
        let request = null;
        this.props.requests.forEach(req => {
            if(req._id === id) {
                request = req;
            }
        });
        this.props.usersActions.updateWorkRequest(id, status);
        if(request.type === "flight") {
            history.push({pathname:`/flights/${request.forFlight._id}`, state: {drone: request.forFlight.drone}})
        }
    };
    componentDidMount() {
        this.props.usersActions.getRequests();
    }
    sendRequests = (friends)=>{
        friends.map((friend)=>{
            this.props.usersActions.sendRequestForFriendShip(friend._id);
        });
    };
    render() {
        console.log(this.props);
        const { requests, openDrawer } = this.props;
        return (
            <UserNotificationsUI
                requests={requests}
                onUpdateRequest={this.updateRequest}
                openDrawer={openDrawer}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        requests: state.users.requests,
        openDrawer: state.users.openDrawer,
    };
};

const mapDispatchToProps = dispatch => ({
    usersActions: bindActionCreators(usersActions, dispatch),
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(UserNotifications);

