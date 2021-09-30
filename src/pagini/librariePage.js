import React, {useState} from 'react';
import { Typography } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { CardActionArea } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper:{
        // height: "80vh",
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
    },
    cardFront: {
        position: "absolute",
        zIndex: "1",
    }, 
    cardBack: {
        zIndex: "-1",
        position: "absolute",
    },  
    parentCard: {
        position: "relative",
        left: "10vw",
        marginTop: "2%"
    },
}));

export default function LibrariePage() {
  
    const classes=useStyles();
    
    const [checked, setChecked] = useState([true, true, true, true]);

    const handleChange = (index) => {
        const tempCheckedList = checked
        tempCheckedList[index] = !tempCheckedList[index]
        setChecked([...tempCheckedList]);
    };

    return (
    <div className={classes.wrapper}>
        {/* <Typography variant="h2">Librarie</Typography> */}
        <Box className={classes.parentCard}>
        {/* <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show"
        /> */}
        <Collapse
            className={classes.cardFront}
            in={checked[0]}
            collapsedSize={0}
            orientation="vertical"
        >
            <Box
            onClick={() => handleChange(0)}
            sx={{
                width: 600,
                height: 50,
                borderRadius: "16px",
                bgcolor: "primary.light"
            }}
            >
            <Typography gutterBottom align="center" variant="h6">
                Doi pereti vorbesc:
            </Typography>
            </Box>
        </Collapse>
        {/* <Collapse
            className={classes.cardBack}
            in={!checked}
            collapsedSize={0}
            orientation="vertical"
        > */}
            <Box
            onClick={() => handleChange(0)}
            sx={{
                width: 600,
                height: 50,
                borderRadius: "16px",
                bgcolor: "secondary.dark"
            }}
            >
            <Typography gutterBottom align="center" variant="h6">
                Ne-ntalnim la colt.
            </Typography>
            </Box>
        {/* </Collapse> */}
        </Box>
        <Box className={classes.parentCard}>
        {/* <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show"
        /> */}
        <Collapse
            className={classes.cardFront}
            in={checked[1]}
            collapsedSize={0}
            orientation="vertical"
        >
            <Box
            onClick={() => handleChange(1)}
            sx={{
                width: 600,
                height: 50,
                borderRadius: "16px",
                bgcolor: "primary.light"
            }}
            >
            <Typography gutterBottom align="center" variant="h6">
            - Care e diferenta dintre o gaina?
            </Typography>
            </Box>
        </Collapse>
        {/* <Collapse
            className={classes.cardBack}
            in={!checked}
            collapsedSize={0}
            orientation="vertical"
        > */}
            <Box
            onClick={() => handleChange(1)}
            sx={{
                width: 600,
                height: 50,
                borderRadius: "16px",
                bgcolor: "secondary.dark"
            }}
            >
            <Typography gutterBottom align="center" variant="h6">
            - Are picioarele paralele, mai ales stangul.
            </Typography>
            </Box>
            
        {/* </Collapse> */}
        </Box>
        <Box className={classes.parentCard}>
        {/* <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show"
        /> */}
        <Collapse
            className={classes.cardFront}
            in={checked[2]}
            collapsedSize={0}
            orientation="vertical"
        >
            <Box
            onClick={() => handleChange(2)}
            sx={{
                width: 600,
                height: 50,
                borderRadius: "16px",
                bgcolor: "primary.light"
            }}
            >
            <Typography gutterBottom align="center" variant="h6">
            Doi crocodili zboara peste atlantic
            </Typography>
            </Box>
        </Collapse>
        {/* <Collapse
            className={classes.cardBack}
            in={!checked}
            collapsedSize={0}
            orientation="vertical"
        > */}
            <Box
            onClick={() => handleChange(2)}
            sx={{
                width: 600,
                height: 50,
                borderRadius: "16px",
                bgcolor: "secondary.dark"
            }}
            >
            <Typography gutterBottom align="center" variant="h6">
            Unu-i verde, altul o ia la stanga
            </Typography>
            </Box>
        {/* </Collapse> */}
        </Box>
        <Box className={classes.parentCard}>
        {/* <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show"
        /> */}
        <Collapse
            className={classes.cardFront}
            in={checked[3]}
            collapsedSize={0}
            orientation="vertical"
        >
            <Box
            onClick={() => handleChange(3)}
            sx={{
                width: 600,
                height: 50,
                borderRadius: "16px",
                bgcolor: "primary.light"
            }}
            >
            <Typography gutterBottom align="center" variant="h6">
                Foaie vede barabula, apa-mi vine pan-la
            </Typography>
            </Box>
        </Collapse>
        {/* <Collapse
            className={classes.cardBack}
            in={!checked}
            collapsedSize={0}
            orientation="vertical"
        > */}
            <Box
            onClick={() => handleChange(3)}
            sx={{
                width: 600,
                height: 50,
                borderRadius: "16px",
                bgcolor: "secondary.dark"
            }}
            >
            <Typography gutterBottom align="center" variant="h6">
                ...brau
            </Typography>
            </Box>
        {/* </Collapse> */}
        </Box>
    </div>
    );
    }