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
            Prin vizitarea și/sau utilizarea site-ului, plasarea de comenzi sau 
            prin interacțiunea cu noi prin orice metodă și/sau orice mijloc de 
            comunicare la distanță, sunteți de acord cu prelucrarea datelor dvs. 
            cu caracter personal astfel cum am descris în {" "}
            {
              <Link color="secondary" href="/confidentialitate">
                Politica de confidențialitate
              </Link>
            }
            . 
          </li>
          <li>
            Declarați, totodată, că toate datele personale și informațiile transmise 
            către noi sunt corecte. În măsura în care datele nu vă aparțin, declarați 
            că ați obținut acordul scris și prealabil al persoanei vizate ale cărei date 
            le transmiteți către noi sau declarați că transmiteți datele în baza altui 
            temei legal conform Regulamentului (UE) nr. 679/2016.
          </li>
          <li>
          •	Este posibil să colectăm informații prin module cookie sau alte tehnologii 
          similare, precum adresa IP, detalii privind navigatorul sau dispozitivul utilizat. 
          Dacă doriți să aflați mai multe informații, vă recomandăm să accesați și să parcurgeți 
          Politica noastră privind utilizarea modulelor {" "}
          {
            <Link color="secondary" href="/cookies">
              cookie
            </Link>
          }
          .
          </li>
        </ul>
        <Typography variant="h6">
          5. Eligibilitate
        </Typography>
        <ul>
          <li>
            Pentru a putea plasa în mod legal o comandă pe site-ul nostru trebuie 
            (1) să aveți peste 18 ani și/sau capacitate deplină de exercițiu; 
            (2) să fiți de acord cu prezentul Contract; și (3) să ne furnizați 
            informații de  identitate și de contact reale, complete și actualizate.
          </li>
        </ul>
        <Typography variant="h6">
          6. Reguli privind utilizarea site-ului
        </Typography>
        <ul>
          <li>
            Reguli. Prin accesarea, vizitarea, plasarea unei comenzi sau desfășurarea
            oricărei alte activități pe site-ul nostru, promiteți să respectați următoarele reguli:
            <ol>
              <li>
              Veți folosi acest site exclusiv pentru a vă informa și a vă pregăti pentru examenul de rezidențiat;
              </li>
              <li>
              Nu veți efectua nicio subscripție falsă sau frauduloasă, în caz contrar ne rezervăm dreptul de a 
              anula subscripția și a informa autoritățile competente sau a ne adresa justiției pentru recuperarea 
              oricăror prejudicii cauzate;
              </li>
              <li>
                Veți furniza informații reale, exacte, complete și actualizate;
              </li>
              <li>
                Veți respecta drepturile de proprietate intelectuală cu privire la orice element regăsit pe acest site. 
              </li>
              <li>
                Nu veți desfășura niciun fel de acțiune care ar putea aduce orice fel de prejudiciu site-ului nostru, 
                în caz contrar ne rezervăm dreptul de a ne adresa justiției pentru recuperarea oricăror prejudicii cauzate. 
              </li>
            </ol>
          </li>
          <li>
            Consecințe. Ne rezervăm dreptul de a bloca accesul oricărui utilizator care încalcă regulile de mai sus, de a anula
            comenzile, de a sesiza autoritățile competente pentru tragerea la răspundere administrativă/penală a oricăror fapte 
            antisociale și de a ne adresa justiției pentru recuperarea în integralitate a oricăror prejudiciilor cauzate, prezente
            sau viitoare, inclusive beneficiile nerealizate și cheltuielile de judecată (inclusiv onorariile avocaților).
          </li>
        </ul>
        <Typography variant="h6">
          7. Încheierea contractului
        </Typography>
        <ul>
          <li>
            Data încheierii contractului. Contractul dintre dvs. și noi se încheie 
            în momentul în care comanda dvs. va fi acceptată în mod expres de noi și
            veți primi, în acest sens, un e-mail în care vom confirma livrarea.  
          </li>
          <li>
           Protecție. În măsura în care nu vom accepta comanda, dar dvs. v-au fost 
           retrase sume de bani, vom proceda la rambursarea acestor sume în cel mai scurt timp. 
          </li>
          <li>
            Decizia ne aparține. Ne rezervăm dreptul de a decide, în mod unilateral și fără a
            preciza motivul, încheierea sau nu a unui contract de vânzare. Nu vom avea nicio 
            răspundere față de dvs. în situația în care refuzăm să dăm curs unei comenzi. 
            Dreptul de proprietate asupra produselor se va transfera către dumneavoastră 
            numai după ce ați realizat plata tuturor sumelor datorate pentru serviciile comandate.
          </li>
        </ul>
        <Typography variant="h6">
          8. Disponibilitatea serviciilor
        </Typography>
        <ul>
          <li>
            Nu putem garanta că serviciile care s-au găsit la un moment dat pe 
            site vor fi disponibile în orice moment pentru achiziționare. Nu vom 
            avea nicio răspundere față dvs. în situația în care un produs nu se mai 
            regăsește pe site. Deși vom încerca să avem în timp real pe site actualizare 
            informațiile privind disponibilitatea produselor, nu putem garanta faptul că 
            aceste informații vor fi actualizate, în orice moment.
          </li>
        </ul>
        <Typography variant="h6">
          9. Prețul. Facturarea. Plata
        </Typography>
        <ul>
          <li>
            Prețul produselor este afișat în lei pe site și include taxa pe valoare 
            adăugată. În măsura în care există o eroare cu privire la prețul afișat pe 
            site, vă vom aduce la cunoștință în cel mai scurt timp, urmând să vă returnăm 
            suma de bani achitată suplimentar sau să vă solicităm o sumă de bani suplimentară. 
            În măsura în care noul preț nu este mulțumitor pentru dvs., nu răspundeți la solicitarea 
            noastră sau nu vă putem contacta, vă vom anula comanda și vă vom rambursa cât mai 
            curând posibil suma de bani achitată. 
          </li>
          <li>
          	Prețurile produselor vor putea fi actualizate/modificare în orice moment, iar 
            această actualizare/modificare va înlocui orice preț anterior. Comenzii dvs. i 
            se vor aplica prețurile de la momentul plasării efective a comenzii.
          </li>
          <li>
            Plata produselor comandate se poate face astfel: plata cu cardul online.
          </li>
          <li>
            Procesarea datelor de pe cardul dumneavoastră se face prin intermediul Stripe. Inc,
            iar noi nu vom stoca niciun fel de date referitoare la cardul dumneavoastră.
          </li>
          <li>
            Instituția emitentă va proceda la validarea și autorizarea plății. În situația în 
            care, tranzacția nu se procesează din motive independente nouă (e.g., fonduri 
            inexistente pe card, card expirat), contractul dintre noi nu se încheie și nu vom 
            avea nicio obligație să livrăm produsele, însă dvs. puteți încerca din nou procesarea 
            plății cu un card valid. 
          </li>
        </ul>
        <Typography variant="h6">
          10. Forța majoră și cazul fortuit
        </Typography>
        <ul>
          <li>
            Nu vom fi trași la răspundere pentru niciun fel de întârzieri sau nereușite în îndeplinirea 
            serviciilor noastre, dacă intervine un caz de forță majoră sau un caz fortuit. Forța majoră 
            include, dar nu se limitează la schimbări în legi sau reglementări, embargouri, războaie, 
            acte teroriste, revolte, incendii, cutremure, accidente nucleare, inundații, greve, epidemii, 
            pandemii, condiții meteorologice și acte ale hackerilor sau furnizorilor de servicii de internet. 
          </li>
        </ul>
        <Typography variant="h6">
          11. Proprietatea intelectuală
        </Typography>
        <ul>
          <li>
            Întregul conținut al site-ului este proprietatea intelectuală a REZIGO SMART LEARNING SOLUTIONS S.R.L. 
            Site-ul poate folosit de către terți doar pentru informare.
          </li>
          <li>
            Utilizatorii site-ului nu au dreptul de a descărca, modifica parțial sau integral site-ul, 
            reproduce parțial și/sau integral site-ul, copia, distribui, vinde sau exploata site-ul în 
            orice altă manieră contrară intereselor Societății REZIGO SMART LEARNING SOLUTIONS S.R.L, 
            indiferent dacă există sau nu un scop comercial.
          </li>
          <li>
            Orice conținut (incluzând, dar fără a se limita la baze de date, elemente de grafică, mărci, 
            conținut juridic) sunt proprietatea intelectuală a REZIGO SMART LEARNING SOLUTIONS S.R.L. 
            Întregul site este protejat de Legea nr. 8/1996 privind drepturile de autor și drepturile 
            conexe, iar pentru orice încălcare a proprietății intelectuale, ne rezervăm dreptul de a 
            sesiza instanțele de judecată competente pentru recuperarea integrală a prejudiciului, precum 
            și de a depune o plângere penală la organele judiciare pentru tragerea la răspundere penală a făptuitorului. 
          </li>
        </ul>
        <Typography variant="h6">
          12. Acest acord
        </Typography>
        <ul>
          <li>
            Acești Termeni constituie acordul integral dintre dumneavoastră şi noi în ceea ce privește obiectul 
            oricărui Contract și înlocuiește orice alt acord, orice altă înțelegere anterioară verbală sau scrisă 
            dintre dumneavoastră și noi. 
          </li>
          <li>
            Acest Contract are caracter obligatoriu. Nu puteți transfera, cesiona, greva sau înstrăina în niciun 
            alt mod acest Contract sau oricare dintre drepturile sau obligațiile dumneavoastră care decurg din acesta, 
            fără acordul nostru prealabil și scris. Noi putem transfera, cesiona, greva, subcontracta sau înstrăina în 
            orice alt mod un Contract sau oricare dintre drepturile sau obligațiile noastre care decurg din Contract.  
          </li>
        </ul>
        <Typography variant="h6">
          13. Legislația aplicabilă
        </Typography>
        <ul>
          <li>
            Prezentului Contract, precum și oricărei utilizări a site-ului li se 
            vor aplica legea română. Orice litigiu între noi va fi supus spre 
            soluționare instanțelor române. 
          </li>
        </ul>
        <Typography variant="h6">
          14. Inexistența dreptului de retragere
        </Typography>
        <ul>
          <li>
            Utilizatorul înțelege faptul că nu beneficiază de dreptul de retragere 
            potrivit OUG 34/2014 deoarece potrivit art. 16 lit. a) serviciile 
            prestate prin intermediul site-ului sunt exceptate de la dreptul de 
            retragere. Prin acceptarea acestui document, utilizatorul confirmă 
            că a luat cunoştinţă de faptul că îşi va pierde dreptul la retragere 
            după înscrierea pe platformă, moment în care intervine executarea 
            completă a contractului de către site.
          </li>
        </ul>
        <Typography variant="h6">
          15. Datele societății
        </Typography>
        <ul>
          <li>
            Denumire: REZIGO SMART LEARNING SOLUTIONS S.R.L.
          </li>
          <li>
            Sediul social: Strada Valea Roșie, Nr. 7, Bloc Z6, Ap. 4, Secorul 6, București.
          </li>
          <li>
            Cod fiscal: 45840865
          </li>
          <li>
            
            E-mail: rezigo.contact@gmail.com
          </li>
        </ul>
      </Container>
    </div>
  );
}
