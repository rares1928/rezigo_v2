import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
  },
}));

export default function PoliticaCookies() {
  const classes = useStyles()
  return (
    <div>
      <Container className={classes.root} maxwidt="lg">
        <Typography gutterBottom align="center" variant="h3">
          Politica Cookies
        </Typography>
        <Typography variant="h6">Modalități de colectare automată a datelor</Typography>
        <ul>
          În unele cazuri, site-ul rezigo.ro utilizează module cookie (Google Analitycs) și alte tehnologii similare (adresa IP) pentru a colecta anumite tipuri de informații atunci când ne vizitați online.
          <p></p>
          <li>
            Adrese IP
            <p></p>
            Adresa IP este o etichetă numerică pe care o primește computerul dvs. atunci când este accesat internetul. Astfel computerele 
            pot recunoaște serverele și comunica unele cu altele. Adresele IP ale vizitatorilor vor fi înregistrate pentru a analiza 
            performanța site-ului web, a securității IT și diagnosticării sistemului.
          </li>
          <p></p>
          <li>
            Cookies
            <p></p>
            Un cookie este un fișier de mici dimensiuni care va fi stocat pe computerul, terminalul mobil sau orice alt dispozitiv de pe care
            se accesează site-ul. Un cookie face legătura între un web-server și un web-browser (utilizatorul). Dacă acel web-browser comunică
            înapoi cu web-serverul, acesta poate citi informația stocată și seta preferințele salvate în acel cookie.<br></br>
            Cookie-urile îmbunătățesc astfel experiența dvs. salvând, de exemplu, preferințele utilizatorului în materie de confidențialitate
            online, opțiunile privind limba site-ului sau preferințele referitoare la publicitate etc.<br></br>
            Cookie-urile nu asociază informațiile cu contul dvs., ele rețin opțiunile selectate pe dispozitivul care s-a conectat la website.<br></br>
            Site-ul rezigo.ro folosește cookie-uri Google Analitycs pentru a colecta informații despre modul în care utilizatorul folosește
            acest site și pentru a detecta posibilele probleme de navigare. Google Analytics stochează informații despre paginile vizitate, 
            durata de navigare pe site, modalitatea prin care a fost accesat site-ul, dar și secțiunile accesate în cadrul paginilor. 
            Nu sunt stocate informații personale, așadar, aceste informații nu pot fi folosite pentru a identifica utilizatorul.
          </li>

        </ul>
      </Container>
    </div>
  );
}
