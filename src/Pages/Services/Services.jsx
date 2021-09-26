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
import ServiceBox from './ServiceBox';
import ServiceEdit from './ServiceEdit';



const useStyles = makeStyles((theme) => ({
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
    fixedButton: {
        margin: 0,
        top: '11vh',
        right: 30,
        bottom: 'auto',
        left: 'auto',
        position: 'fixed'
    }
}));


const Services = () => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);

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
                {/* <Paper className={classes.searchContainer} >
                    <TextField className={classes.InputField} size="small" placeholder='search By name' />
                    <TextField className={classes.InputField} size="small" placeholder='search By Phone Number' />
                </Paper> */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2}>
                            {[0, 1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6].map((value) => (
                                <Grid key={value} item>
                                    <ServiceBox/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <ServiceEdit open={openDialog}/>
        </main>
    )
}

export default Services
