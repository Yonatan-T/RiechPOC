import React from 'react'
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


const NewCustomer = ({ onClose, open }) => {

    const handleClose = () => {
        // save edit or new
        onClose();
    }
    const handleCancel = () => {
        onClose();
    }


    return (
        <Dialog open={open} onClose={handleClose}  maxWidth='md'>
            <DialogTitle >New Customer</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText> */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Company Name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Phone 1"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Phone 2"
                        />
                    </Grid><Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Email Address"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Street"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="House"
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Floor"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="City"
                        />
                    </Grid><Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="State"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Zip"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline={true}
                            label="Notes"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary"  variant='outlined'>
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary"  variant='contained'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewCustomer
