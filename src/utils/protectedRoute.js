import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

function ProtectedRoute(props) {
  const cookie = new Cookies();

  const redirectRoute = () => {
    const pathName = window.location.pathname;
    const listaLink = pathName.split("/");
    console.log(listaLink);
    localStorage.setItem("redirectPage", listaLink[1]);
    if (listaLink.length > 2 && listaLink[1] === "creeaza-ti_test") {
      const tipTest = listaLink[2];
      //   let tipTestToSelect = "";
      //   switch (tipTest) {
      //     case "test_nou":
      //       tipTestToSelect = "Test nou";
      //       break;
      //     case "grile_pe_pagini":
      //       tipTestToSelect = "Grile pe pagini";
      //       break;
      //     case "simulare":
      //       tipTestToSelect = "Simulare";
      //       break;
      //     case "teste_inceputes":
      //       tipTestToSelect = "Teste începute";
      //       break;
      //     case "reparcurge_greseli":
      //       tipTestToSelect = "Reparcurge greșeli";
      //       break;
      //     case "examene_rezidentiat":
      //       tipTestToSelect = "Examene rezidențiat";
      //       break;
      //     case "test_standard":
      //       tipTestToSelect = "Test Standard";
      //       break;
      //     default:
      //       break;
      //   }
      localStorage.setItem("tipTest", tipTest);
      if (tipTest === "test_standard" && listaLink.length > 3) {
        localStorage.setItem("capitoleStandard", listaLink[3]);
      }
    }
  };
  return (
    <Route
      render={() => {
        if (
          cookie.get("estiLogat") === "rapid" &&
          cookie.get("accessToken").length > 20
        ) {
          return props.children;
        } else {
          redirectRoute();
          return <Redirect to="/prezentare" />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
