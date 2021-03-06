import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Container,
    Grid,
    Paper,
    TextField,
    Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { supabase } from '../../Resources/SupaBase';
import OrderItem from './OrderItem';
import NewOrder from '../Order/NewOrder';



const useStyles = makeStyles((theme) => ({
    content: {
        // flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        width: '100%'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar,
    searchContainer: {
        width: 'auto',
        height: 50,
        marginBottom: theme.spacing(2)
    },

    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    avatar: {
        margin: 10,
        backgroundColor: theme.palette.grey['200'],
        color: theme.palette.text.primary,
    },
    avatarContainer: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginBottom: theme.spacing(4)
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
        }
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
    fixedButton: {
        margin: 0,
        top: '11vh',
        right: 30,
        bottom: 'auto',
        left: 'auto',
        position: 'fixed'
    }
}));

const Orders = () => {
    const classes = useStyles();

    const [orders, setOrders] = useState([])
    const [openNewOrder, setOpenNewOrder] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, [])

    const fetchOrders = async () => {
        const { data, error } = await supabase
            .from('Orders')
            .select(`*,
            customer:Customers (
                first_name,
                last_name
              )
            `)
            .order('id', { ascending: false });

        // console.log('orders...', error, data)
        setOrders(data)
    }

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Fab className={classes.fixedButton}
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => setOpenNewOrder(true)}>
                    <AddIcon />
                </Fab>
                <Paper className={classes.searchContainer} >
                    <TextField className={classes.InputField} size="small" placeholder='search By name' />
                    <TextField className={classes.InputField} size="small" placeholder='search By Phone Number' />
                </Paper>
                <Grid container justifyContent="center">
                    <Grid item xs={10}>
                        {orders.map(x => <OrderItem key={x.id} order={x} />)}
                    </Grid>
                </Grid>
            </Container>
            <NewOrder open={openNewOrder} handleClose={() => setOpenNewOrder(false)} />
        </main>
    );
}


export default Orders


