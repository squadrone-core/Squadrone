import React from 'react';
import PropTypes from 'prop-types';
import pin from '../pin-svg.svg';
import { withStyles } from '@material-ui/core/styles';
import ReactMapboxGl, { Layer, Feature, Popup, GeoJSONLayer } from "react-mapbox-gl";
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SkipNextIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FaceIcon from '@material-ui/icons/Face';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { fade } from '@material-ui/core/styles/colorManipulator';
const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoibWVocm5henp6IiwiYSI6ImNqczJiYXRxODBrdDc0YWt2eHJuaTdwc3oifQ.AZ5QPOajnt7lO8ZTRKAS5w"
});
const metersToPixelsAtMaxZoom = (meters, latitude) =>
meters / 0.075 / Math.cos(latitude * Math.PI / 180);
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
    root: {
        flexGrow: 1,
        background: 'none'
    },
    container: {
        height: '90vh',
        width: '100vw',
        overflow: 'hidden'
    },
    sectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '36vh',
        justifyContent: 'space-evenly',
        padding: '0 15px',
    },
    button: {
        width: '94%',
        height: '48px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    dialogActions: {
        flexDirection: 'column'
    },
    buttonDialog: {
        width: '77%',
        height: '48px',
        margin: '12px 4px 15px',
    },
    iconButt: {
        border: '1px solid black',
        padding: '10px',
        borderRadius: '50%'
    },
    titleHolder: {
        position: 'relative',
        background: 'black',
        height: '36vh'
    },
    locationImage: {
        position: 'relative',
        opacity: '0.6'
    },
    locationName: {
        position: 'absolute',
        bottom: '10px',
        left: '15px',
        color: 'white'
    },
    divider: {
        marginTop: '15px'
    },
    centerContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    centerContainerForm: {
        display: 'flex',
        width: '44%',
        paddingLeft: '4%',
        paddingTop: '12%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitPoint: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    pointStyle: {
        width: '40%',
        backgroundColor: '#1ba5e6',
        margin: '10px 0'
    },
    form: {
        width: '50%',
        display: 'inline'
    }

});

