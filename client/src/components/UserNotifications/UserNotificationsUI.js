import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import withMobileDialog from '@material-ui/core/withMobileDialog';


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
        width: '40%',
        height: '48px',
        margin: '12px 4px 15px',
        position: 'absolute',
        bottom: '0',
        left: '50%'
    },
    buttonAdd2: {
        width: '40%',
        height: '48px',
        margin: '12px 4px 15px',
        position: 'absolute',
        left: '15px',
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
function createData(id,from,location,type) {
    let fromVal =from;
    let locationVal =location;
    if(fromVal) {
        fromVal = from.email;
    }
    if(locationVal) {
        locationVal = location.title;
    }
    return { id, from: fromVal,location: locationVal,type };
}
class UserNotificationsUI extends React.Component {
    state = {
        mobileOpen: false,
        reqId: null,
    };
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    componentWillReceiveProps(nextProps) {
        if(nextProps.openDrawer !== this.props.openDrawer) {
            this.handleDrawerToggle()
        }
    }
    render() {
        console.log(this.props);
        const { classes, requests, theme, fullScreen} = this.props;
        const rows = requests.map((req) => {return createData(req._id,req.from,req.forLocation,req.type); });
        return (
            <div className={classes.profileContainer}>
                <Typography className={classes.title} variant="h5" color="inherit" noWrap>Your Requests</Typography>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>from</TableCell>
                            <TableCell>for</TableCell>
                            <TableCell>type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id} onClick={()=>{this.setState({reqId: row.id})}}>
                                <TableCell component="th" scope="row">
                                    {row.from}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.location}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.type}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {this.state.reqId &&
                <div>
                    <Button onClick={() => {
                        this.props.onUpdateRequest(this.state.reqId, 'accepted')
                    }} classes={{root: classes.buttonAdd}} variant="outlined">accept</Button>
                    <Button onClick={() => {
                        this.props.onUpdateRequest(this.state.reqId, 'rejected')
                    }} classes={{root: classes.buttonAdd2}} variant="outlined">reject</Button>
                </div>
                }
            </div>
        );
    }
}

UserNotificationsUI.propTypes = {
    classes: PropTypes.object.isRequired,
    requests: PropTypes.array.isRequired,
};

export default withMobileDialog()(withStyles(styles, { withTheme: true })(UserNotificationsUI));
