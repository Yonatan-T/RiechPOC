import { green } from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import { Box, CircularProgress, Fab, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    fixedButton: {
        margin: 0,
        top: '11vh',
        right: 30,
        bottom: 'auto',
        left: 'auto',
        position: 'fixed'
    }
}));

export default function SaveFab({ loading, success, onClick }) {
    const calsses = useStyles();

    const progressStyle = {
        margin: 0,
        top: '10.2vh',
        right: 23,
        bottom: 'auto',
        left: 'auto',
        color: green[500],
        position: 'fixed'
    }
    return (
        <>
            <Fab
                aria-label="save"
                color="secondary"
                onClick={onClick}
                className={calsses.fixedButton}
                style={{ backgroundColor: success && green[500] }}
            >
                {success ? <CheckIcon /> : <SaveIcon />}
            </Fab>
            {loading && (
                <CircularProgress
                    size={68}
                    style={progressStyle}
                />
            )}
        </>
    );
}