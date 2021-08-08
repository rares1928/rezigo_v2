import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  titles: {
    display: "flex",
    alignItems: "center",
},
}));

export default function CategoryListSimulare(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(true);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  console.log("Props: ", props);
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {
          props.data.map((categorie, index) =>( 
          categorie["book"] === props.book &&
            <ListItem
              button
              // selected={selectedIndex === index}
              // onClick={(event) => handleListItemClick(event, index)}
            >
              <div className={classes.titles}>
                <Checkbox
                  onChange={()=> {props.onClickCategorieSimulare(index)}}
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}>
                  </Checkbox>
              </div>
               <ListItemText primary={categorie["category_Name"]} />
            </ListItem>
          )
        )}
        {/* <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem> */}
      </List>
      {/* <Divider /> */}
      {/* <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItem>
      </List> */}
    </div>
  );
}