class DotsMobileStepper extends React.Component {
    state = {
        activeStep: 0,
        usageType: '',
        pathType: '',
        voice: false,
        openInvite: false,
        openMap: false,
        friends: [],
        points: [],
        friend: null,
        pointIdx: null,
        suggestionsOpen: false,
        query: '',
        searchBoxValue: '',
        point: {
            clicked: false,
            lat: '',
            lng: ''
        },
        buttonIdx: null,
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };
    submitChoice = (choice,value, idx) => {
      this.setState({
          [choice]: value,
          buttonIdx: idx
      });
    };
    getBackground = (index)=>{
        const color = this.state.buttonIdx && this.state.buttonIdx === index ? '#33ca33' : 'white';
        const textcolor = this.state.buttonIdx && this.state.buttonIdx === index ? 'white' : 'black';
        return {backgroundColor:  color, color: textcolor}
    };
    renderFirstPage = ()=>{
        const {classes} = this.props;
        return <div className={classes.sectionContainer}>
            <Typography variant="h5" color="inherit" noWrap>how do you like to explore?</Typography>
            <Button  style={this.getBackground(1)} onClick={()=>{this.submitChoice('usageType','alone',1)}} classes={{ root: classes.button  }} variant="outlined">explore alone</Button>
            <Button  style={this.getBackground(2)} onClick={()=>{this.submitChoice('usageType','friends',2); this.setState({openInvite: true})}} classes={{ root: classes.button  }} variant="outlined">invite frineds</Button>
            <Button  style={this.getBackground(3)} onClick={()=>{this.submitChoice('usageType','all',3)}} classes={{ root: classes.button  }} variant="outlined">explore with others</Button>
        </div>
    };
    renderSecondPage = ()=>{
        const {classes} = this.props;
        return <div className={classes.sectionContainer}>
            <Typography variant="h5" color="inherit" noWrap>choose how to get around:</Typography>
            <Button  style={this.getBackground(4)} onClick={()=>{this.submitChoice('pathType','setPoint',4); this.setState({openMap: true})}} classes={{ root: classes.button  }} variant="outlined">set pre-flight location points</Button>
            <Button  style={this.getBackground(5)} onClick={()=>{this.submitChoice('pathType','automate',5)}} classes={{ root: classes.button  }} variant="outlined">automated flight</Button>
            <Button  style={this.getBackground(6)} onClick={()=>{this.submitChoice('pathType','manual',6)}} classes={{ root: classes.button  }} variant="outlined">manual control</Button>
        </div>
    };
    renderThirdPage = ()=>{
        const {classes} = this.props;
        return <div className={classes.sectionContainer}>
            <Typography variant="h5" color="inherit">would you like to hear sounds from the environment?:</Typography>
            <Button  style={this.getBackground(7)} onClick={()=>{this.submitChoice('voice', false,7)}} classes={{ root: classes.button  }} variant="outlined">visit silently</Button>
            <Button  style={this.getBackground(8)} onClick={()=>{this.submitChoice('voice', true,8)}} classes={{ root: classes.button  }} variant="outlined">enable sounds</Button>
        </div>
    };
    renderLastPage = ()=>{
        const {classes} = this.props;
        return <div className={classes.sectionContainer} style={{alignItems: 'center'}}>
            <Button  onClick={this.handleFlightOptions} classes={{ root: classes.button  }} variant="outlined">submit your choices</Button>
        </div>
    };
    handleInviteClose = () => {
        this.setState({ openInvite: false });
    };
    handleMapClose = () => {
        this.setState({ openMap: false });
    };
    searchBoxChange = (e) => {
        this.setState({query: e.target.value, searchBoxValue: e.target.value});
    };
    handlePointChange = name => event => {
        this.setState({point: {...this.state.point, [name]: event.target.value}});
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.suggestions.length !== 0) {
            this.setState({suggestionsOpen: true})
        }
    }
    getCirclePaint = () => {
        if(this.props.location && this.props.location.geometry) {
            return {
                'circle-radius': metersToPixelsAtMaxZoom(this.props.location.maxRadius, this.props.location.geometry.coordinates[0]),
                'circle-color': '#E54E52',
                'circle-opacity': 0.8
            }
        }
    };
    handleFlightOptions = () => {
       // let drone = this.props.location.drones[0]._id;
       let available = null;
       let on_flight = null;
       let droneStatus = "available";
       this.props.availableDrones.forEach((drone)=>{
           if(drone.status === "available") {
               available = drone;
           } else {
               on_flight = drone;
           }
       });
       if((!available && this.state.usageType !== "all" ) || (this.state.usageType === "all" && on_flight)) {
           this.props.handleAttendFlight(on_flight._id);
       } else {
           if(this.state.usageType !== "all") {
               droneStatus = "busy";
           } else {
               droneStatus = "on_flight_available"
           }
           let passengers = "";
           let options = {
               voice: this.state.voice,
               usageType: this.state.usageType,
               pathType: this.state.pathType
           };
           let path = null;
           if(this.state.usageType === "friends") {
               passengers = this.state.friends.map((friend)=>{
                   return friend._id
               });
           }
           if(this.state.pathType === "setPoint") {
               path = this.state.points.map((pt)=>{
                   return {
                       coordinates: [pt.lng,pt.lat],
                   }
               });
           }
           this.props.handleFlightSubmit(available._id,passengers,options,path,droneStatus,this.state.friends);
       }
    };
    render() {
        const { classes, theme, fullScreen } = this.props;
        const image = new Image(30, 50);
        image.src = pin;
        const images = ["myImage", image];
        return (
            <div className={this.props.classes.container}>
                <div className={classes.titleHolder}>
                <img className={classes.locationImage} style={{height: '100%', width: '100%'}}  src={this.props.location && this.props.location.imageUrl} />
                <Typography className={classes.locationName} variant="h4" color="inherit" noWrap>{this.props.location && this.props.location.title}</Typography>
                </div>
                <Typography variant="h6" color="inherit" style={{margin:'4px 15px',fontSize: '15px', color: 'gray' }}>choose you prefrences for exploring</Typography>
                <Divider variant="middle" />
                {this.state.activeStep === 0 && this.renderFirstPage()}
                {this.state.activeStep === 1 && this.renderSecondPage()}
                {this.state.activeStep === 2 && this.renderThirdPage()}
                {this.state.activeStep === 3 && this.renderLastPage()}
                <Divider variant="middle" className={classes.divider}/>
                <MobileStepper
                    variant="dots"
                    steps={4}
                    position="static"
                    activeStep={this.state.activeStep}
                    className={classes.root}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === 3}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.openInvite}
                    onClose={this.handleInviteClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">invite friends to explore with:</DialogTitle>
                    <DialogContent classes={{ root: classes.dialogContent  }}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder={this.state.friend && this.state.friend.email ? this.state.friend.email : 'Search...'}
                                value={this.state.searchBoxValue}
                                onClick={()=>{this.setState({searchBoxValue: ''})}}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onKeyPress={e => { if(e.which == '13') this.props.onSearchFriends(this.state.query) } }
                                onChange={this.searchBoxChange}
                            />
                            <Menu
                                id="simple-menu"
                                open={this.state.suggestionsOpen}
                                onClose={this.handleClose}
                                PaperProps={{
                                    style: {
                                        width: '100%',
                                        position: 'absolute',
                                        top: '18vh !important',
                                        marginTop: '-27vh'
                                    },
                                }}
                            >
                                {
                                    this.props.suggestions.map((suggestion,index)=>{
                                        return  <MenuItem key={index} onClick={e => { this.setState({friend: suggestion, searchBoxValue: suggestion.email, suggestionsOpen: false});}}>{suggestion.email}</MenuItem>
                                    })
                                }
                            </Menu>
                        </div>
                        <div className={classes.buttonContainer}>
                        <Button  onClick={()=>{const {friends} = this.state; if(this.state.friend) friends.push(this.state.friend); this.setState({friends})}} classes={{ root: classes.button  }} variant="outlined">add</Button>
                        </div>
                            <Grid item xs={12} md={6}>
                            <div>
                                {this.state.friends.length !== 0 && <List>
                                    {
                                        this.state.friends.map((friend, index) => {
                                            return <ListItem>
                                                <ListItemIcon>
                                                    <FaceIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={friend.email}
                                                />
                                            </ListItem>
                                        })
                                    }
                                </List>
                                }
                            </div>
                        </Grid>
                    </DialogContent>
                    <Divider variant="middle" />
                    <DialogActions classes={{ root: classes.dialogActions  }}>
                        <Button  onClick={this.handleInviteClose} classes={{ root: classes.button  }}  variant="contained" color="primary" fullWidth>
                       Submit
                        </Button>
                        <IconButton classes={{root: classes.iconButt}} onClick={this.handleInviteClose}>
                            <SkipNextIcon />
                        </IconButton>
                    </DialogActions>
                </Dialog>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.openMap}
                    onClose={this.handleMapClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">define your points to visit:</DialogTitle>
                    <DialogContent classes={{ root: classes.dialogContent  }}>
                        {this.props.location && this.props.location.geometry && <Map
                            style="mapbox://styles/mapbox/navigation-preview-day-v4"
                            zoom={[14]}
                            center={[this.props.location.geometry.coordinates[0], this.props.location.geometry.coordinates[1]]}
                            containerStyle={{
                                height: "45vh",
                                width: "90vw"
                            }}>
                            <Layer type="circle" paint={this.getCirclePaint()}>
                                <Feature coordinates={[this.props.location.geometry.coordinates[0], this.props.location.geometry.coordinates[1]]} />
                            </Layer>
                            <Layer
                                type="symbol"
                                id="marker"
                                layout={{"icon-image": "myImage", "icon-allow-overlap": true}}
                                images={images}
                            >
                                {this.state.points.length !== 0 &&
                                this.state.points.map((point, index) => {
                                    return <Feature
                                        key={index}
                                        coordinates={[point.lng, point.lat]}/>
                                })
                                }
                            </Layer>
                        </Map>
                        }
                        {!this.state.point.clicked && this.state.points.map((point,index)=>{
                            return  <Button key={index}
                                            onClick={()=>{this.setState({point: {...point, clicked: true}, pointIdx:index})}}
                                            classes={{ root: classes.pointStyle  }}
                                            variant="contained" color="primary"

                            >
                                Point {`${index}`}
                            </Button>
                        })}
                        {this.state.point.clicked && <div className={classes.submitPoint}>
                            <form className={classes.form}>
                                <TextField
                                    id="standard-name"
                                    label="latitude"
                                    className={classes.textField}
                                    value={this.state.point.lat}
                                    onChange={this.handlePointChange('lat')}
                                    InputProps={{ classes: { input: classes.input } }}
                                />
                                <TextField
                                    id="standard-name"
                                    label="longitude"
                                    className={classes.textField}
                                    value={this.state.point.lng}
                                    onChange={this.handlePointChange('lng')}
                                    InputProps={{ classes: { input: classes.input } }}
                                />
                            </form>
                            <div className={classes.centerContainerForm}>
                            <Button
                                onClick={()=>{const {points} = this.state; points[this.state.pointIdx] = {lat: this.state.point.lat, lng: this.state.point.lng}; this.setState({points, point: {...this.state.point, clicked: false}})}}
                                classes={{ root: classes.button  }} style={{width: '100%'}} variant="outlined">submit point</Button>
                            </div>
                            </div>
                        }
                        {!this.state.point.clicked && <div className={classes.centerContainer}>
                            <Button onClick={() => {
                                const {points} = this.state;
                                points.push({lat: '', lng: ''});
                                this.setState(points)
                            }} classes={{root: classes.button}} variant="outlined">add point</Button>
                        </div>
                        }
                    </DialogContent>
                    <Divider variant="middle" />
                    <DialogActions classes={{ root: classes.dialogActions  }}>
                        <Button onClick={this.handleMapClose} classes={{ root: classes.buttonDialog  }}  variant="contained" color="primary" fullWidth>
Submit
                        </Button>
                        <IconButton classes={{root: classes.iconButt}} onClick={this.handleMapClose}>
                            <SkipNextIcon />
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

DotsMobileStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withMobileDialog()(withStyles(styles, { withTheme: true })(DotsMobileStepper));
