import './App.css';
import React,{ useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from '@mui/material/styles';
import HomePage from './pagini/homePage';
// import LibrariePage from './pagini/librariePage';
import TestePage from './pagini/testePage';
import NoMatch from './pagini/noMatch';
import GrilePage from './pagini/grilePage';
import LoginPage from './pagini/loginPage';
import SignupPage from './pagini/signupPage';
import LayoutSite from './componente/layoutSite';
import CssBaseline from '@mui/material/CssBaseline';
import ProfilePage from './pagini/profilePage';
import ProtectedRoute from './utils/protectedRoute';
import ProtectedRouteAdmins from './utils/protectedRouteAdmins';
import DespreNoi from './pagini/despreNoi';
import Termeni from './pagini/termeni';
import ActivareSignUpPage from './pagini/activareSignUp';
import ResetareParola from './pagini/resetareParola';
import AdminsHomePage from './pagini/adminsHomePage';
import AdminsConturi from './pagini/adminsConturi';
import AdminsContDetails from './pagini/adminsContDetails';
import AdminsDisplayGrile from './pagini/adminsDisplayGrile';
import AdminsEditGrila from './pagini/adminsEditGrila';
import IntrebariFrecventePage from './pagini/intrebariFrecvente';
import PrezentarePage from './pagini/prezentare';


function App() {

  const [darkMode, setDarkMode] = useState( localStorage.getItem("darkMode") === "false"? false: true);

  const theme = createTheme({
    typography: {
      button: {
        textTransform:'none',
      },
    },
    palette: {
      divider: darkMode? "rgba(255, 255, 255, 0.5)" :"rgba(0, 0, 0, 0.12)",
      background:{
        default: darkMode? "#303030":"#fafafa",
        paper: darkMode? "#424242": "#eeeeee",
      },
      mode: darkMode? "dark":"light",
      text: {
        primary: darkMode? "#fff": "#000"
      },
      primary: {
        main: darkMode? "#145DA0":"#2E8BC0",
        contrastText: darkMode? '#fff': "#000",
      },
      secondary: {
        main: '#FA9C4F',
        contrastText: darkMode? '#fff':"#000",
      },
    },
  });
  

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <LayoutSite darkMode= {darkMode} setDarkMode={setDarkMode} >
            <Switch>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/prezentare" exact component={PrezentarePage} />
              <Route path="/resetare_parola" exact component={ResetareParola}/> 
              <Route path="/signup" exact component={SignupPage} />
              <Route path="/signup/*" exact component={ActivareSignUpPage} />
              <ProtectedRoute>
                <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/profil" exact component={() => <ProfilePage darkMode={darkMode} /> } />
                {/* <Route path="/librarie" exact component={LibrariePage} /> */}
                <Route path="/creeaza-ti_test" exact component={()=> <TestePage darkMode={darkMode} ></TestePage>} />
                <Route path="/rezolva_test" exact component={()=> <GrilePage darkMode={darkMode} ></GrilePage>} />
                <Route path="/despre_noi" exact component={DespreNoi}/>
                <Route path="/termeni" exact component={Termeni}/>
                <Route path="/intrebari_frecvente" exact component={IntrebariFrecventePage}/>
                <ProtectedRouteAdmins>
                  <Switch>
                    <Route path="/admins" exact component ={AdminsHomePage} />
                    <Route path="/admins/conturi" exact component ={AdminsConturi} />
                    <Route path="/admins/conturi/*" component ={AdminsContDetails} />
                    <Route path="/admins/grile" exact component ={AdminsDisplayGrile} />
                    <Route path="/admins/grile/id*" component ={AdminsEditGrila} />
                  </Switch>
                </ProtectedRouteAdmins>
                <Route component={NoMatch}/>
                </Switch>
              </ProtectedRoute>
            </Switch>
          </LayoutSite>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
