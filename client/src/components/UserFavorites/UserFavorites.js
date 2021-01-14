import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import UserFavoritesUI from './UserFavoritesUI';
import * as locationsActions from '../../actions/location';
import * as usersActions from '../../actions/users';
import Loader  from '../Loader';

class UserFavorites extends Component {
    static propTypes = {
        usersActions: PropTypes.object,
        landscapes: PropTypes.array,
        cities: PropTypes.array
    };
    componentDidMount() {
        if(this.props.mode === "landscape") {
            this.props.usersActions.getFavoriteLandscapes();
        } else {
            this.props.usersActions.getFavoriteCities();
        }
    }
    addCity = (city) => {
        this.props.usersActions.addFavCity(city);
    };
    addLandscape = (landscape) => {
        this.props.usersActions.addLandscape(landscape);
    };
    handlecities = (cities) => {
        cities.forEach((city)=>{
            if(this.props.mode === "city") {
                this.addCity(city._id);
            } else if(this.props.mode === "landscape") {
                this.addLandscape(city._id);
            }
        });
    };
    searchLocation = (query) => {
        this.props.locationsActions.searchLocation(query);
    };
    render() {
        const { cities, landscapes, openDrawer,suggestions, mode } = this.props;
        // if(this.props.isFetching) {
        //     return <Loader />
        // }
        return (
            <UserFavoritesUI
                handlecities={this.handlecities}
                loading = {this.props.isFetching}
                suggestions={suggestions} onsearchLocation={this.searchLocation} mode={mode} openDrawer={openDrawer} cities={cities} landscapes={landscapes}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        landscapes: state.users.landscapes,
        cities: state.users.cities,
        openDrawer: state.users.openDrawer,
        suggestions: state.locations.suggestions,
        isFetching: state.locations.isFetching || state.users.isFetching,
    };
};

const mapDispatchToProps = dispatch => ({
    usersActions: bindActionCreators(usersActions, dispatch),
    locationsActions: bindActionCreators(locationsActions, dispatch)
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(UserFavorites);

