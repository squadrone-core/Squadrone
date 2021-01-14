import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';


const styles = theme => ({
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    card: {
        width: '78vw',
        margin: '15px 0'
    },
    media: {
        height: 140,
    },
    title: {
        margin: '15px 0'
    },
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class UserProfileUI extends React.Component {
    state = {
        mobileOpen: false,
    };
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.openDrawer !== this.props.openDrawer) {
            this.handleDrawerToggle()
        }
    }
    render() {
        const { classes, flights, workReqs, theme} = this.props;
        return (
            <div className={classes.profileContainer}>
                <Typography className={classes.title} variant="h5" color="inherit" noWrap>your recent visited places</Typography>
                {flights.map((flight,index)=>{
                    return <Card className={classes.card} key={index}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://media-cdn.tripadvisor.com/media/photo-s/12/f5/f1/8d/eiffel-tower-summit-priority.jpg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {flight.location && flight.location.title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                })}
                <Typography className={classes.title} variant="h5" color="inherit" noWrap>your work request locations</Typography>
                {workReqs.map((req,index)=>{
                    return <Card className={classes.card} key={index}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://media-cdn.tripadvisor.com/media/photo-s/12/f5/f1/8d/eiffel-tower-summit-priority.jpg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                {req.forLocation && <Typography gutterBottom variant="h5" component="h2">
                                    {req.forLocation.title}
                                </Typography>
                                }
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                })}

            </div>
        );
    }
}

UserProfileUI.propTypes = {
    classes: PropTypes.object.isRequired,
    flights: PropTypes.array.isRequired,
    workReqs: PropTypes.array.isRequired,
};

export default withStyles(styles, { withTheme: true })(UserProfileUI);
