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
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../Resources/SupaBase';
import SaveFab from '../../Components/SaveFab';

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
}));

const orderObject = {
    // id: 0,
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
    const [order, setOrder] = useState({ ...orderObject })
    const [customerList, setCustomerList] = useState([]);
    const [orderItems, setOrderItems] = useState([])
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showNewItemDialog, setShowNewItemDialog] = useState(false)
    const timer = useRef();


    useEffect(() => {
        fetchOrder();
        fetchCustomers();
        fetchOrderItems();

        return () => {
            clearTimeout(timer.current);
        };
    }, [])

    useEffect(() => {
        if (saved) {
            setSaving(false);
            timer.current = window.setTimeout(() => {
                setSaved(false);
            }, 1500);
        }
    }, [saved])

    const fetchOrder = async () => {
        const { data, error } = await supabase
            .from('Orders')
            .select(`*`)
            .eq('id', id);
        setOrder(data[0]);
        console.log(data[0])
    }

    const fetchOrderItems = async () => {
        const { data, error } = await supabase
            .from('Order_Items')
            .select(`*,
            product:Products (
                name
              )
            `)
            .eq('order_id', id);
        console.log('oreder_items')
        console.log(data)
        setOrderItems(data);
    }

    const fetchCustomers = async () => {
        const { data, error } = await supabase
            .from('Customers')
            .select(`id,first_name,last_name`)
        console.log('customers', data)
        setCustomerList(data)
    }

    const handleChange = (event) => {
        setOrder({ ...order, [event.target.name]: event.target.value });
    }

    const handleSave = async () => {
        setSaving(true);
        let failed;
        const obj = Object.keys(orderObject).reduce((result, key) => ({ ...result, [key]: order[key] }), {})
        const { data, error } = await supabase
            .from('Orders')
            .update(obj)
            .match({ id: id })
        failed = error
        setSaved(true);

        if (failed)
            alert("somting went wrong please contact support")
    };

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5em' }}>
                    <Typography component="h1" variant="h5" >
                        Order # {id}
                    </Typography>
                    <Typography style={{ marginRight: '50px' }} >
                        {new Date(order.inserted_at).toDateString()}
                    </Typography>
                    <SaveFab loading={saving} success={saved} onClick={handleSave} />
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} >
                        <FormControl fullWidth variant='outlined'>
                            <InputLabel  >
                                Customer Name
                            </InputLabel>
                            <Select
                                displayEmpty
                                label='Customer Name'
                                value={order.customer_id}
                                name={'customer_id'}
                                onChange={handleChange}
                            >
                                <MenuItem value=""></MenuItem>
                                {customerList.map(x => <MenuItem key={x.id} value={x.id}> {x.last_name} {x.first_name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Price"
                            fullWidth
                            variant='outlined'
                            value={order.price}
                            name={'price'}
                            onChange={handleChange}
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
                            name={'completed_at'}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Delivered at"
                            type="datetime-local"
                            fullWidth
                            variant='outlined'
                            value={order.delivered_at?.split('.')[0]}
                            name={'delivered_at'}
                            onChange={handleChange}
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
                            name={'expected_at'}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" value={order.expedite} onClick={_ => setOrder({ ...order, expedite: !order.expedite })} />}
                            label="Expedite"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Custom Order#"
                            fullWidth
                            variant='outlined'
                            value={order.custom_order_number}
                            name={'custom_order_number'}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Notes"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={order.notes}
                            name={'notes'}
                            onChange={handleChange}
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
                            {orderItems.map((value) => (
                                <Grid key={value.id} item>
                                    <OrderProduct key={value.id} orderItem={value} />
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
