import React, { useState } from 'react';
import {
    makeStyles,
    Container,
    Grid,
    Paper,
    TextField,
    Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CustomerCard from './CustomerCard';
import NewCustomer from './NewCustomer';



const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    content: {
        // flexGrow: 1,
        height: '100vh',
        // overflow: 'auto',
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
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [customerEdit, setCustomerEdit] = useState(null);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCustomerEdit(null);
    }
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
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={spacing}>
                            {[0, 1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6].map((value) => (
                                <Grid key={value} item>
                                    <CustomerCard />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <NewCustomer open={openDialog} onClose={handleCloseDialog} />
        </main>
    );
}


export default Customers