import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SubcategoryCard from './subcategoryCard';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
  },
  titles:{
    display:"flex",
    alignItems:"center",  
  },
  subCatDiv:{
    flexDirection:"column"
  },
  subCat:{
    
  },
}));

export default function CategoryAcordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        props.data.filter((cat)=> cat['book'] === props.book ).map((categorie, index)=>(
        <Accordion>
            <AccordionSummary
            key={index}
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls={`additional-actions${index}-content`}
            id={`additional-actions${index}-header`}
            >
                <div className={classes.titles}>
                    <Checkbox 
                    onClick={(event) => event.stopPropagation()} 
                    onFocus={(event) => event.stopPropagation()} 
                    />
                    <Typography variant="subtitle1">{categorie.category_Name}</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.subCatDiv}>
                {categorie["subCategory"].map((subCategorie, indexSub)=>(
                    <>
                        <SubcategoryCard className={classes.subCat} key={indexSub} text={subCategorie["name"]} number={subCategorie["count"]} />
                        
                    </>
                ))}
            </AccordionDetails>
        </Accordion>
        ))
      }
    </div>
  );
}