import React from 'react';
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubcategoryCard from './subcategoryCard';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    titles: {
        display: "flex",
        alignItems: "center",
    },
    subCatDiv: {
        flexDirection: "column"
    },
    subCat: {

    },
}));

export default function CategoryAcordion(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                props.data.map((categorie, index) => (
                    categorie['book'] === props.book &&
                    <Accordion key={`book_${props.book}_index_${index}`}>
                        <AccordionSummary
                            key={`additional-actions${index}-header`}
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls={`additional-actions${index}-content`}
                            id={`additional-actions${index}-header`}
                        >
                            <div className={classes.titles}>
                                <Checkbox
                                    checked={props.listaselectiisubcat[index].reduce((acc, value) => acc * value, 1) > 0}
                                    onChange={() => { props.onClickCategorieMare(index) }}
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                />
                                <Typography variant="subtitle2">{categorie.category_Name}</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className={classes.subCatDiv}>
                            {categorie["subCategory"].map((subCategorie, indexSub) => (
                                <div key={`cat${index}_subcat${indexSub}`}>
                                    <SubcategoryCard
                                        onClickSubCategorie={props.onClickSubCategorie}
                                        setListaselectiisubcat={props.setListaselectiisubcat}
                                        listaselectiisubcat={props.listaselectiisubcat}
                                        className={classes.subCat}
                                        key={`cat${index}_subcat${indexSub}_subcategoryCard`}
                                        text={subCategorie["Name"]}
                                        number={subCategorie["Count"]}
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