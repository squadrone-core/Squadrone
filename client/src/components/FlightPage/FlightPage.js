import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import FlightPageUI from './FlightPageUI';
import * as locationsActions from '../../actions/location';
import * as usersActions from '../../actions/users';
import * as flightActions from '../../actions/flight';
import JoyStick from '../JoyStick';
import socketIOClient from "socket.io-client";
import YouTube from 'react-youtube';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SkipNextIcon from '@material-ui/icons/ArrowBack';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/lab/Slider';
const endpoint = "http://127.0.0.1:5000";

const styles = theme => ({
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
    slider: {
        padding: '22px 0px',
        width: '50%',
        margin: '0 auto',
    },
    button: {
        width: '77%',
        height: '48px',
        margin: '12px 4px 15px',
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
    soundControl: {
        textAlign: "center",
        fontFamily: "Roboto"
    },
    iconButt: {
        border: '1px solid black',
        padding: '10px',
        borderRadius: '50%'
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
    list: {
        lineHeight: 2,
        fontFamily: 'Roboto',
    }

});
class FlightPage extends Component {
    static propTypes = {
        locationInfo: PropTypes.object,
        locationsActions: PropTypes.object,
        usersActions: PropTypes.object,
        suggestions: PropTypes.array,
        drones: PropTypes.array
    };
    constructor(props) {
        super(props);
        this.state = {
            open:  false,
            value: 50,
            audio: null,
            socket: null
        }
    }
    componentDidMount() {
        window.YTConfig = {
            host: 'https://www.youtube.com'
        };
        this.props.flightActions.getFlight(this.props.match.params.flightId);
        // this.props.locationsActions.getSound('5c828b8dd9831915be29037a');
        this.handleOpen();
        // const socket = socketIOClient(endpoint);
        // this.state.socket.emit('register');
        // this.state.socket.on('page',(data)=>{
        //     console.log("page");
        //     console.log(data);
        //     this.state.socket.emit("dirty", data)
        // })
        // socket.on("LoggedIn", data => console.log(data));
    }
    searchSoundsByTag = (sounds, keywords) => {
        console.log(sounds);
        console.log(keywords);
        let snd = {
            id: null,
            count: 0
        };
        sounds.forEach((sound,idx)=>{
            let count = 0;
            sound.tags.forEach((tag)=>{
                keywords.forEach((key)=>{
                    if(key === `${tag}.`) {
                        count = count + 1;
                        console.log(count);
                        if(idx > 0) {
                            if(snd.count < count) {
                                snd.count = count;
                                snd.id = sound.file;
                            }
                        } else {
                            snd.count = count;
                            snd.id = sound.file;
                        }
                    }
                })
            });
        });
        return snd;
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.flight && nextProps.flight.location !== this.props.flight.location) {
            const flightLocationLat = nextProps.flight.location.geometry.coordinates[1];
            const flightLocationLng = nextProps.flight.location.geometry.coordinates[0];
            this.props.locationsActions.getWeather(flightLocationLat,flightLocationLng);
        }
        console.log(nextProps);
        if(nextProps.weather && nextProps.weather.description && nextProps.weather.description !== this.props.weather.description) {
            console.log(nextProps.weather);
            if(nextProps.flight.location.type === "nature") {
                const weatherDes = nextProps.weather.description;
                const sound = this.searchSoundsByTag(nextProps.flight.location.sounds,weatherDes.toLowerCase().split(" "));
                console.log(sound);
                if(sound.count > 0) {
                    this.props.locationsActions.getSound(sound.id);
                }
            }
        }
        if(nextProps.sound && nextProps.sound !== this.props.sound) {
            const audio = new Audio(nextProps.sound);
            this.setState({audio});
        }
    }
    handleClose = ()=>{
        this.setState({open: false});
    };
    handleOpen = ()=>{
        this.setState({open: true});
    };
    changeVol = (audio,val,max) => {

        const fraction = parseInt(val) / parseInt(max);
        // Let's use an x*x curve (x-squared) since simple linear (x) does not
        // sound as good.
        audio.volume = fraction * fraction;
    };
    handleChange = (event, value) => {
        const volume = value/100;
        const { audio } = this.state;
        audio.volume = volume;
        this.setState({ value, audio });
    };
    render() {
        let drone = null;
        if(this.props.location.state && this.props.location.state.drone) {
            drone = this.props.location.state.drone;
        } else {
            drone = this.props.flight.drone;
        }

        const { classes, fullScreen } = this.props;

        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Read these instructions before your flight:</DialogTitle>
                    <DialogContent classes={{ root: classes.dialogContent  }}>
                        <ul className={classes.list}>
                            <li>connect your wireless headset to
                                your phone</li>
                            <li> if you have chosen to control the
                                drone your self, make sure that you
                                gamepad is connected to your phone
                                wirelessly</li>
                            <li>
                                note that any of your friends whom
                                you have added will get connected
                                automatically
                            </li>
                            <li>
                                if you have chosen to exprience this
                                with others, any one who is interested
                                in expriencing the same place will
                                connect
                            </li>
                            <li>
                                note that you have only 15 minutes
                                to explore the place so manage your
                                time
                            </li>
                            <li>
                                press the “ready” button below
                            </li>
                            <li>
                                when you get redirected to the
                                full-screen real-time stream, put your
                                phone on your goggle
                            </li>
                        </ul>
                    </DialogContent>
                    <Divider variant="middle" />
                    <DialogActions classes={{ root: classes.dialogActions  }}>
                        <Button  onClick={this.handleClose} classes={{ root: classes.button  }}  variant="contained" color="primary" fullWidth>
                            Ready
                        </Button>
                        <IconButton classes={{root: classes.iconButt}} onClick={this.handleClose}>
                            <SkipNextIcon />
                        </IconButton>
                    </DialogActions>
                </Dialog>
                {
                    // drone && <div onClick={()=>{this.setState({clicked: true});}} style={{maxWidth: '100%'}} dangerouslySetInnerHTML={{ __html: drone.embedUrl }} />
                drone && <YouTube
                    videoId={drone.embedUrl}                  // defaults -> null
                    opts={{
                        height: '390',
                        width: '100%',
                        playerVars: {
                            mute: 1,
                            allowfullscreen: 1
                        }

                    }}                        // defaults -> {}
                    onPlay={()=>{if(this.state.audio) this.state.audio.play();
                    console.log(this.state.audio);
                        this.props.flightActions.executeWayPoints();
                    }}                     // defaults -> noop
                    onPause={()=>{if(this.state.audio) this.state.audio.pause();}}

                />
                }
                {
                    this.props.flight && this.props.flight.location && this.props.flight.location.type === "nature" &&
                    <div className={classes.soundControl}>
                        <h5 style={{margin: '5px'}}>change the sound volume of the environment:</h5>
                    <Slider
                    classes={{ container: classes.slider }}
                    value={this.state.value}
                    aria-labelledby="label"
                    onChange={this.handleChange}
                    />
                    </div>
                }
                {this.props.flight && this.props.flight.options && this.props.flight.options.pathType === 'manual' && <JoyStick flight={this.props.flight} /> }
            <FlightPageUI
                drone={drone}
                flight={this.props.flight}
            />
                <audio style={{visibility: 'hidden'}} controls src={this.props.sound} />

                {/*<button onClick={()=>{if(this.state.audio)this.state.audio.play()}}>play audio</button>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        flight: state.flight.flight,
        weather: state.locations.weather,
        sound: state.locations.sound,
    };
};

const mapDispatchToProps = dispatch => ({
    locationsActions: bindActionCreators(locationsActions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch),
    flightActions: bindActionCreators(flightActions, dispatch),
});


export default withMobileDialog()(withStyles(styles, { withTheme: true })( connect(
    mapStateToProps,
    mapDispatchToProps
)(FlightPage)));
