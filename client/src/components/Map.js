import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import pin from './pin-svg.svg';
import { Link } from "react-router-dom";
import ReactMapboxGl, { Layer, Feature, Popup, GeoJSONLayer } from "react-mapbox-gl";
import './App.css';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import * as locationsActions from '../actions/location';
import * as userActions from '../actions/users';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import SkipNextIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Loader from './Loader';
import history from '../history';

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoibWVocm5henp6IiwiYSI6ImNqczJiYXRxODBrdDc0YWt2eHJuaTdwc3oifQ.AZ5QPOajnt7lO8ZTRKAS5w"
});
const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        height: '8vh',
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    dialogContent: {
        padding: '0'
    },
    dialogContentText: {
        padding: '24px 24px',
        lineHeight: '2.5',
    },
    dialogActions: {
        flexDirection: 'column'
    },
    button: {
        width: '77%',
        height: '48px',
        margin: '12px 4px 15px',
    },
    iconButt: {
        border: '1px solid black',
        padding: '10px',
        borderRadius: '50%'
    }
});
class MapComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            anchorEl: null,
            suggestionsOpen: false,
            center: [12.5674, 41.8719],
            open: false,
            locationClicked: null,
            zoom: 1,
        }

    }
    static propTypes = {
        locations: PropTypes.array.isRequired,
        suggestions: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        locationsActions: PropTypes.object,
    };
    componentDidMount(){
        this.props.locationsActions.getLocationsWithDrones();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.suggestions.length !== 0 && nextProps.suggestions !== this.props.suggestions) {
            this.setState({suggestionsOpen: true})
        }
    }
    searchBoxChange = (e)=>{
        this.setState({query: e.target.value})
    };
    handleClose = (index) => {
        this.setState({ suggestionsOpen: false, center: this.props.suggestions[index].geometry.coordinates, zoom: 3 });
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleModalClose = () => {
        this.setState({ open: false });
    };
    render() {
        const image = new Image(30, 50);
        const { classes, fullScreen } = this.props;
        image.src = pin;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const id = open ? 'no-transition-popper' : null;
        const images = ["myImage", image];
        return (
            <div className="map-container">
                {this.props.isFetching && <Loader />}
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        onKeyPress={e => { if(e.which == '13') this.props.locationsActions.searchLocation(this.state.query) } }
                        onChange={this.searchBoxChange}
                    />
                    <Menu
                        id="simple-menu"
                        open={this.state.suggestionsOpen}
                        onClose={()=>{this.setState({suggestionsOpen: false})}}
                        PaperProps={{
                            style: {
                                width: '100%',
                                position: 'absolute',
                                top: '18vh',
                            },
                        }}
                    >
                        {
                            this.props.suggestions.map((suggestion,index)=>{
                                return  <MenuItem key={index} onClick={e => {this.handleClose(index)}}>{suggestion.title}</MenuItem>
                            })
                        }
                    </Menu>
                </div>
            <Map
                style="mapbox://styles/mapbox/navigation-preview-day-v4"
                zoom={[this.state.zoom]}
                onStyleLoad={()=>{console.log("loaded")}}
                center={[this.state.center[0], this.state.center[1]]}
                containerStyle={{
                    height: "82vh",
                    width: "100vw"
                }}>
                <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "myImage", "icon-allow-overlap": true }}
                    images={images}
                >
                    {this.props.locations.length !== 0 &&
                        this.props.locations.map((location,index)=>{ //todo: add a separate layer for work locations
                        return <Feature
                            key={index}
                            onClick={()=>{this.setState({open: !this.state.open, locationClicked: location})}}
                            coordinates={location.geometry.coordinates}/>
                        })
                    }
                </Layer>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleModalClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{this.state.locationClicked && this.state.locationClicked.title}</DialogTitle>
                    <DialogContent classes={{ root: classes.dialogContent  }}>
                        <img style={{width: '100%'}}  src={this.state.locationClicked && this.state.locationClicked.imageUrl} />
                        <DialogContentText classes={{ root: classes.dialogContentText  }}>
                            {
                                this.state.locationClicked && this.state.locationClicked.description
                            }
                        </DialogContentText>
                    </DialogContent>
                    <Divider variant="middle" />
                    <DialogActions classes={{ root: classes.dialogActions  }}>
                        {this.state.locationClicked && this.state.locationClicked.type !== "work" && <Button classes={{root: classes.button}} onClick={e=>{history.push(`/explore/${this.state.locationClicked && this.state.locationClicked._id}`)}} variant="contained" color="primary" fullWidth>
                           explore
                        </Button>
                        }
                        {this.state.locationClicked && this.state.locationClicked.type === "work" && <Button onClick={()=>{
                            this.handleModalClose();
                            this.props.userActions.sendRequestForWork(this.state.locationClicked.drones[0].pilot._id,this.state.locationClicked._id);
                        }
                        } classes={{root: classes.button}} variant="contained" color="primary" fullWidth>
                            Request to work
                        </Button>
                        }
                        <IconButton classes={{root: classes.iconButt}} onClick={this.handleModalClose}>
                            <SkipNextIcon />
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </Map>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        locations: state.locations.locations,
        suggestions: state.locations.suggestions,
        isFetching: state.locations.isFetching
    };
};

const mapDispatchToProps = dispatch => ({locationsActions: bindActionCreators(locationsActions, dispatch),userActions: bindActionCreators(userActions, dispatch)});


export default connect(mapStateToProps,mapDispatchToProps)(withMobileDialog()(withStyles(styles)(MapComp)));
