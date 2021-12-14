import { Grid, makeStyles, Container, Select, FormControl, InputLabel, MenuItem, Button, Fab, Card, CardContent, Avatar, Box, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../Resources/SupaBase';
import ProcessIcon from '../../Components/Icons/ProcessIcon';

const useStyles = makeStyles((theme) => ({
    content: {
        // flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        width: '100%'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar,
}));

const Process = () => {
    const classes = useStyles();

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');


    const [services, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [itemId, setItemId] = useState('')
    const [serviceId, setServiceId] = useState(null);
    const [employeeId, setEmployeeId] = useState(null)


    useEffect(() => {
        fetchServices();
        fetchEmployees();
    }, [])

    const fetchServices = async () => {
        const { data, error } = await supabase
            .from('Services')
            .select(`id,name`)
        console.log('Services', data)
        setServices(data);
    };

    const fetchEmployees = async () => {
        const { data, error } = await supabase
            .from('Employees')
            .select(`id,first_name,last_name`)
        console.log('Employees', data)
        setEmployees(data);
    };

    const handleChange = (event) => {
        // setOrder({ ...order, [event.target.name]: event.target.value });
    }

    const handleSave = async () => {
        setError('');
        if (!itemId || !serviceId) {
            setError('please fill all requierd fields');
            return;
        }
        setSaving(true);
        let failed;
        const { data, error } = await supabase
            .from('Work_Events')
            .insert([
                { order_item_id: itemId, service_id: serviceId, employee_id: employeeId }
            ])
        console.log(error)
        failed = error
        setSaved(true);

        if (failed) {
            if (error.message.includes('Work_Events_order_item_id_fkey')) {
                setError('invalid item #')
            } else {
                setError(error.message)
            }
        } else {
            setSaved(true)
            setTimeout(() => {
                setSaved(false);
            }, 1500);

            setItemId('');
            setServiceId(null);
            setEmployeeId(null);
        }
        setSaving(false)
    };


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
                        <ProcessIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ marginTop: '1em' }} >
                        Process center
                    </Typography>
                    <Box
                        style={{ marginTop: '3em' }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="itemId"
                                    required
                                    fullWidth
                                    id="itemId"
                                    label="Item #"
                                    autoFocus
                                    variant='outlined'
                                    onChange={x => setItemId(x.target.value)}
                                    value={itemId}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant='outlined'>
                                    <InputLabel  >
                                        Service *
                                    </InputLabel>
                                    <Select
                                        label='Service'
                                        value={serviceId}
                                        name='serviceId'
                                        onChange={x => setServiceId(x.target.value)}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        {services.map(x => <MenuItem key={x.id} value={x.id}> {x.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant='outlined'>
                                    <InputLabel  >
                                        Employee
                                    </InputLabel>
                                    <Select
                                        displayEmpty
                                        label='Employee'
                                        value={employeeId}
                                        name='employeeId'
                                        onChange={x => setEmployeeId(x.target.value)}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        {employees.map(x => <MenuItem key={x.id} value={x.id}> {x.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color='primary'
                            style={{ marginTop: '3em' }}
                            onClick={handleSave}
                            disabled={saving}
                        >
                            Submit
                        </Button>
                        {error && <Typography component="h1" variant="h5" style={{ marginTop: '1em', color: 'red' }} >
                            {error}
                        </Typography>}
                        {saved && <Typography component="h1" variant="h5" style={{ marginTop: '1em', color: 'green', textAlign: 'center' }} >
                            Updated Successfuly !
                        </Typography>}
                    </Box>
                </Box>
            </Container>
        </main>
    );
}

export default Process
