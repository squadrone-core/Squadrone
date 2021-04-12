import $ from 'jquery';
import event from 'eventemitter2';
import ROSLIB from 'roslib';

export const getConfig = () => {
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let token = localStorage.getItem("token");
    if(token) {
        config.headers['Authorization'] = token;
    }
    return config
};

export const getFlytLiveConfig = (vehicleId) => {
    let config = {
        headers: { 'Authorization': 'REPLACE AUTHORIZATION TOKEN', VehicleID: vehicleId }
    };
    return config
};

const namespace=localStorage.getItem("namespace");

export function socketCallback(ros){

    const listenerBatteryStatus = new ROSLIB.Topic({
        ros :ros,
        name : '/'+namespace+'/mavros/battery',
        messageType : 'sensor_msgs/BatteryState',
        throttle_rate: 500
    });
    listenerBatteryStatus.subscribe(function(message) {
        //here we get this: {voltage:, current, percentage}
        const { voltage, current, percentage } = message;
        let percentageCalc = percentage;
        if ((round(percentage,2)*100)>=100)
            percentageCalc = 100;
        else
            percentageCalc = round(percentage,2)*100;
        return { //todo: change this return to some action call to set the info
            voltage: round(voltage,2),
            current: round(current,2),
            percentage: percentageCalc
        };
    });


    const listenerAttitude = new ROSLIB.Topic({
        ros :ros,
        name : '/'+namespace+'/mavros/imu/data_euler',
        messageType : 'geometry_msgs/TwistStamped',
        throttle_rate: 500
    });
    listenerAttitude.subscribe(function(message){
        // console.log(message);
        let result = {
            roll: round(message.twist.linear.x,3),
            pitch: round(message.twist.linear.y,3),
            yaw: round(message.twist.linear.z,3),
        };

    });


    var listenerGlobalPositionRaw = new ROSLIB.Topic({
        ros :ros,
        name : '/'+namespace+'/mavros/global_position/raw/fix',
        messageType : 'sensor_msgs/NavSatFix',
        throttle_rate: 1000
    });
    listenerGlobalPositionRaw.subscribe(function(message) {
        let result = {
            position_covariance: message.position_covariance[4],
            status: message.status.status,
        };
        //            if(gpsTimeout)clearTimeout(gpsTimeout);

    });

    var listenerLocalPosition = new ROSLIB.Topic({
        ros :ros,
        name : '/'+namespace+'/mavros/local_position/local',
        messageType : 'geometry_msgs/TwistStamped',
        throttle_rate: 500
    });

    listenerLocalPosition.subscribe(function(message) {
        let result =  { alt: round(message.twist.linear.z,3)*-1 }
    });


    var listenerState = new ROSLIB.Topic({
        ros :ros,
        name : '/'+namespace+'/flyt/state',
        messageType : 'mavros_msgs/State',
        throttle_rate: 500
    });


    // listenerState.subscribe(function(message) {
    //     $("#connection").html("Connected");
    //     $(".connection-status").children("img").attr("src","img/connected.png");
    //     clearTimeout(disconnectTimeout);
    //
    //     disconnectTimeout=setTimeout(function(){
    //         $("#connection").html("Disconnected");
    //         $(".connection-status").children("img").attr("src","img/disconnected.png");
    //
    //     },2500);
    // });

}
function round(value,decimal){
    var x=Math.pow(10,decimal);
    return Math.round(value*x)/x;
}
