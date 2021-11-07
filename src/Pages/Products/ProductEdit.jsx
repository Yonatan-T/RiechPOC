import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    DialogActions,
    Button
} from "@material-ui/core"
import { useState, useEffect } from "react"
import { supabase } from "../../Resources/SupaBase"

const productObject = {
    name: ''
}

const ProductEdit = ({ onClose, open, editId }) => {
    const [product, setProduct] = useState({ ...productObject })

    useEffect(() => {
        if (open && editId)
            fetchExistingProduct();
    }, [open])

    const fetchExistingProduct = async () => {
        const { data, error } = await supabase
            .from('Products')
            .select()
            .eq('id', editId)
        setProduct(data[0]);
    }

    const handleSave = async () => {
        let failed;
        if (editId) {
            const obj = Object.keys(productObject).reduce((result, key) => ({ ...result, [key]: product[key] }), {})
            const { data, error } = await supabase
                .from('Products')
                .update(obj)
                .match({ id: editId })
            failed = error
        } else {
            const { data, error } = await supabase
                .from('Products')
                .insert([
                    { ...product }
                ])
            failed = error
        }
        if (failed)
            alert("somting went wrong please contact support")

        onClose();  // this is to close the dialog
    }
    const handleCancel = () => {
        setProduct({ ...productObject })
        onClose();
    }

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth='md'>
            <DialogTitle >Product {editId && ` (${editId})`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item >
                        <TextField
                            name="Name"
                            variant="outlined"
                            required
                            fullWidth
                            label="Name"
                            autoFocus
                            value={product.name}
                            onChange={x => setProduct({ ...product, name: x.target.value })}
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

export default ProductEdit
