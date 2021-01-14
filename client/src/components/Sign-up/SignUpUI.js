import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import countries from 'country-json/src/country-by-abbreviation.json'
const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        marginTop: '20px',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
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
        height: '80vh',
        margin: 'auto',
        position: 'absolute',
        top: '55%',
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
    input: {
        // height: '48px',
    },
    title: {

    }
});

class TextFields extends React.Component {
    state = {
        email: '',
        password: '',
        country: '',
        age: ''
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
                <Typography className={classes.title} variant="h5" color="inherit" noWrap>SIGN UP</Typography>
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
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-helper">Country</InputLabel>
                    <Select
                        value={this.state.country}
                        onChange={this.handleChange("country")}
                        input={<Input name="country" id="country-helper" />}
                    >
                        {countries.map((country,index)=>{
                            return <MenuItem key={index} value={country.abbreviation}>{country.country}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText>Some important helper text</FormHelperText>
                </FormControl>
                <TextField
                    id="standard-number"
                    label="Age"
                    value={this.state.age}
                    onChange={this.handleChange('age')}
                    type="number"
                    className={classes.textField}

                />

                    <Button variant="contained" className={classes.button} onClick={e => {this.props.signup(this.state.email, this.state.password, this.state.country, this.state.age)}}>
                    Sign up
                </Button>
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
