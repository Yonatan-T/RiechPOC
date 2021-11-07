import { Button, Paper, Typography, makeStyles } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        textAlign: "left",
        color: theme.palette.text.secondary
    },
    box: {
        marginBottom: 40,
        // height: 65
        maxWidth: '250px'
    },
    actionButtom: {
        textTransform: "uppercase",
        margin: theme.spacing(1),
        // width: 152
    },
    alignRight: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));


const ProdcutBox = ({ product, handleOpen }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <div className={classes.box}>
                <Typography
                    style={{ textTransform: "uppercase", textAlign: 'center' }}
                    color="textPrimary"
                    gutterBottom
                    variant="h6"
                >
                    {product.name}
                </Typography>

            </div>
            <div className={classes.alignRight}>
                <Button
                    variant="outlined"
                    className={classes.actionButtom}
                >
                    delete
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.actionButtom}
                    onClick={handleOpen}
                >
                    edit
                </Button>
            </div>
        </Paper>
    )
}

export default ProdcutBox
