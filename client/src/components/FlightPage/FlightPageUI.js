import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Device } from 'twilio-client';
import PhoneIcon from '@material-ui/icons/Phone';
import CancelIcon from '@material-ui/icons/Cancel';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';
import IconButton from '@material-ui/core/IconButton';
import {getConfig} from '../../utils';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
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
class FlightPageUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            muted: false,
            log: 'Connecting...',
            onPhone: false,
            currentNumber: '',
            clientName: '',
        };
    }

    // Initialize after component creation
    componentDidMount() {
        const self = this;
        // Fetch capability token from our Node.js server
        console.log(getConfig());
        axios.get('/api/token', getConfig()).then(function(data) {
            console.log(data);
            Device.setup(data.data.token);
            Device.disconnect(function() {
                self.setState({
                    onPhone: false,
                    log: 'Call ended.'
                });
            });

            Device.ready(function() {
                console.log("ready");
                self.setState({log: 'Connected'});
            });

            Device.error(function (error) {
                self.setState({log: `Twilio.Device Error: ${error.message}`});
            });

            Device.connect(function (conn) {
                self.setState({log: 'Successfully established call!'});
            });


            Device.incoming(function (conn) {
                self.setState({log: `Incoming connection from ${conn.parameters.From}`});

                let archEnemyPhoneNumber = '+12099517118';

                if (conn.parameters.From === archEnemyPhoneNumber) {
                    conn.reject();
                    self.setState({log: 'It\'s your nemesis. Rejected call.'});
                } else {
                    // accept the incoming connection and start two-way audio
                    conn.accept();
                }
            });

            self.setState({clientName: data.data.identity});

            // Device.audio.on('deviceChange', updateAllDevices); //consider this later

            // Show audio selection UI if it is supported by the browser.
            // if (Device.audio.isSelectionSupported) {
            //     document.getElementById('output-selection').style.display = 'block';
            // }
        });
        //     .fail(function(err) {
        //     console.log(err);
        //     self.setState({log: 'Could not fetch token, see console.log'});
        // });

        // Configure event handlers for Device
    }

    // Handle country code selection

    // Handle number input
    handleChangeNumber = (e) => {
        this.setState({
            currentNumber: e.target.value,
        });
    };

    // Handle muting
    handleToggleMute = () => {
        let muted = !this.state.muted;

        this.setState({muted: muted});
        Device.activeConnection().mute(muted);
    };

    // Make an outbound call with the current number,
    // or hang up the current call
    handleToggleCall = () => {
        if (!this.state.onPhone) {
            this.setState({
                muted: false,
                onPhone: true
            });
            // make outbound call with current number
            // const n =  this.state.currentNumber;
            const n =  this.props.drone.pilot.clientName;
            Device.connect({ To: n });
            this.setState({log: `Calling  ${n}`})
        } else {
            // hang up call in progress
            Device.disconnectAll();
        }
    };
    render() {
        const { classes, fullScreen, drone } = this.props;
        console.log(this.props.flight);
        if(this.props.flight && this.props.flight.options && this.props.flight.options.voice) {
            return (
                <div id="dialer">
                    {/*<div id="dial-form" className="input-group input-group-sm">*/}
                    {/*<div className="input-group input-group-sm">*/}
                    {/*<input type="text" className="form-control" placeholder="client name"*/}
                    {/*value={this.state.currentNumber} onChange={this.handleChangeNumber}/>*/}
                    {/*</div>*/}
                    {/*</div>*/}

                    <div className="controls" style={{textAlign: 'center', paddingTop: '5%'}}>
                        <IconButton classes={{root: classes.iconButt}} onClick={ e => {
                            this.handleToggleCall()
                        }}>
                            {this.state.onPhone && <Fab size="large"><CancelIcon /> </Fab>  }
                            {!this.state.onPhone && <Fab size="large"><PhoneIcon /></Fab> }
                        </IconButton>

                        { this.state.onPhone &&
                        <IconButton classes={{root: classes.iconButt}} onClick={e => {
                            this.handleToggleMute()
                        }}>
                            {this.state.muted && <Fab size="large"><VolumeMuteIcon /></Fab> }
                            {!this.state.muted && <Fab size="large"><MicOutlinedIcon /></Fab>  }
                        </IconButton> }

                    </div>
                    <div>
                        <div className="log" style={{textAlign: 'center', paddingTop: '12%',     fontFamily: 'Roboto'}}>
                            <span style={{
                                backgroundColor: '#3e4db8',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '10px',
                                marginRight: '10px',
                            }}>STATUS:</span>
                            <span>{this.state.log}</span></div>
                        {/*<div className="client-name">{this.state.clientName}</div>*/}
                    </div>
                </div>
            );
        }
        return <div />
    }
}

export default withStyles(styles)(FlightPageUI);
