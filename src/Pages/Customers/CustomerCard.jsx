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

const CustomerCard = ({ customer, handleOpen }) => {
    const classes = useStyles();
    const avatarLetter = customer.last_name[0].toUpperCase();
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Avatar>{avatarLetter}</Avatar>
                <Typography variant="h5" component="h2">
                    {customer.first_name} {customer.last_name}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {customer.company_name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {customer.phone_1 ?? customer.phone_2} {/* todo: format phone*/}
                </Typography>

            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={handleOpen}
                >Open</Button>
            </CardActions>
        </Card>
    );
}

export default CustomerCard
