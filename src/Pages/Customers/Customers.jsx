import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Container,
    Grid,
    Paper,
    TextField,
    Fab,
    Fade,
    CircularProgress
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CustomerCard from './CustomerCard';
import NewCustomer from './NewCustomer';
import { supabase } from '../../Resources/SupaBase';




const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    content: {
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
    InputField: {
        margin: theme.spacing(1)
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

const Customers = () => {
    const classes = useStyles();
    const [customersList, setCustomersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [customerEditId, setCustomerEditId] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = async () => {
        const { data, error } = await supabase.from('Customers').select();
        setLoading(false);
        setCustomersList(data);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCustomerEditId(null);
    }

    const openEdit = id => {
        setCustomerEditId(id);
        setOpenDialog(true);
    }

    const progress = <div style={{ textAlign: 'center' }}>
        <Fade
            in={loading}
            // style={{ marginTop: '20vh' }}
            unmountOnExit
        >
            <CircularProgress
                style={{
                    marginBottom: 32,
                    width: 100,
                    height: 100
                }}
            />
        </Fade>
    </div>

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Fab className={classes.fixedButton}
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => setOpenDialog(true)}>
                    <AddIcon />
                </Fab>
                <Paper className={classes.searchContainer} >
                    <TextField className={classes.InputField} size="small" placeholder='search By name' />
                    <TextField className={classes.InputField} size="small" placeholder='search By Phone Number' />
                </Paper>
                {progress}
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2}>
                            {customersList.map((_customer) => (
                                <Grid key={_customer.id} item>
                                    <CustomerCard
                                        customer={_customer}
                                        handleOpen={_ => openEdit(_customer.id)}
                                        key={_customer.id} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <NewCustomer open={openDialog} onClose={handleCloseDialog} customerId={customerEditId} />
        </main>
    );
}


export default Customers