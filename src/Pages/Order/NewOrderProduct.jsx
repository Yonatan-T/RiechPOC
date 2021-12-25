import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@material-ui/core"
import { useEffect } from "react";
import { supabase } from "../../Resources/SupaBase";


const orderProductObj = {
    id: 0,
    product_id: 0,
    order_id: 0,
}
const NewOrderProduct = ({orderId}) => {
    const [newOrderProd, setNewOrderProd] = useState(...orderProductObj)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // setNewOrderProd(prev => ...prev,)
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        const [data, error] = await supabase
            .from("Products")
            .select("id,name")
            .order('name');

        if (!error)
            setProducts(data);

    }

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth='md'>
            <DialogTitle >Product {editId && ` (${editId})`}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item >
                        <FormControl fullWidth variant='outlined'>
                            <InputLabel  >
                                Product
                            </InputLabel>
                            <Select
                                displayEmpty
                                value={newOrderProd.product_id}
                                name={'product_id'}
                                onChange={handleChange}
                            >
                                <MenuItem value=""></MenuItem>
                                {products.map(x => <MenuItem key={x.id} value={x.id}> {x.name}</MenuItem>)}
                            </Select>
                        </FormControl>

                        {/* <TextField
                            name="Name"
                            variant="outlined"
                            required
                            fullWidth
                            label="Name"
                            autoFocus
                            value={product.name}
                            onChange={x => setProduct({ ...product, name: x.target.value })}
                        /> */}
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

export default NewOrderProduct
