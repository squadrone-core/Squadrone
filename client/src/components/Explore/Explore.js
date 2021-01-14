import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import ExploreUI from './ExploreUI';
import * as locationsActions from '../../actions/location';
import * as usersActions from '../../actions/users';
import * as flightActions from '../../actions/flight';

class Login extends Component {
    static propTypes = {
        locationInfo: PropTypes.object,
        locationsActions: PropTypes.object,
        usersActions: PropTypes.object,
        suggestions: PropTypes.array,
        drones: PropTypes.array
    };
    handleLogin = (email,password) => {
        this.props.loginAction(email,password);
    };
    componentDidMount() {
        this.props.locationsActions.getLocationInfo(this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.locationInfo && nextProps.locationInfo !== this.props.locationInfo) {
            this.props.locationsActions.getAvailableDrones(nextProps.locationInfo.geometry.coordinates[0],nextProps.locationInfo.geometry.coordinates[1]);
        }
    }
    searchFriends = (query)=>{
        this.props.usersActions.searchFriends(query)
    };
    initiateFlight = (drone, passengers, options, path, droneStatus, friends) => {
        this.props.flightActions.initiateFlight(drone, passengers, options, this.props.match.params.id, path, droneStatus, friends);
        if(path && path.length !== 0) {
            let  msgdata=[];
            path.map((point, index) => {
                msgdata[index] = {};
                msgdata[index]["frame"] = 3;
                msgdata[index]["command"] = 16;
                msgdata[index]["is_current"] = index === 0;
                msgdata[index]["autocontinue"] = true;
                msgdata[index]["param1"] = 0;
                msgdata[index]["param2"] = 1;
                msgdata[index]["param3"] = 0;
                msgdata[index]["param4"] = 0;
                msgdata[index]["x_lat"] = parseFloat(point.coordinates[1]);
                msgdata[index]["y_long"] = parseFloat(point.coordinates[0]);
                msgdata[index]["z_alt"] = 5;
            });
            this.props.flightActions.setWayPoints(msgdata);
        }
    };
    attendFlight = (droneId) => {
        this.props.flightActions.attendFlight(droneId);
    };
    render() {
        return (
            <ExploreUI
                onSearchFriends={this.searchFriends}
                location={this.props.locationInfo}
                suggestions={this.props.suggestions}
                availableDrones={this.props.drones}
                // handleFriendRequests={this.sendRequests}
                handleFlightSubmit={this.initiateFlight}
                handleAttendFlight={this.attendFlight}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        locationInfo: state.locations.locationInfo,
        suggestions: state.users.suggestions,
        drones: state.locations.drones,
    };
};

const mapDispatchToProps = dispatch => ({
    locationsActions: bindActionCreators(locationsActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
    flightActions: bindActionCreators(flightActions, dispatch),
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

