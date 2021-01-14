import React, { Component } from 'react';
import './App.css';
import loader from './Earth-2s-200px.gif';

class Loader extends Component {
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
            <div>
            <div style={containerstyle}>
               <img src={loader} style={imagestyle} />
                <h5 style={textStyle}>Loading...</h5>
            </div>
            </div>
        );
    }
}


export default Loader;
