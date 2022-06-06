import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import HomePage from "./pagini/homePage";
// import LibrariePage from './pagini/librariePage';
import TestePage from "./pagini/testePage";
import NoMatch from "./pagini/noMatch";
import GrilePage from "./pagini/grilePage";
import LoginPage from "./pagini/loginPage";
import SignupPage from "./pagini/signupPage";
import LayoutSite from "./componente/layoutSite";
import CssBaseline from "@material-ui/core/CssBaseline";
import ProfilePage from "./pagini/profilePage";
import ProtectedRoute from "./utils/protectedRoute";
import ProtectedRouteAdmins from "./utils/protectedRouteAdmins";
import DespreNoi from "./pagini/despreNoi";
import Termeni from "./pagini/termeni";
import Confidentialitate from "./pagini/confidentialitate";
import PoliticaCookies from "./pagini/politicaCookies";
import ActivareSignUpPage from "./pagini/activareSignUp";
import ResetareParola from "./pagini/resetareParola";
import AdminsHomePage from "./pagini/adminsHomePage";
import AdminsConturi from "./pagini/adminsConturi";
import AdminsContDetails from "./pagini/adminsContDetails";
import AdminsDisplayGrile from "./pagini/adminsDisplayGrile";
import AdminsEditGrila from "./pagini/adminsEditGrila";
import IntrebariFrecventePage from "./pagini/intrebariFrecvente";
import PrezentarePage from "./pagini/prezentare";
import PremiumPage from "./pagini/premium";
import PremiumSuccess from "./pagini/premiumSuccess";
import PremiumCancel from "./pagini/premiumCancel";
import AdminsSimulari from "./pagini/adminsSimulari";
import AdminsSimulareEdit from "./pagini/adminsSimulareEdit";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "false" ? false : true
  );

  const theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
    },
    palette: {
      divider: darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.12)",
      background: {
        default: darkMode ? "#303030" : "#fafafa",
        paper: darkMode ? "#424242" : "#eeeeee",
      },
      type: darkMode ? "dark" : "light",
      text: {
        primary: darkMode ? "#fff" : "#000",
      },
      primary: {
        main: darkMode ? "#145DA0" : "#2E8BC0",
        contrastText: darkMode ? "#fff" : "#000",
      },
      secondary: {
        main: "#FA9C4F",
        contrastText: darkMode ? "#fff" : "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <LayoutSite darkMode={darkMode} setDarkMode={setDarkMode}>
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/prezentare" exact component={PrezentarePage} />
            <Route path="/resetare_parola" exact component={ResetareParola} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/signup/*" exact component={ActivareSignUpPage} />
            <Route path="/termeni" exact component={Termeni} />
            <Route path="/cookies" exact component={PoliticaCookies} />
            <Route
              path="/confidentialitate"
              exact
              component={Confidentialitate}
            />
            <ProtectedRoute>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route
                  path="/profil"
                  exact
                  component={() => <ProfilePage darkMode={darkMode} />}
                />
                {/* <Route path="/librarie" exact component={LibrariePage} /> */}
                <Route
                  path="/creeaza-ti_test"
                  exact
                  component={() => <TestePage darkMode={darkMode}></TestePage>}
                />
                <Route
                  path="/rezolva_test"
                  exact
                  component={() => <GrilePage darkMode={darkMode}></GrilePage>}
                />
                <Route path="/premium" exact component={PremiumPage} />
                <Route
                  path="/premium/success*"
                  exact
                  component={PremiumSuccess}
                />
                <Route
                  path="/premium/canceled*"
                  exact
                  component={PremiumCancel}
                />
                <Route path="/despre_noi" exact component={DespreNoi} />
                <Route
                  path="/intrebari_frecvente"
                  exact
                  component={IntrebariFrecventePage}
                />
                <ProtectedRouteAdmins>
                  <Switch>
                    <Route path="/admins" exact component={AdminsHomePage} />
                    <Route
                      path="/admins/conturi"
                      exact
                      component={AdminsConturi}
                    />
                    <Route
                      path="/admins/conturi/*"
                      component={AdminsContDetails}
                    />
                    <Route
                      path="/admins/grile"
                      exact
                      component={AdminsDisplayGrile}
                    />
                    <Route
                      path="/admins/grile/id*"
                      component={AdminsEditGrila}
                    />
                    <Route
                      exact
                      path="/admins/simulari"
                      component={AdminsSimulari}
                    />
                    <Route
                      path="/admins/simulari/*"
                      component={AdminsSimulareEdit}
                    />
                  </Switch>
                </ProtectedRouteAdmins>
                <Route component={NoMatch} />
              </Switch>
            </ProtectedRoute>
          </Switch>
        </LayoutSite>
      </Router>
    </ThemeProvider>
  );
}

export default App;
