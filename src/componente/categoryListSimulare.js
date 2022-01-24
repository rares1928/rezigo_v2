import React from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
  },
  titles: {
    display: "flex",
    alignItems: "center",
},
}));

export default function CategoryListSimulare(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {
          props.data.map((categorie, index) =>( 
          categorie["book"] === props.book &&
            <> 
              <ListItem
                key={`additional-actions-simulare${index}-header`}
                button
                onClick = {()=> {props.onClickCategorieSimulare(index)}}
              >
                <div className={classes.titles}>
                  <Checkbox
                    checked = {props.listaSelectiiSimulare[index]}
                    onChange={()=> {props.onClickCategorieSimulare(index)}}
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}>
                    </Checkbox>
                </div>
                <ListItemText primary={categorie["category_Name"]} />
              </ListItem>
              {index + 1 !== props.data.length &&
                <Divider/>}
            </>
          )
        )}
      </List>
    </div>
  );
}
