import {
    makeStyles,
    Container,
    Grid,
    Paper,
    TextField,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Typography,
    Chip,
    Button
} from '@material-ui/core';

import AutorenewIcon from '@material-ui/icons/Autorenew';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { deepOrange, deepPurple, orange } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1)
    },
    avatar: {
        margin: 10,
        backgroundColor: theme.palette.grey['200'],
        color: theme.palette.text.primary,
    },
    avatarContainer: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginBottom: theme.spacing(2)
        }
    },
    itemContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }
    },
    baseline: {
        alignSelf: 'baseline',
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            marginLeft: 0
        }
    },
    inline: {
        display: 'inline-block',
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        },
        // verticalAlign: 'text-bottom'
    },
    inlineRight: {
        width: '30%',
        textAlign: 'right',
        marginLeft: 50,
        alignSelf: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: 0,
            textAlign: 'center'
        }
    },
    backButton: {
        marginRight: theme.spacing(2)
    },
    primaryButton: {
        marginRight: theme.spacing(2)
    }

}));





const OrderItem = ({order}) => {
    const classes = useStyles();
    const history = useHistory()

    return (
        <Paper className={classes.paper}>
            <div className={classes.itemContainer}>
                <div className={classes.avatarContainer}>
                    <Avatar className={classes.avatar}>
                        <ShoppingCartIcon />
                    </Avatar>
                </div>
                <div className={classes.baseline} style={{ margin: 10 }}>
                    <div className={classes.inline}>
                        {/* <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                            
                        </Typography> */}
                        <Typography variant="h6" gutterBottom>
                            #{order.id}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            #{order.custom_order_number}
                        </Typography>
                    </div>
                    <div className={classes.inline}>
                        <Typography variant="h6" gutterBottom>
                            {order.customer.first_name} {order.customer.last_name}
                        </Typography>
                    </div>
                    <div className={classes.inline}>
                        {/* <Typography style={{ textTransform: 'uppercase' }} color='secondary' gutterBottom>
                            Amount
                        </Typography> */}
                        <Typography variant="h6" gutterBottom>
                            ${order.price.toFixed(2)}
                        </Typography>
                    </div>
                    <div className={classes.inline}>
                        <Chip
                            icon={<AutorenewIcon />}
                            label="In Progress"
                            variant="outlined"
                            color='primary'
                            style={{backgroundColor:'green',color:'white'}}
                        />
                    </div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <Button
                        className={classes.primaryButton}
                    >
                        Print
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.secondary}
                        onClick={() => history.push(`/order/${order.id}`)}
                    >
                        open
                    </Button>
                </div>
            </div>
        </Paper>

    )
}

export default OrderItem
