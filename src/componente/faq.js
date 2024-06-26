import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

export default function FAQ() {
  const useStyles = makeStyles((theme) => ({
    acordeon: {
      backgroundColor: "rgba(238,238,238,0.35)",
    },
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        className={classes.acordeon}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h6">Pot folosi Rezigo gratis?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Da! Oricine își poate face cont și poate parcurge până la 30 de
            grile pe zi, din orice parte a materiei.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.acordeon}
        expanded={expanded === "panel11"}
        onChange={handleChange("panel11")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h6">
            Pot rezolva grile din toată materia?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Da! Am acoperit fiecare capitol și subcapitol cu întrebări menite să
            te ajute la învățat.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.acordeon}
        expanded={expanded === "panel12"}
        onChange={handleChange("panel12")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h6">Cum funcționează? </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            În esență, site-ul este foarte ușor de folosit! Cel mai rapid mod de
            a începe să lucrezi este următorul: îți faci cont, apeși pe butonul
            Test, alegi Test nou iar apoi selectezi cărțile, capitolele și
            subcapitolele din care dorești să primești grile. Totul este
            intuitiv și clar.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.acordeon}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography variant="h6">
            Ce beneficii are contul premium?{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Contul premium îți oferă acces la toate serviciile site-ului. Poți
            rezolva un număr nelimitat de grile pe zi, poți face simulări din ce
            capitole dorești, poți căuta grilele după paginile din carte de unde
            au fost făcute și nu în ultimul rând, poți reparcurge greșelile din
            testele făcute de tine
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.acordeon}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography variant="h6">
            Ce fac dacă am găsit o întrebare greșită?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            În cazul în care găsești o grilă incorectă, te rugăm să o raportezi
            și noi ne vom ocupa de corectarea ei. O dată ce grila a fost
            revizuită, îți vom oferi feedback în legătură cu modul în care a
            fost corectată.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.acordeon}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography variant="h6">
            Primești eroare sau întâlnești probleme pe site?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Orice dificultăți întâlnești în folosirea site-ului, ne poți
            contacta oricând la adresa noastră de mail rezigo.contact@gmail.com.
            Noi îți vom oferi asistență și vom încerca să rezolvăm problema cât
            de repede putem.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className={classes.acordeon}
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography variant="h6">
            Ai vreo sugestie, recomandare, propunere?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Suntem un proiect în creștere și adaptare și dorim să îmbunătățim
            permanent serviciile pe care le oferim. Din acest motiv, ne propunem
            să învățăm tot ce putem de la utilizatorii noștri. Orice idei,
            sugestii, critici (de la propuneri de grile, la propuneri de noi
            funcții pe care să le ofere site-ul, la preferințe de organizare)
            sunt bine venite și le așteptăm la adresa noastră de mail
            rezigo.contact@gmail.com.
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion
        className={classes.acordeon}
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography variant="h6">Îmi pot schimba parola?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Da! Atât parola cât și alte date personale pot fi schimbate din
            pagina de profil.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
