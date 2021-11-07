import { useState, useEffect } from "react"

import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    DialogActions,
    Button
} from "@material-ui/core"
import { supabase } from "../../Resources/SupaBase"



const serviceObject = {
    name: ''
}
const ServiceEdit = ({ onClose, open, editId }) => {
    const [service, setService] = useState({ ...serviceObject })

    useEffect(() => {
        if (open && editId)
            fetchExistingService();
    }, [open])

    const fetchExistingService = async () => {
        const { data, error } = await supabase
            .from('Services')
            .select()
            .eq('id', editId)
        setService(data[0]);
    }

    const handleSave = async () => {
        let failed;
        if (editId) {
            const obj = Object.keys(serviceObject).reduce((result, key) => ({ ...result, [key]: service[key] }), {})
            const { data, error } = await supabase
                .from('Services')
                .update(obj)
                .match({ id: editId })
            failed = error
        } else {
            const { data, error } = await supabase
                .from('Services')
                .insert([
                    { ...service }
                ])
            failed = error
        }
        if (failed)
            alert("somting went wrong please contact support")

        onClose();  // this is to close the dialog
    }

    const handleCancel = () => {
        setService({ ...serviceObject })
        onClose();
    }
    
    return (
        <Dialog open={open} onClose={handleCancel} maxWidth='md'>
            <DialogTitle >Service {editId && `-- ${editId}`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item >
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Name"
                            autoFocus
                            value={service.name}
                            onChange={x => setService({ ...service, name: x.target.value })}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary" variant='outlined'>
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant='contained'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ServiceEdit
