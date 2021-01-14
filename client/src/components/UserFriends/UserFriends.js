import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import UserFriendsUI from './UserFriendsUI';
import * as locationsActions from '../../actions/location';
import * as usersActions from '../../actions/users';
import * as flightActions from '../../actions/flight';

class UserFriends extends Component {
    static propTypes = {
        usersActions: PropTypes.object,
        friends: PropTypes.array
    };
    searchFriends = (query)=>{
        this.props.usersActions.searchUsers(query)
    };
    componentDidMount() {
        this.props.usersActions.getFriends();
    }
    sendRequests = (friends)=>{
        friends.map((friend)=>{
            this.props.usersActions.sendRequestForFriendShip(friend._id);
        });
    };
    render() {
        const { friends, openDrawer } = this.props;
        return (
            <UserFriendsUI
                friends={friends}
                onSearchFriends={this.searchFriends}
                handleFriendRequests={this.sendRequests}
                suggestions={this.props.suggestionsAll}
                openDrawer={openDrawer}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        friends: state.users.friends,
        openDrawer: state.users.openDrawer,
        suggestionsAll: state.users.suggestionsAll
    };
};

const mapDispatchToProps = dispatch => ({
    usersActions: bindActionCreators(usersActions, dispatch),
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(UserFriends);

