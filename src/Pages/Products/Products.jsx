import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Container,
    Grid,
    Paper,
    TextField,
    Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ProdcutBox from './ProdcutBox';
import ProductEdit from './ProductEdit';
import { supabase } from '../../Resources/SupaBase';



const useStyles = makeStyles((theme) => ({
    content: {
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


const Products = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([])
    const [openDialog, setOpenDialog] = useState(false);
    const [productEditId, setProductEditId] = useState(null)

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('Products')
            .select();

        console.log('products:',data)

        setProducts(data);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setProductEditId(null);
        fetchProducts();
    }

    const openEdit = id => {
        setProductEditId(id);
        setOpenDialog(true);
    }


    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Fab className={classes.fixedButton}
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => setOpenDialog(true)}>
                    <AddIcon />
                </Fab>
                {/* <Paper className={classes.searchContainer} >
                    <TextField className={classes.InputField} size="small" placeholder='search By name' />
                    <TextField className={classes.InputField} size="small" placeholder='search By Phone Number' />
                </Paper> */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2}>
                            {products.map((x) => (
                                <Grid key={x} item>
                                    <ProdcutBox key={x.id} product={x} handleOpen={_ => openEdit(x.id)}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <ProductEdit open={openDialog} onClose={handleCloseDialog} editId={productEditId} />
        </main>
    )
}

export default Products
