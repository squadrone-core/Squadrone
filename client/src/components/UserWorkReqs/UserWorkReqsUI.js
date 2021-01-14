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
import MoreIcon from '@material-ui/icons/More';
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
function createData(location,status) {
    id += 1;
    return { id, location, status };
}
class UserFriendsUI extends React.Component {
    state = {
        mobileOpen: false,
        requestId: -1,
        editMode: false
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
        const { classes, workReqs, theme, fullScreen} = this.props;
        const rows = workReqs.map((req) => {return createData(req.forLocation, req.status); });
        return (
            <div className={classes.profileContainer}>
                <Typography className={classes.title} variant="h5" color="inherit" noWrap>Work Requests</Typography>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>location</TableCell>
                            <TableCell>status</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row,index) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.location && row.location.title}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.status}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={()=>{this.setState({requestId: index, editMode: true})}}>
                                        <MoreIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {this.state.editMode && this.props.workReqs[this.state.requestId].status === "pending" && <Button onClick={() => {
                    this.props.updateRequest(this.props.workReqs[this.state.requestId]._id, 'canceled');
                    this.setState({editMode: false});
                }} classes={{root: classes.buttonAdd}} variant="outlined">
                    cancel request</Button>
                }
                {this.state.editMode && this.props.workReqs[this.state.requestId].status === "rejected" && <Button onClick={() => {
                    this.props.updateRequest(this.props.workReqs[this.state.requestId]._id, 'pending');
                    this.setState({editMode: false});
                }} classes={{root: classes.buttonAdd}} variant="outlined">
                    request again</Button>
                }
                {this.state.editMode && this.props.workReqs[this.state.requestId].status === "canceled" && <Button onClick={() => {
                    this.props.updateRequest(this.props.workReqs[this.state.requestId]._id, 'pending');
                    this.setState({editMode: false});
                }} classes={{root: classes.buttonAdd}} variant="outlined">
                    request again</Button>
                }
                {(this.state.requestId > -1) && this.props.workReqs[this.state.requestId].status === "accepted" && <Button onClick={() => {
                    {/*todo: work now*/}
                    this.setState({editMode: false});
                }} classes={{root: classes.buttonAdd}} variant="outlined">
                    work now</Button>
                }
            </div>
        );
    }
}

UserFriendsUI.propTypes = {
    classes: PropTypes.object.isRequired,
    workReqs: PropTypes.array.isRequired,
};

export default withMobileDialog()(withStyles(styles, { withTheme: true })(UserFriendsUI));
