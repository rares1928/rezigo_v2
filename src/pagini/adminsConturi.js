import React, {useState, useEffect} from 'react';
import { callApi } from '../utils/callApi';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import AdminsTable from '../componente/adminsTable';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    wrapperDiv:{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - calc(8 * 8px))",
        justifyContent: "space-between",
    },
    root: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    buttons: {
        width: theme.spacing(25),
    },
  }));



export default function AdminsConturi() {
    const [ready, setReady] = useState(false);
    const [items, setItems] = useState({});
    let history = useHistory();


    useEffect( () => {
        const handleError = () => {
            history.push({ pathname: "/" });
        }
    
        const handleItems = (e) => {
            setItems(e.data);
            setReady(true);
        };
        const url = "https://grileapiwin.azurewebsites.net/api/GetConturi?code=hafa9xHxX8lJAehKzLkzru6jGHfwF8UcaR85cWIZSwU8eanY/srhhA==";
        callApi(url, {}, handleItems, handleError);
    }, [history])
    const classes=useStyles();
    const TITLE = "Conturi";
    return(
        <div className={classes.wrapperDiv}>
        <Helmet>
            <title>{TITLE}</title>
        </Helmet>
        <Container className={classes.root} maxWidth="lg">
           {!ready? <CircularProgress/>:
                <div>
                    <AdminsTable
                    rows = {items['lista']}
                    />
                </div> 
            }
        </Container>
    </div>
    );
}