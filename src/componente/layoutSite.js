import { React } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';

const useAndreea = makeStyles({
    root:{
        background : "#fff",
        minHeight: "100vh",
        minWidth:"100vw",
    }
})

const useStyles = makeStyles({
    root:{
        background : "#141d26",
        minHeight: "100vh",
        minWidth:"100vw",
    }
})

export default function LayoutSite(props) {
    const stil_night = useStyles();
    const stil_light = useAndreea();

    return(
        <Container className={props.andreea ? stil_light.root : stil_night.root}>
            {props.children}
        </Container>
    );
}