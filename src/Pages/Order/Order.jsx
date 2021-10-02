import { Grid, makeStyles, Container, Select, FormControl, InputLabel, MenuItem, Button, Fab, Card, CardContent, Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AsyncAutocomplete from '../../Components/AsyncAutocomplete';
import CustomerCard from '../Customers/CustomerCard';
import OrderProduct from './OrderProduct';
import SaveIcon from '@material-ui/icons/Save';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../Resources/SupaBase';

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

const orderObject = {
    id: 0,
    customer_id: 0,
    custom_order_number: '',
    completed_at: '',
    delivered_at: '',
    expected_at: '',
    expedite: false,
    notes: '',
    price: '',
}

const Order = () => {
    const classes = useStyles();
    let { id } = useParams()
    const [order, setOrder] = useState({...orderObject})

    useEffect(() => {
        fetchOrder();
    }, [])

    const fetchOrder = async () => {
        const { data, error } = await supabase
            .from('Orders')
            .select(`*`)
            .eq('id', id);
        setOrder(data[0]);
        console.log(data[0])
    }

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5em' }}>
                    <Typography component="h1" variant="h5" >
                        Order # {id}
                    </Typography>
                    <Typography   >
                        {new Date(order.inserted_at).toDateString()}
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
                            value={order.price}
                        />
                        {/* <AsyncAutocomplete lable='person'/> */}
                    </Grid>
                    {/* <Grid item xs={6}>
                        <TextField
                            label="Created at"
                            type="datetime-local"
                            defaultValue={new Date(Date.now()).toISOString().split('.')[0]}
                            fullWidth
                            variant='outlined'
                            value={order.inserted_at?.split('.')[0]}
                        />
                    </Grid> */}
                    <Grid item xs={6}>
                        <TextField
                            label="Completed at"
                            type="datetime-local"
                            fullWidth
                            variant='outlined'
                            value={order.completed_at?.split('.')[0]}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Delivered at"
                            type="datetime-local"
                            fullWidth
                            variant='outlined'
                            value={order.delivered_at?.split('.')[0]}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Expected at"
                            type="datetime-local"
                            className={classes.textField}
                            fullWidth
                            variant='outlined'
                            value={order.expected_at?.split('.')[0]}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" value={order.expedite} />}
                            label="Expedite"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Custom Order#"
                            fullWidth
                            variant='outlined'
                            value={order.custom_order_number}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Notes"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={order.notes || ''}
                        />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '25px' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2} >
                            <Grid item>
                                <Card style={{ minWidth: '275px', height: '100%' }} onClick={_ => alert('add new item...')}>
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
