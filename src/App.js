import './App.css';
import React from 'react';
import { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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

const themeDark = createMuiTheme({
  typography: {
    button: {
      textTransform:'none',
    },
  },
  palette: {
    type: "dark",
    text: {
      primary:"#fff"
    },
    primary: {
      main: "#1A2B3D",
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(250,156,79)',
      contrastText: '#fff',
    },
  },
});

const themeAndreea = createMuiTheme({
  typography: {
    button: {
      textTransform:'none',
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#FFF5FD",
    },
    secondary: {
      main: '#005A8D',
    },
  },
});


function App() {

  const [andreeaMode, setAndreeaMode] = useState(false);

  return (
    <ThemeProvider theme={andreeaMode? themeAndreea : themeDark}>
      <CssBaseline/>
      <Router>
        <LayoutSite andreea= {andreeaMode} setAndreea={setAndreeaMode} >
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/profil" exact component={ProfilePage} />
            <Route path="/librarie" exact component={LibrariePage} />
            <Route path="/creeaza-ti_test/" exact component={TestePage} />
            <Route path="/creeaza-ti_test/testid*" exact component={GrilePage} />
            <Route component={NoMatch}/>
          </Switch>
        </LayoutSite>
      </Router>
    </ThemeProvider>
  );
}

export default App;
