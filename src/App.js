import './App.css';
import React,{ useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import HomePage from './pagini/homePage';
import LibrariePage from './pagini/librariePage';
import TestePage from './pagini/testePage';
import NoMatch from './pagini/noMatch';
import GrilePage from './pagini/grilePage';
import LoginPage from './pagini/loginPage';
import SignupPage from './pagini/signupPage';
import LayoutSite from './componente/layoutSite';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProfilePage from './pagini/profilePage';
import ProtectedRoute from './utils/protectedRoute';
import ProtectedRouteAdmins from './utils/protectedRouteAdmins';
import DespreNoi from './pagini/despreNoi';
import Termeni from './pagini/termeni';
import Intrebari from './pagini/intrebari';
import Users from './pagini/users';
import ActivareSignUpPage from './pagini/activareSignUp';
import ResetareParola from './pagini/resetareParola';
import AdminsHomePage from './pagini/adminsHomePage';
import AdminsConturi from './pagini/adminsConturi';
import AdminsContDetails from './pagini/adminsContDetails';


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
      type: darkMode? "dark":"light",
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
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <LayoutSite darkMode= {darkMode} setDarkMode={setDarkMode} >
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/resetare_parola" exact component={ResetareParola}/> 
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/signup/activare" exact component={ActivareSignUpPage} />
            <ProtectedRoute>
              <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/profil" exact component={() => <ProfilePage darkMode={darkMode} /> } />
              <Route path="/librarie" exact component={LibrariePage} />
              <Route path="/creeaza-ti_test" exact component={()=> <TestePage darkMode={darkMode} ></TestePage>} />
              <Route path="/rezolva_test" exact component={()=> <GrilePage darkMode={darkMode} ></GrilePage>} />
              <Route path="/despre_noi" exact component={DespreNoi}/>
              <Route path="/termeni" exact component={Termeni}/>
              <Route path="/intrebari_frecvente" exact component={Intrebari}/>
              <Route path="/users" exact component={Users}/>
              <ProtectedRouteAdmins>
                <Switch>
                  <Route path="/admins" exact component ={AdminsHomePage} />
                  <Route path="/admins/conturi" exact component ={AdminsConturi} />
                  <Route path="/admins/conturi/*" component ={AdminsContDetails} />
                </Switch>
              </ProtectedRouteAdmins>
              <Route component={NoMatch}/>
              </Switch>
            </ProtectedRoute>
          </Switch>
        </LayoutSite>
      </Router>
    </ThemeProvider>
  );
}

export default App;
