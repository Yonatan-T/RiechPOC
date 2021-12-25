import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Paper,
    Typography,
    IconButton
} from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import { useEffect, useState } from "react";
import { supabase } from "../../Resources/SupaBase";
import { useHistory } from 'react-router-dom';

import OrderProduct from "./OrderProduct";

const NewOrder = ({ open, handleClose }) => {
    const [customers, setCustomers] = useState([]);
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [tempOrderItem, setTempOrderItem] = useState(null)
    const [fieldError, setFieldError] = useState(false);
    const [stage, setStage] = useState(1);

    const [products, setProducts] = useState([]);

    const history = useHistory()


    //effects
    useEffect(() => {
        fetchCustomers();
    }, [])

    useEffect(() => {
        if (tempOrderItem && products.length === 0) {
            fetchProducts();
        }
    }, [tempOrderItem])

    // functions
    const fetchCustomers = async () => {
        const { data, error } = await supabase
            .from('Customers')
            .select(`id,first_name,last_name`)
        setCustomers(data)
    };
    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('Products')
            .select(`id,name`)
        setProducts(data)
    };

    const handleChange = (event) => {
        console.log(event.target.value ? event.target.value : event.target.checked)
        setOrder({ ...order, [event.target.name]: event.target.value ? event.target.value : event.target.checked });
        console.log(order)
    }

    const moveToItems = () => {
        if (stage === 1) {
            var valid = [order.customer_id, order.expected_at].every(x => x)
            setFieldError(true);
            if (!valid) return;
        }
        setFieldError(false);
        setStage(prev => prev === 1 ? 2 : 1)
    }

    const addItem = () => {
        if (!tempOrderItem?.product_id) {
            setFieldError(true)
        } else {
            setOrderItems(prev => [...prev, tempOrderItem])
            setTempOrderItem(null);
            setFieldError(false);
        }
    }

    const removeItem = (index) => {
        const items = [...orderItems];
        items.splice(index, 1);
        setOrderItems(items)
    }

    const save = async () => {
        const { data: newOrder, error } = await supabase
            .from('Orders')
            .insert([order])

        const items = orderItems.map(x => ({ ...x, order_id: newOrder[0].id }))
        const { data: data2, error: error2 } = await supabase
            .from('Order_Items')
            .insert(items)

        history.push(`/order/${newOrder[0].id}`)
        clearData();
        handleClose();
    };

    const close = () => {
        clearData();
        handleClose();
    };

    const clearData = () => {
        setOrder({});
        setOrderItems([]);
        setStage(1);
        setFieldError(false);
    }


    const itemsView = () => {
        return (
            <Grid container>
                <Grid item xs={12} >
                    <Box
                        sx={{
                            display: 'flex',
                            gridGap: 8,
                            '& > :not(style)': {
                                width: '100%',
                                height: 128,
                            },
                        }}>
                        {orderItems.map((item, index) => <Paper key={index} elevation={3} style={{ minWidth: '150px', maxWidth: '150px', height: '70px' }} >
                            <div style={{ textAlign: "right" }}>
                                <span
                                    onClick={x => removeItem(index)}
                                    style={{ paddingRight: '5px', color: "lightgray", cursor: "pointer" }}>X</span>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <span style={{ fontSize: '1.2em', fontWeight: "bold" }}>{products.find(x => x.id === item.product_id).name}</span>
                            </div>
                        </Paper>)}
                    </Box>
                </Grid>

                <Grid item xs={12}   >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width='100%'
                        minHeight='20vh'
                        marginTop='100px'

                    >
                        <Paper elevation={3} style={{ width: '250px', height: '250px' }} >
                            {!tempOrderItem ? <div style={{ display: "flex", justifyContent: "space-around", height: '100%', flexDirection: "column" }}>
                                <Typography style={{ paddingTop: '1em', textAlign: 'center' }} variant="h5" component="h2" color='primary' >
                                    ADD NEW
                                </Typography>
                                <Typography style={{ textAlign: 'center' }} variant="h5" component="h2" color='primary' >
                                    PRODUCT
                                </Typography>
                                <Typography>
                                </Typography>
                                <IconButton
                                    onClick={() => setTempOrderItem({})}
                                    style={{ backgroundColor: '#f0f0f0', cursor: 'pointer', margin: 'auto', height: '4em', width: '4em', marginTop: '25px' }}>
                                    <AddIcon fontSize='large' color='primary' />
                                </IconButton>

                            </div> :
                                <div
                                    style={{
                                        display: "flex",
                                        height: '100%',
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                        padding: '15px'
                                    }}>
                                    <FormControl fullWidth variant='outlined' >
                                        <InputLabel>
                                            Product
                                        </InputLabel>
                                        <Select
                                            error={fieldError}
                                            label='productId'
                                            value={tempOrderItem?.product_id}
                                            name='product_id'
                                            onChange={x => setTempOrderItem(prev => ({ ...prev, product_id: x.target.value }))}
                                        >
                                            <MenuItem value=""></MenuItem>
                                            {products.map(x => <MenuItem key={x.name} value={x.id}> {x.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <Button
                                        onClick={addItem}
                                        color="primary"
                                        variant='contained'>
                                        ADD
                                    </Button>
                                </div>}
                        </Paper>
                    </Box>
                </Grid>
            </Grid >
        );
    }

    return (
        <Dialog open={open} maxWidth='md' fullWidth scroll='body'>
            <DialogTitle>New order</DialogTitle>
            <DialogContent >
                <DialogContentText>
                    {stage === 1 ?
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} >
                                <FormControl fullWidth variant='outlined' error={fieldError}>
                                    <InputLabel  >
                                        Customer Name
                                    </InputLabel>
                                    <Select
                                        displayEmpty
                                        label='Customer Name'
                                        name={'customer_id'}
                                        value={order.customer_id}
                                        onChange={handleChange}
                                        defaultValue={0}
                                    >
                                        <MenuItem value={0}></MenuItem>
                                        {customers.map(x => <MenuItem key={x.id} value={x.id}> {x.last_name} {x.first_name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Price"
                                    fullWidth
                                    variant='outlined'
                                    name={'price'}
                                    type='number'
                                    value={order.price}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    error={fieldError}
                                    label="Expected at"
                                    type="datetime-local"
                                    fullWidth
                                    variant='outlined'
                                    name={'expected_at'}
                                    value={order.expected_at}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    control={<Checkbox
                                        color="secondary"
                                        value={order.expedite}
                                        onClick={_ => setOrder(prev => ({ ...prev, expedite: !order?.expedite }))} />}
                                    label="Expedite"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Custom Order#"
                                    fullWidth
                                    variant='outlined'
                                    name={'custom_order_number'}
                                    value={order.custom_order_number}
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
                                    name={'notes'}
                                    value={order.notes}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid> :
                        itemsView()}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant='text'
                    onClick={close}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant='outlined'
                    onClick={moveToItems}>
                    {stage === 1 ? 'Next' : 'back'}
                </Button>
                {stage > 1 && <Button
                    onClick={save}
                    color="primary"
                    variant='contained'>
                    save
                </Button>}
            </DialogActions>
        </Dialog>
    )
}

export default NewOrder
