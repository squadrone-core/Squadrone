import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '../Drawer';
import { fade } from '@material-ui/core/styles/colorManipulator';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SkipNextIcon from '@material-ui/icons/ArrowBack';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Loader  from '../Loader';

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
    button: {
        width: '77%',
        height: '48px',
        margin: '12px 4px 15px',
    },
    buttonAdd: {
        width: '77%',
        height: '48px',
        margin: '12px 4px 15px',
        position: 'absolute',
        bottom: '0'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    card: {
        width: '78vw',
        margin: '15px 0',
        overflow: 'visible',
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
    containerFix: {
        maxHeight: '65vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll'
    },
    fixButt: {
        position: 'fixed',
        bottom: '0',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        // zIndex: '50000000'
    }
});

class UserFavoritesUI extends React.Component {
    state = {
        mobileOpen: false,
        query: '',
        suggestionsOpen: false,
        cities: [],
        landscapes: [],
        city: {},
        landscape: {},
        openAdd: false
    };
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleAddClose = () => {
        this.setState({ openAdd: false });
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.openDrawer !== this.props.openDrawer) {
            this.handleDrawerToggle()
        }
        if(nextProps.suggestions.length !== 0 && nextProps.suggestions !== this.props.suggestions) {
            this.setState({suggestionsOpen: true, openAdd: true})
        }
    }
    searchBoxChange = (e) => {
        this.setState({query: e.target.value, searchBoxValue: e.target.value});
    };
    handleClose = (index) => {
        this.setState({ suggestionsOpen: false });
    };
    getName = () => this.props.mode === "city" ? "cities" : "landscapes";
    getSingleName = () => this.props.mode === "city" ? "city" : "landscape";
    render() {
        const { classes, cities, landscapes, theme, fullScreen, mode} = this.props;
        return (
            <div className={classes.profileContainer}>
                {
                    this.props.loading &&
                    <Loader />
                }
                <Typography className={classes.title} variant="h5" color="inherit" noWrap>favorite {`${this.getName()}`}</Typography>
                <div className={classes.containerFix}>
                    {mode === "city" && cities.map((city,index)=>{
                        return <Card className={classes.card} key={index}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://media-cdn.tripadvisor.com/media/photo-s/12/f5/f1/8d/eiffel-tower-summit-priority.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {city.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    <Link to={`/explore/${city._id}`}> explore </Link>
                                </Button>
                            </CardActions>
                        </Card>
                    })}
                    {mode === "landscape" && landscapes && landscapes.map((city,index)=>{
                        return <Card className={classes.card} key={index}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://media-cdn.tripadvisor.com/media/photo-s/12/f5/f1/8d/eiffel-tower-summit-priority.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {/*{city.title}*/}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    <Link to={`/explore/${city._id}`}> explore </Link>
                                </Button>
                            </CardActions>
                        </Card>
                    })}
                </div>
                <div className={classes.fixButt}>
                <Button  onClick={()=>{ this.setState({openAdd: true})}} classes={{ root: classes.buttonAdd  }} variant="outlined">add {`${this.getName()}`}</Button>
                </div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.openAdd}
                    onClose={this.handleInviteClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">add your favorite {this.getName()}:</DialogTitle>
                    <DialogContent classes={{ root: classes.dialogContent  }}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                value={this.state.searchBoxValue}
                                onClick={()=>{this.setState({searchBoxValue: ''})}}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onKeyPress={e => { if(e.which == '13') this.props.onsearchLocation(this.state.query) } }
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
                                        top: '18vh',
                                    },
                                }}
                            >
                                {
                                    this.props.suggestions.map((suggestion,index)=>{
                                        return  <MenuItem key={index} onClick={e => {this.setState({[this.getSingleName()]: suggestion, searchBoxValue: suggestion.title, suggestionsOpen: false});}}>{suggestion.title}</MenuItem>
                                    })
                                }
                            </Menu>
                        </div>
                        <div className={classes.buttonContainer}>
                            <Button  onClick={()=>{const cities = this.state[this.getName()]; if(this.state[this.getName()]) cities.push(this.state[this.getSingleName()]); this.setState({[this.getName()] : cities })}} classes={{ root: classes.button  }} variant="outlined">add</Button>
                        </div>
                            <div>
                                {this.state[this.getName()].length !== 0 && this.state[this.getName()].map((city, index) => {
                                            return <Card className={classes.card} key={index}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image="https://media-cdn.tripadvisor.com/media/photo-s/12/f5/f1/8d/eiffel-tower-summit-priority.jpg"
                                                        title="Contemplative Reptile"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {city.title}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button size="small" color="primary">
                                                        <Link to={`/explore/${city._id}`}> explore </Link>
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        })
                                }
                            </div>
                    </DialogContent>
                    <Divider variant="middle" />
                    <DialogActions classes={{ root: classes.dialogActions  }}>
                        <Button onClick={()=>{this.setState({openAdd: false},()=>{this.props.handlecities(this.state[this.getName()]);})}} classes={{ root: classes.button  }}  variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                        <IconButton classes={{root: classes.iconButt}} onClick={this.handleAddClose}>
                            <SkipNextIcon />
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

UserFavoritesUI.propTypes = {
    classes: PropTypes.object.isRequired,
    cities: PropTypes.array.isRequired,
    landscapes: PropTypes.array.isRequired,
};

export default withMobileDialog()(withStyles(styles, { withTheme: true })(UserFavoritesUI));
