import {
    makeStyles,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Grid,
    Avatar
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },

});

const CustomerCard = ({ person }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Avatar>B</Avatar>
                <Typography variant="h5" component="h2">
                    joe biden
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Company Name
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    1-718-911-9911
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small">Open</Button>
            </CardActions>
        </Card>
    );
}

export default CustomerCard
