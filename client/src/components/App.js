import React, { Component } from 'react';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';
import 'normalize.css/normalize.css';
import requireAuth from '../Auth'; //todo: make this work
import './App.css';
import MapComp from './Map';
import Login from './Login/Login';
import SignUp from './Sign-up/SignUp';
import Header from './Header';
import SnakBar from './SnackBar/SnackBar';
import Explore from './Explore/Explore';
import UserProfile from './UserProfile/UserProfile';
import FlightPage from './FlightPage/FlightPage';
import UserFriends from './UserFriends/UserFriends';
import UserWorkReqs from './UserWorkReqs/UserWorkReqs';
import UserFavorites from './UserFavorites/UserFavorites';
import UserNotifications from './UserNotifications/UserNotifications';
import Joystick from './JoyStick';
import Dial from './Dial';
import history from '../history';

class App extends Component {
    componentDidMount() {
        // this.props.fetchLocations();

        const token = localStorage.getItem('token');
        if (token) {
            this.props.loginSuccess({token});
        }
    }

    render() {
        return (
                <Router history={history}>
                    <div>
                        <Header logout={()=>{this.props.logout()}} history={history} />
                        <SnakBar />
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/dial" component={requireAuth(Dial)} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/joystick" component={Joystick} />
                            <Route path="/profile/friends" component={UserFriends} />
                            <Route path="/profile/notifications" component={UserNotifications} />
                            <Route path="/profile/workRequests" component={UserWorkReqs} />
                            <Route path="/profile/favoriteCities" component={()=> <UserFavorites mode="city" />} />
                            <Route path="/profile/favoriteLandscapes" component={()=> <UserFavorites mode="landscape" />} />
                            <Route path="/profile" component={requireAuth(UserProfile)} />
                            <Route path="/explore/:id" component={requireAuth(({match}) => <Explore match={match} />)} />
                            <Route path="/flights/:flightId" component={FlightPage} />
                            <Route path="/" component={MapComp} />
                        </Switch>
                    </div>
                </Router>
        );
    }
}

export default connect(null, actions)(App);
