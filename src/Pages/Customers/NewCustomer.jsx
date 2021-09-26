import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
    Button,
    Grid
} from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { supabase } from '../../Resources/SupaBase';


const customerObject = {
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    phone_1: "",
    phone_2: "",
    street: "",
    house: "",
    floor: null,
    city: "",
    state: "",
    zip: null,
    notes: ""
}


const NewCustomer = ({ onClose, open, customerId }) => {
    const [customer, setCustomer] = useState({ ...customerObject })


    useEffect(() => {
        if (open && customerId) {
            fetchExistingCustomer();
        }
    }, [open])


    const fetchExistingCustomer = async () => {
        const { data, error } = await supabase
            .from('Customers')
            .select()
            .eq('id', customerId)
        console.log(data, error)
        setCustomer(data[0]);
    }

    const handleSave = async () => {
        let failed;
        if (customerId) {
            const obj = Object.keys(customerObject).reduce((result, key) => ({ ...result, [key]: customer[key] }), {})
            const { data, error } = await supabase
                .from('Customers')
                .update(obj)
                .match({ id: customerId })
            failed = error
        } else {
            const { data, error } = await supabase
                .from('Customers')
                .insert([
                    { ...customer }
                ])
            failed = error
        }
        if (failed)
            alert("somting went wrong please contact support")

        onClose();  // this is to close the dialog
    }

    const handleCancel = () => {
        setCustomer({ ...customerObject });
        onClose();  // this is to close the dialog
    }

    return (
        <Dialog open={open} onClose={(e, r) => handleCancel()} maxWidth='md'>
            <DialogTitle >{customerId ? `Customer # ${customerId}- (Edit)` : `New Customer`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="First Name"
                            autoFocus
                            onChange={x => setCustomer({ ...customer, first_name: x.target.value })}
                            value={customer.first_name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Last Name"
                            onChange={x => setCustomer({ ...customer, last_name: x.target.value })}
                            value={customer.last_name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Company Name"
                            onChange={x => setCustomer({ ...customer, company_name: x.target.value })}
                            value={customer.company_name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Phone 1"
                            onChange={x => setCustomer({ ...customer, phone_1: x.target.value })}
                            value={customer.phone_1}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Phone 2"
                            onChange={x => setCustomer({ ...customer, phone_2: x.target.value })}
                            value={customer.phone_2}
                        >{ }</TextField>
                    </Grid><Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Email Address"
                            onChange={x => setCustomer({ ...customer, email: x.target.value })}
                            value={customer.email}
                        >{ }</TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Street"
                            onChange={x => setCustomer({ ...customer, street: x.target.value })}
                            value={customer.street}
                        >{ }</TextField>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="House"
                            onChange={x => setCustomer({ ...customer, house: x.target.value })}
                            value={customer.house}
                        >{ }</TextField>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Floor"
                            onChange={x => setCustomer({ ...customer, floor: x.target.value })}
                            value={customer.floor}
                        >{ }</TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="City"
                            onChange={x => setCustomer({ ...customer, city: x.target.value })}
                            value={customer.city}
                        >{ }</TextField>
                    </Grid><Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="State"
                            onChange={x => setCustomer({ ...customer, state: x.target.value })}
                            value={customer.state}
                        >{ }</TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Zip"
                            onChange={x => setCustomer({ ...customer, zip: x.target.value })}
                            value={customer.zip}
                        >{ }</TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline={true}
                            label="Notes"
                            onChange={x => setCustomer({ ...customer, notes: x.target.value })}
                            value={customer.notes}
                        >{ }</TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancel}
                    color="primary" variant='outlined'>
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant='contained'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewCustomer
