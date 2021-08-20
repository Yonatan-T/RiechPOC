import { Grid, makeStyles, Container, Select, FormControl, InputLabel, MenuItem, Button, Fab, Card, CardContent, Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AsyncAutocomplete from '../../Components/AsyncAutocomplete';
import CustomerCard from '../Customers/CustomerCard';
import OrderProduct from './OrderProduct';
import SaveIcon from '@material-ui/icons/Save';

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
    fixedButton: {
        margin: 0,
        top: '11vh',
        right: 30,
        bottom: 'auto',
        left: 'auto',
        position: 'fixed'
    }
}));

const Order = () => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5em' }}>
                    <Typography component="h1" variant="h5" >
                        Order # 123
                    </Typography>
                    <Fab
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.fixedButton}
                    >
                        <SaveIcon />
                    </Fab>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} >
                        {/* <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            autoComplete="given-name"
                        /> */}
                        <FormControl fullWidth variant='outlined'>
                            <InputLabel  >
                                Customer Name
                            </InputLabel>
                            <Select
                                displayEmpty
                                label='Customer Name'
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>joe biden</MenuItem>
                                <MenuItem value={20}>Donald Trump</MenuItem>
                                <MenuItem value={30}>mr. Bush</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Price"
                            fullWidth
                            variant='outlined'
                        />
                        {/* <AsyncAutocomplete lable='person'/> */}
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Created on"
                            type="datetime-local"
                            // defaultValue={'2021-08-17T19:14'}
                            defaultValue={new Date(Date.now()).toISOString().split('.')[0]}
                            fullWidth
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Completed On"
                            type="datetime-local"
                            defaultValue={new Date(Date.now()).toISOString().split('.')[0]}
                            fullWidth
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Delivered On"
                            type="datetime-local"
                            fullWidth
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Expected On"
                            type="datetime-local"
                            className={classes.textField}
                            fullWidth
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" />}
                            label="Expedite"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Notes"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '25px' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2} >
                            <Grid item>
                                <Card style={{ minWidth: '275px',height:'100%' }} onClick={_=> alert('add new item...')}>
                                    <CardContent>
                                        <div style={{ display: 'flex', alignItems: 'center', }}>
                                            <Avatar >
                                                +
                                            </Avatar>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            {[0, 1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6].map((value) => (
                                <Grid key={value} item>
                                    <OrderProduct />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
}

export default Order
