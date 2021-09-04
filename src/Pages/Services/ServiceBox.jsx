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
        maxWidth:'250px'
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


const ServiceBox = ({ Id, Name }) => {
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
                    welder
                </Typography>
                {/* <Typography variant="body1" gutterBottom>
                    If you click in Getting Started, you will see a nice
                    carousel
                </Typography> */}
            </div>
            <div className={classes.alignRight}>
                <Button
                    // onClick={this.openDialog}
                    variant="outlined"
                    className={classes.actionButtom}
                >
                    delete
                </Button>
                <Button
                    // onClick={this.openGetStartedDialog}
                    color="primary"
                    variant="contained"
                    className={classes.actionButtom}
                >
                    edit
                </Button>
            </div>
        </Paper>
    )
}

export default ServiceBox
