import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsInputSvideoIcon from '@material-ui/icons/SettingsInputSvideo';
import { List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, ListItemIcon, Checkbox, Divider } from '@material-ui/core';
import { supabase } from '../../Resources/SupaBase';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        maxWidth: 275,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const OrderProduct = ({ orderItem }) => {
    // console.log('orderitem:', orderItem)
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [events, setEvents] = useState([])

    useEffect(() => {
        if (expanded) {
            const fetchEvents = async () => {
                const { data, error } = await supabase
                    .from('Work_Events')
                    .select(`
                            *,
                            Services ( name ),
                            Employees(first_name,last_name)
                        `)
                    .eq('order_item_id', orderItem.id)
                    .order('arrived_at', { ascending: false });
                // console.log('events', data)
                setEvents(data);
            }
            fetchEvents();
        }
    }, [expanded])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar className={classes.avatar} >
                        {orderItem.product.name[0].toUpperCase()}
                    </Avatar>
                    <div style={{ marginLeft: '2em' }}>
                        <Typography variant="h5" component="h2">
                            {orderItem.product.name}
                        </Typography>
                        <Typography color="textSecondary">
                            #{orderItem.id}
                        </Typography>
                    </div>
                </div>
            </CardContent>
            <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <List dense className={classes.list}>
                        {events.map((value) => {
                            return (
                                <>
                                    <ListItem key={value} style={{ marginTop: '1em', marginBottom: '1em' }}>
                                        {/* <ListItemAvatar>
                                        <Avatar className={classes.avatar}
                                           
                                        />
                                    </ListItemAvatar> */}
                                        <ListItemIcon>
                                            <SettingsInputSvideoIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={value.Services.name} />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                onChange={() => { }}
                                                checked
                                            // checked={checked.indexOf(value) !== -1}
                                            // inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider variant="middle" component="li" />
                                </>
                            );
                        })}
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default OrderProduct
