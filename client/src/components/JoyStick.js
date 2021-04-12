import React, { Component } from 'react';
import './App.css';
import loader from './Earth-2s-200px.gif';
import {rosInitialize} from './rosInitialize';
import * as joystickActions from '../actions/joystick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import Gamepad from 'react-gamepad'
import * as workerTimers from 'worker-timers';

let controllers = {};

class JoyStick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldValues: [0,0,0,0],
            acceptmoves1: 0,
            acceptmoves2: 0,
            front: 0,
            right: 0,
            tright: 0,
            down: 0,
            userInControl: props.flight ? props.flight.hasControl : null,
            disconnectTimeout: null,
            //from here for joystick
            speedX: 0.0,
            speedY: 0.0,

            x: 0,
            y: 0,

            connected: false,
        };
        this.gamepadUpdateToken = null;
        this.callVelocityInterval = null;
    }
    componentDidMount() {
        // this.gamepadUpdateToken = workerTimers.setInterval(this.scangamepads, 100);
        // this.callVelocityInterval = workerTimers.setInterval(this.callVelocity,500);

        // window.addEventListener("gamepadconnected", this.connecthandler); for uncomment
        // if (!haveEvents) {
        //     setInterval(this.scangamepads, 500);
        // }
        this.props.joystickActions.getNameSpace(this.props.flight.drone.VehicleID);
        // window.requestAnimationFrame(this.update.bind(this))

    }

    connecthandler = (e)  => {
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                e.gamepad.index, e.gamepad.id,
                e.gamepad.buttons.length, e.gamepad.axes.length);
    };

    scangamepads = () => {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        console.log(gamepads);
        const userId = localStorage.getItem('userId');
        if (!gamepads[0]){ return }
        gamepads[0].buttons.forEach((button, index) => {
            if (button.pressed){
                console.log(`Pressed button ${index}`);
                if(userId === this.state.userInControl) {
                    if (index === 0) {
                        this.setState({down: 1, tright: 0, right: 0, front: 0});
                    } else if (index === 1) {
                        this.setState({tright: 0.5, down: 0, right: 0, front: 0});
                    } else if (index === 2) {
                        this.setState({tright: -0.5, down: 0, right: 0, front: 0});
                    } else if (index === 3) {
                        this.setState({down: -1, tright: 0, right: 0, front: 0});
                    } else if (index === 13) {
                        this.setState({front: -1, down: 0, tright: 0, right: 0});
                    } else if (index === 15) {
                        this.setState({right: 1, down: 0, tright: 0, front: 0});
                    } else if (index === 14) {
                        this.setState({right: -1, down: 0, tright: 0, front: 0});
                    } else if (index === 12) {
                        this.setState({front: 1, down: 0, tright: 0, right: 0});
                    }
                }
                if(index === 6) {
                    if(this.props.flight.passEnabled) {
                        this.props.joystickActions.changeControl(this.props.flight._id);
                    }
                } else if(index === 7){
                    this.props.joystickActions.passControl(this.props.flight._id,true);
                }
            }
        });

        gamepads[0].axes.forEach((axe, index) => {
            if (axe != 0 && (axe === 1 || axe === -1)){
                console.log(`Axe ${index} moved: ${axe}`);
                if(userId === this.state.userInControl) {
                    if (index === 3 && axe === 1) {
                        this.setState({down: 1, tright: 0, right: 0, front: 0});
                    } else if (index === 2 && axe === 1) {
                        this.setState({tright: 0.5, down: 0, right: 0, front: 0});
                    } else if (index === 2 && axe === -1) {
                        this.setState({tright: -0.5, down: 0, right: 0, front: 0});
                    } else if (index === 3 && axe === -1) {
                        this.setState({down: -1, tright: 0, right: 0, front: 0});
                    } else if (index === 1 && axe === 1) {
                        this.setState({front: -1, down: 0, tright: 0, right: 0});
                    } else if (index === 0 && axe === 1) {
                        this.setState({right: 1, down: 0, tright: 0, front: 0});
                    } else if (index === 0 && axe === -1) {
                        this.setState({right: -1, down: 0, tright: 0, front: 0});
                    } else if (index === 1 && axe === -1) {
                        this.setState({front: 1, down: 0, tright: 0, right: 0});
                    }
                }
            }
        });
    };
    componentWillUnmount() {
        window.removeEventListener("gamepadconnected",this.connecthandler,true);
        if (this.gamepadUpdateToken != null){
            workerTimers.clearInterval(this.gamepadUpdateToken)
        }
        workerTimers.clearInterval(this.callVelocityInterval)

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.namespace) {
            rosInitialize();
        }
        if(nextProps.flightJoystick && nextProps.flightJoystick.hasControl) {
            this.setState({userInControl: nextProps.flightJoystick.hasControl})
        }
    }

    callVelocity = ()=>{
        var newValues=[this.state.front,this.state.right,this.state.down,this.state.tright];
        if (newValues.toString()!== this.state.oldValues.toString()){
            if (newValues.toString()==="0,0,0,0"){
                this.props.joystickActions.positionHold();
                this.velocitySetpoint(newValues);
            }
            else
                this.velocitySetpoint(newValues);
            this.setState({oldValues: newValues});
        }
    };
    velocitySetpoint = (values) => {
        // let msgdata={};
        // msgdata["twist"]={};
        // msgdata.twist["twist"]={};
        // msgdata.twist.twist["linear"]={};
        // msgdata.twist.twist.linear["x"]=parseFloat(values[0]);
        // msgdata.twist.twist.linear["y"]=parseFloat(values[1]);
        // msgdata.twist.twist.linear["z"]=parseFloat(values[2]);
        // msgdata.twist.twist["angular"]={};
        // msgdata.twist.twist.angular["z"]=parseFloat(values[3]);
        // msgdata["tolerance"]=2.00;
        // msgdata["async"]=true;
        // msgdata["relative"]=false;
        // msgdata["body_frame"]=true;
        // if (values[3]===0 & (values[0]!==0 | values[1]!==0 | values[2]!==0))msgdata["yaw_rate_valid"]=false;
        // else msgdata["yaw_rate_valid"]=true;
        let msgdata={};
        msgdata["vx"]=parseFloat(values[0]);
        msgdata["vy"]=parseFloat(values[1]);
        msgdata["vz"]=parseFloat(values[2]);
        msgdata["yaw_rate"]=parseFloat(values[3]);
        msgdata["tolerance"]=2.00;
        msgdata["async"]=true;
        msgdata["relative"]=false;
        msgdata["body_frame"]=true;
        if (values[3]===0 & (values[0]!==0 | values[1]!==0 | values[2]!==0))msgdata["yaw_rate_valid"]=false;
        else msgdata["yaw_rate_valid"]=true;
        this.props.joystickActions.velocitySet(msgdata)

    };

    render() {
        const imagestyle = {
            maxWidth: '150px',
            margin: '10px auto'
        };
        const containerstyle = {
            height: 'auto',
            padding: '20px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 100,
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px #383636',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
        };
        const textStyle = {
            fontFamily: 'Roboto',
            marginTop: '0',
            textAlign: 'center',
        };
        return (
           <div></div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        namespace: state.joystick.namespace,
        flightJoystick: state.joystick.flight
    };
};

const mapDispatchToProps = dispatch => ({joystickActions: bindActionCreators(joystickActions, dispatch)});


export default connect(mapStateToProps,mapDispatchToProps)(JoyStick);
