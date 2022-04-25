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

export default function Termeni() {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.root} maxWidth="lg">
        <Typography gutterBottom align="center" variant="h3">
          Termeni și condiții
        </Typography>
        <Typography variant="h6">1. Informații preliminare</Typography>
        <ul>
          <li>
            Mulțumim pentru interesul față de compania, site-ul și produsele pe
            care le comercializăm prin intermediul magazinului nostru online.
          </li>
          <li>
            Vă rugăm să citiți acest document cu atenție. Acest document
            (denumit în continuare „Prezentul document”, „Contractul” sau
            „Termenii și Condițiile”) reprezintă condițiile utilizării site-ului
            https://rezigo.ro (denumit în continuare „Site-ul”) și condițiile
            plasării de comenzi de servicii prin intermediul site-ului. Prin
            navigarea pe site-ul nostru sau prin plasarea unei comenzi sunteți
            de acord cu Termenii și Condițiile descrise mai jos. Acest document
            reprezintă o convenție legală - un contract între dumneavoastră și
            noi.
          </li>
          <li>
            Vă rugăm să citiți și Politica noastră de confidențialitate și
            Politica privind utilizarea modulelor cookie, înainte de a naviga pe
            site sau a plasa o comandă. Dacă nu sunteți de acord cu acești
            Termeni sau cu Politicile indicate mai sus, vă rugăm să nu utilizați
            site-ul.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">3. Cine suntem?</Typography>
        <ul>
          <li>
            Site-ul https://rezigo.ro aparține REZIGO SMART LEARNING SOLUTIONS
            S.R.L, societate de naționalitate română cu sediul social în
            București Sectorul 6, Strada Valea Roșie, Nr. 7, Bloc Z6, Ap. 4,
            înmatriculată în Registrul Comerțului București sub nr.
            J40/5449/2022, având codul fiscal 45840865, e-mail
            rezigo.contact@gmail.com.
          </li>
          <li>
            Activitate. Site-ul nostru oferă servicii de pregătire pentru
            examenul de rezidențiat
          </li>
        </ul>
        <Typography variant="h6">
          4. Datele dvs. cu caracter personal
        </Typography>
        <ul>
          <li>
            Site-ul prelucrează date cu caracter personal furnizate de dvs. sau
            colectate din alte surse astfel cum am descris pe larg în{" "}
            {
              <Link color="secondary" href="/confidentialitate">
                Politica de confidențialitate
              </Link>
            }
            .
          </li>
          <li>
            Ne-am luat angajamentul să respectăm legislația națională și
            europeană privind protecția datelor cu caracter personal și libera
            circulație a acestor date.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
        <Typography variant="h6">
          2. Prezentul contract. Obligativitate. Contact
        </Typography>
        <ul>
          <li>
            Caracter obligatoriu. Înțelegeți că atât prezentul contract, cât și
            toate politicile la care acesta face referire (e.g., Politică de
            confidențialitate, Politică privind utilizarea modulelor cookie) au
            caracter obligatoriu față de dvs. Prin navigarea pe site-ul nostru
            sau prin plasarea unei comenzi de servicii, vă luați angajamentul de
            a respecta prezentul contract și politicile indicate.
          </li>
          <li>
            Modificări și actualizări. Ne rezervăm dreptul de a modifica oricând
            și fără notificare prealabilă acești Termeni. Comenzii dumneavoastră
            i se vor aplica termenii care sunt în vigoare la momentul plasării
            comenzii. Accesând site-ul nostru veți găsi cea mai recentă versiune
            a Termenilor.
          </li>
          <li>
            Nu putem garanta faptul că orice servicii care au fost incluse la un
            moment dat pe site vor fi disponibile în orice moment. Ne rezervăm
            dreptul de a înceta în orice moment comercializarea unui seerviciu.
          </li>
          <li>
            Contact. Dacă aveți întrebări sau neclarități, ne puteți contacta cu
            încredere la rezigo.contact@gmail.com.{" "}
          </li>
        </ul>
      </Container>
    </div>
  );
}
