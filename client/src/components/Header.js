import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux'
import * as usersActions from '../actions/users';
import Drawer from './Drawer';

const styles = theme => ({
    root: {
        width: '100%',
    },
    appbar: {
      height: '10vh',
      display: 'flex',
      justifyContent: 'center',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        lineHeight: 1,
    },
    subTitle: {
        fontSize: '10px'
    },
    mainTitle: {
        fontSize: '26px'
    },
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
    menuMobile: {
      height: '400px'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class PrimarySearchAppBar extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
    };
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        showMenu: false,
        openDrawer: false,
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };
    handleMobileMenuOpen = event => {
        if(window.location.pathname.split('/')[1] === "profile") {
            this.setState({openDrawer: true});
        } else {
            this.setState({openDrawer: false, mobileMoreAnchorEl: event.currentTarget});
        }
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };
    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes, isAuthenticated } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const renderMenuLoggedIn = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <Link to="/profile">
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>

                        <p>Profile</p>

                </MenuItem>
                </Link>
                <MenuItem>
                    <IconButton color="inherit" onClick={e => this.props.logout()}>
                        <Typography>logout</Typography>
                    </IconButton>
                </MenuItem>
            </Menu>
        );
        const renderMenuNotLoggedIn = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <Link to="/signup" style={{decoration: 'none'}} >
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <p>Sign up</p>
                </MenuItem>
                </Link>

        <Link to="/login" style={{decoration: 'none'}} >
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <p>Login</p>
                </MenuItem>
        </Link>
            </Menu>
        );

        const renderMobileMenuLogin = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <Link to="/profile/notifications">
              <MenuItem onClick={this.handleMobileMenuClose}>
                <IconButton color="inherit">
                  {/*<Badge badgeContent={11} color="secondary">*/}
                    <NotificationsIcon />
                  {/*</Badge>*/}
                </IconButton>
                <p>Notifications</p>
              </MenuItem>
                </Link>
                <Link to="/profile">

                <MenuItem onClick={this.handleMobileMenuClose}>
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
                <p>Profile</p>
              </MenuItem>
                </Link>

                <MenuItem>
                    <IconButton color="inherit" onClick={e => this.props.logout()}>
                        <Typography>logout</Typography>
                    </IconButton>
                </MenuItem>
            </Menu>
        );
        const renderMobileMenuNotLogin = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
                PaperProps={{
                    style: {
                        width: '50%',
                    },
                }}
            >
                <Link to="/signup" style={{decoration: 'none'}} >
              <MenuItem onClick={this.handleMobileMenuClose}>
                 <p>Sign up</p> </MenuItem></Link>
                <Link to="/login" style={{decoration: 'none'}} >
              <MenuItem onClick={this.handleMobileMenuClose}>
                 <p>Login</p>
              </MenuItem>
                </Link>
            </Menu>
        );

        return (
            <div className={classes.root}>
              <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                  <Link to="/" style={{textDecoration: 'none', color: 'white'}} className="logo">
                      <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                      <span className={classes.mainTitle}>Squadrone</span>
                      <br/>
                      <span className={classes.subTitle}>be anywhere remotely</span>
                  </Typography>
                  </Link>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                          {/*<MenuItem onClick={this.handleMobileMenuClose}>*/}
                              <IconButton aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                          aria-haspopup="true"
                                          color="inherit" >
                                  {/*<Badge badgeContent={11} color="secondary">*/}
                                  <Link to="/profile/notifications">

                                  <NotificationsIcon />
                                  </Link>

                                  {/*</Badge>*/}
                              </IconButton>
                              {/*<p>Notifications</p>*/}
                          {/*</MenuItem>*/}

                    <IconButton
                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleProfileMenuOpen}
                        color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  </div>
                  <div className={classes.sectionMobile}>
                    <IconButton aria-haspopup="true" id="butt" onClick={this.handleMobileMenuOpen} color="inherit">
                      <MenuIcon />
                    </IconButton>
                  </div>
                </Toolbar>
              </AppBar>
                {isAuthenticated  && !this.state.openDrawer && renderMenuLoggedIn}
                {!isAuthenticated && renderMenuNotLoggedIn}
                {isAuthenticated  && !this.state.openDrawer && renderMobileMenuLogin} {/*todo: fix this*/}
                {isAuthenticated  && this.state.openDrawer && <Drawer logoutt={this.props.logout} openDrawer={this.state.openDrawer}/>
                } {/*todo: fix this*/}
                {!isAuthenticated && renderMobileMenuNotLogin}
            </div>
        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        openDrawer: state.users.openDrawer,
    };
};
const mapDispatchToProps = dispatch => ({
    usersActions: bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(PrimarySearchAppBar));
