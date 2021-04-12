import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import UserWorkReqsUI from './UserWorkReqsUI';
import * as locationsActions from '../../actions/location';
import * as usersActions from '../../actions/users';
import * as flightActions from '../../actions/flight';

class UserWorkReqs extends Component {
    static propTypes = {
        usersActions: PropTypes.object,
        friends: PropTypes.array
    };
    searchFriends = (query)=>{
        this.props.usersActions.searchUsers(query)
    };
    componentDidMount() {
        this.props.usersActions.getRecentWorkReqs(5)
    }
    sendRequests = (friends)=>{
        friends.map((friend)=>{
            this.props.usersActions.sendRequestForFriendShip(friend._id);
        });
    };
    updateRequest = (id,status) => {
        this.props.usersActions.updateWorkRequest(id,status);
    };
    render() {
        const { workReqs, openDrawer } = this.props;
        return (
            <UserWorkReqsUI
                workReqs={workReqs}
                openDrawer={openDrawer}
                updateRequest={this.updateRequest}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        openDrawer: state.users.openDrawer,
        workReqs: state.users.workReqs,
    };
};

const mapDispatchToProps = dispatch => ({
    usersActions: bindActionCreators(usersActions, dispatch),
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(UserWorkReqs);

