import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function TestsCard(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 285,
            display: "flex",
            flexDirection: "column",
            borderRadius: 15,

        },
        media: {
            backgroundColor: props.isSelected ? theme.palette.secondary.main : theme.palette.background.paper,
            height: "20vh",
            maxHeight: "200px",
            minHeight: 150,
        },
        lowerPart: {
            height: 105,
        },
        textSide: {

        },
        title: {

        },
    }));

    const classes = useStyles();
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    return (
        <Card className={classes.root}>
            <CardActionArea onClick={async () => {
                props.setCardSelected(props.title);
                if (props.ready) {
                    sleep(100).then(() => { document.getElementById("as vrea sa scrolez aici").scrollIntoView(true); });
                }
            }}>
                <CardMedia
                    className={classes.media}
                    image={props.imagine}
                />
            </CardActionArea>
            <CardContent className={classes.lowerPart}>
                <Typography gutterBottom variant="h6" component="h3" className={classes.title}>
                    {props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.textSide}>
                    {props.text}
                </Typography>
            </CardContent>
        </Card>
    );
}