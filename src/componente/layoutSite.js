import { React } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

const useAndreea = makeStyles({
    root:{
        background : "#fff",
        minHeight: "100vh",
    }
})

const useStyles = makeStyles({
    root:{
        background : "#141d26",
        minHeight: "100vh",
    }
})

export default function LayoutSite(props) {
    const stil_night = useStyles();
    const stil_light = useAndreea();

    return(
        <Box component="main" className={props.andreea ? stil_light.root : stil_night.root}>
            {props.children}
        </Box>
    );
}