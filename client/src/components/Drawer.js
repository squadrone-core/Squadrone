import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
    title: {
        margin: '15px 0'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    root: {
        display: 'flex',
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    button: {
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
    iconButt: {
        border: '1px solid black',
        padding: '10px',
        borderRadius: '50%'
    },
});
class DrawerComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: props.openDrawer
        }
    }
    getToUrl = text => {
      if (text === 'friends') {
          return '/profile/friends'
      } else if ( text === 'your work requests') {
          return '/profile/workRequests'
      }else if ( text === 'explored places') {
          return '/profile'
      }else if ( text === 'favorite cities') {
          return '/profile/favoriteCities'
      }else if ( text === 'favorite landscapes') {
          return '/profile/favoriteLandscapes'
      } else if (text === 'Notifications') {
          return '/profile/notifications'
      } else if(text === 'Log out') {
          // this.props.logoutt();
      }
    };
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.openDrawer) {
            this.handleDrawerToggle()
        }
    }
    render() {
        console.log(this.props);
        const { classes, theme} = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {['edit information', 'friends', 'your work requests', 'explored places', 'favorite cities',
                        'favorite landscapes'].map((text, index) => (
                        <Link to={`${this.getToUrl(text)}`}>
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Log out', 'Notifications'].map((text, index) => (
                        <Link to={`${this.getToUrl(text)}`}>
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} onClick={()=>{if(text === "Log out"){this.props.logoutt()}}}/>
                        </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
        );
        return (
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
        );
    }
}

DrawerComp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withMobileDialog()(withStyles(styles, { withTheme: true })(DrawerComp));
