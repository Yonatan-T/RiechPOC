import { Grid, makeStyles, Container, Select, FormControl, InputLabel, MenuItem, Button, Fab, Card, CardContent, Avatar, Box, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../Resources/SupaBase';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    content: {
        height: '100vh',
        // flexGrow: 1,
        overflow: 'auto',
        width: '100%'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar,
}));

const Login = ({ OnLogin }) => {
    const classes = useStyles();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    var history = useHistory();

    const login = async () => {
        // var response = await supabase.auth.signIn({
        //     email: 'ayt2035@gmail.com',
        //     password: '123456'
        // })
        // console.log(response);
        var { user: loginUser, error } = await supabase.auth.signIn({
            email: user,
            password: password,
        })
        if (loginUser) {
            OnLogin(loginUser)
            history.push('/');
        } else if (error) {
            setError(error.message)
        }
        else {
            setError('Somthing went wrong, please try again')
        }
    }

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="xs" className={classes.container}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar variant='circle' style={{ height: '56px', width: '56px' }}>
                        <LockOpenIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ marginTop: '1em' }} >
                        Login
                    </Typography>
                    <Box
                        style={{ marginTop: '3em' }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="UserName"
                                    required
                                    fullWidth
                                    id="User"
                                    label="User Name"
                                    autoFocus
                                    variant='outlined'
                                    onChange={x => setUser(x.target.value)}
                                    value={user}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    type='password'
                                    name="password"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    autoFocus
                                    variant='outlined'
                                    onChange={x => setPassword(x.target.value)}
                                    value={password}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color='primary'
                            style={{ marginTop: '3em' }}
                            onClick={login}
                        >
                            Login
                        </Button>
                        {error && <Typography component="h1" variant="h5" style={{ marginTop: '1em', color: 'red' }} >
                            {error}
                        </Typography>}
                    </Box>
                </Box>
            </Container>
        </main>
    );
}

export default Login
