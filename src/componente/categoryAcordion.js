import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SubcategoryCard from './subcategoryCard';

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
        props.data.map((categorie, index)=>(
        categorie['book'] === props.book &&
        <Accordion key={index}>
            <AccordionSummary
            key={index}
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls={`additional-actions${index}-content`}
            id={`additional-actions${index}-header`}
            >
                <div className={classes.titles}>
                    <Checkbox 
                    //listaselectiisubcat[i].reduce((acc,value) => acc + value, 0) === listaCategorii[2].subCategory.reduce((acc, subcat) => acc + subcat.count, 0) 
                    checked={props.listaselectiisubcat[index].reduce((acc,value) => acc && value, true)}
                    onChange={()=>{props.onClickCategorieMare(index)}}
                    onClick={(event) => event.stopPropagation()} 
                    onFocus={(event) => event.stopPropagation()} 
                    />
                    <Typography variant="subtitle1">{categorie.category_Name}</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails className={classes.subCatDiv}>
                {categorie["subCategory"].map((subCategorie, indexSub)=>(
                    <div key={`cat${index}_subcat${indexSub}`}>
                      <SubcategoryCard 
                      onClickSubCategorie={props.onClickSubCategorie}
                      setListaselectiisubcat={props.setListaselectiisubcat}
                      listaselectiisubcat={props.listaselectiisubcat}
                      className={classes.subCat} 
                      key={`cat${index}_subcat${indexSub}`} 
                      text={subCategorie["name"]} 
                      number={subCategorie["count"]} 
                      index={index}
                      indexSub={indexSub}
                      />
                    </div>
                ))}
            </AccordionDetails>
        </Accordion>
        ))
      }
    </div>
  );
}