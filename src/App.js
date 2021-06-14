import './App.css';
import React from 'react';
import { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './pagini/homePage';
import LibrariePage from './pagini/librariePage';
import TestePage from './pagini/testePage';
import NoMatch from './pagini/noMatch';
import GrilePage from './pagini/grilePage';
import LoginPage from './pagini/loginPage';
import SignupPage from './pagini/signupPage';
import LayoutSite from './componente/layoutSite';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {

  const [andreeaMode, setAndreeaMode] = useState(false);

  return (
    <>
      <CssBaseline/>
      <Router>
        <LayoutSite andreea= {false} >

          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/librarie" exact component={LibrariePage} />
            <Route path="/creeaza-ti_test/" exact component={TestePage} />
            <Route path="/creeaza-ti_test/testid*" exact component={GrilePage} />
            <Route component={NoMatch}/>
          </Switch>
        </LayoutSite>
      </Router>
    </>
  );
}

export default App;
