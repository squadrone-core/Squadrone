import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: '20px',
    },
    button: {
        margin: theme.spacing.unit,
        marginTop: '65px',
        height: '48px'
    },
    card: {
        width: '90vw',
        height: '60vh',
        margin: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {

    },
    hint: {
        fontFamily: 'Roboto',
        textAlign: 'center'
    }
});

class TextFields extends React.Component {
    state = {
        email: '',
        password: '',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.loginContainer}>
            <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} variant="h5" color="inherit" noWrap>LOGIN</Typography>
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="standard-name"
                    label="Email"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('email')}
                    InputProps={{ classes: { input: classes.input } }}
                />

                <TextField
                    id="standard-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleChange('password')}
                    InputProps={{ classes: { input: classes.input } }}
                />
                <Button variant="contained" className={classes.button} onClick={e => {this.props.login(this.state.email, this.state.password)}}>
                    Login
                </Button>
                    <p className={classes.hint}>not a user? <Link className="hint" to="/signup">Sign-up</Link></p>
            </form>
         </CardContent>
      </Card>
            </div>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
