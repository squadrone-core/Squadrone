
import $ from 'jquery';
import event from 'eventemitter2';
import ROSLIB from 'roslib';
import {socketCallback} from '../utils';



const restPath='https://dev.flytbase.com/rest';
const wsPath='wss://dev.flytbase.com/rest';
const namespace=localStorage.getItem("namespace");
const token='Token d528e637b79f8cb14fb075ed6acf21835d91bca2';
const auth=false;



export function rosInitialize(){
    const ros = new ROSLIB.Ros({
        url : wsPath +'/websocket'
    });


    ros.on('connection', function() {
        console.log('Connected to websocket server.');
        setTimeout(function(){socketCallback(ros);},3000);

    });

    ros.on('error', function(error) {
        console.log('Error connecting to websocket server: ', error);
    });

    ros.on('close', function() {
        console.log('Connection to websocket server closed.');
    });

    if(auth){
        var rauth = new ROSLIB.Message({
            "op": "auth",
            "mac" : localStorage.getItem('token'),

        });

        ros.authenticate(rauth);
    }
}

