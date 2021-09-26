import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    DialogActions,
    Button
} from "@material-ui/core"



const ServiceEdit = ({ onClose, open }) => {

    const handleClose = () => {
        // save edit or new
        // onClose();
    }
    const handleCancel = () => {
        // onClose();
    }
    return (
        <Dialog open={open} onClose={handleClose} maxWidth='md'>
            <DialogTitle >Service</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="Name"
                            variant="outlined"
                            required
                            fullWidth
                            label="Name"
                            autoFocus
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant='outlined'>
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary" variant='contained'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ServiceEdit
