import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SkipNextIcon from '@material-ui/icons/ArrowBack';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Drawer from '../Drawer';


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
    table: {
        minWidth: '100%',
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
});
let id = 0;
function createData(email) {
    id += 1;
    return { id, email };
}
class UserFriendsUI extends React.Component {
    state = {
        mobileOpen: false,
        openInvite: false,
        suggestionsOpen: false,
        friends: [],
        friend: null,
    };
    handleInviteClose = () => {
        this.setState({ openInvite: false });
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
        if(nextProps.suggestions.length !== 0) {
            this.setState({suggestionsOpen: true})
        }
    }
    searchBoxChange = (e) => {
        this.setState({query: e.target.value, searchBoxValue: e.target.value});
    };
    handleCloseMenu = () => {
        this.setState({suggestionsOpen: false})
    };
    render() {
        const { classes, friends, theme, fullScreen} = this.props;
        const rows = this.props.friends.map((friend) => {return createData(friend.email); });
        return (
            <div className={classes.profileContainer}>
                <Typography className={classes.title} variant="h5" color="inherit" noWrap>Friends</Typography>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>email</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton>
                                        <RemoveIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button  onClick={()=>{ this.setState({openInvite: true})}} classes={{ root: classes.buttonAdd  }} variant="outlined">add frineds</Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.openInvite}
                    onClose={this.handleInviteClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">invite friends to explore with:</DialogTitle>
                    <DialogContent classes={{ root: classes.dialogContent  }}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder={this.state.friend && this.state.friend.email ? this.state.friend.email : 'Search...'}
                                value={this.state.searchBoxValue}
                                onClick={()=>{this.setState({searchBoxValue: ''})}}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onKeyPress={e => { if(e.which == '13') this.props.onSearchFriends(this.state.query) } }
                                onChange={this.searchBoxChange}
                            />
                            <Menu
                                id="simple-menu"
                                open={this.state.suggestionsOpen}
                                onClose={this.handleCloseMenu}
                                PaperProps={{
                                    style: {
                                        width: '100%',
                                        position: 'absolute',
                                        top: '18vh !important',
                                        marginTop: '0vh'
                                    },
                                }}
                            >
                                {
                                    this.props.suggestions.map((suggestion,index)=>{
                                        return  <MenuItem key={index} onClick={e => { this.setState({friend: suggestion, searchBoxValue: suggestion.email, suggestionsOpen: false});}}>{suggestion.email}</MenuItem>
                                    })
                                }
                            </Menu>
                        </div>
                        <div className={classes.buttonContainer}>
                            <Button  onClick={()=>{const {friends} = this.state; if(this.state.friend) friends.push(this.state.friend); this.setState({friends})}} classes={{ root: classes.button  }} variant="outlined">add</Button>
                        </div>
                        <Grid item xs={12} md={6}>
                            <div>
                                {this.state.friends.length !== 0 && <List>
                                    {
                                        this.state.friends.map((friend, index) => {
                                            return <ListItem>
                                                <ListItemIcon>
                                                    <FaceIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={friend.email}
                                                />
                                            </ListItem>
                                        })
                                    }
                                </List>
                                }
                            </div>
                        </Grid>
                    </DialogContent>
                    <Divider variant="middle" />
                    <DialogActions classes={{ root: classes.dialogActions  }}>
                        <Button onClick={()=>{this.props.handleFriendRequests(this.state.friends); this.handleInviteClose();}} classes={{ root: classes.button  }}  variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                        <IconButton classes={{root: classes.iconButt}} onClick={this.handleInviteClose}>
                            <SkipNextIcon />
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

UserFriendsUI.propTypes = {
    classes: PropTypes.object.isRequired,
    friends: PropTypes.array.isRequired,
};

export default withMobileDialog()(withStyles(styles, { withTheme: true })(UserFriendsUI));
