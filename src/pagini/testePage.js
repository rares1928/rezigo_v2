import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import testNouImg from "../poze/test_nou_v2.svg";
import testNouPagini from "../poze/testNouPagini2.svg";
import simulareImg from "../poze/simulare_v1.svg";
import testNeterminatImg from "../poze/test_neterminat_v2.svg";
import reparcurgeGreseliImg from "../poze/reparcurge_greseli_v2.svg";
import exameneOficialeImg from "../poze/examene_oficiale.svg";
import kumar from "../poze/kumar.svg";
import lawrence from "../poze/lawrence.svg";
import sinopsis from "../poze/sinopsis.svg";
import TestsCard from "../componente/testsCard";
import TestsBookCard from "../componente/testsBookCard";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CategoryAcordion from "../componente/categoryAcordion";
import CategoryListSimulare from "../componente/categoryListSimulare";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import DataTable from "../componente/tabel";
import { callApi } from "../utils/callApi";
import { useHistory } from "react-router-dom";
import ErrorPopup from "../componente/errorPopup";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import PremiumPopup from "../componente/premiumPopup";
import Input from "@material-ui/core/Input";
import CookiesAccord from "../componente/cookiesAccord";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - calc(8 * 8px))",
    display: "flex",
    flexDirection: "column",
  },
  containerPart: {
    flex: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  instructionsText: {
    padding: theme.spacing(2, 0, 0),
  },
  bookDiv: {
    marginBottom: theme.spacing(20),
  },
  bookLevel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    minWidth: 340,
    maxWidth: 389,
  },
  bookSubcatDiv: {
    marginTop: theme.spacing(2),
  },
  marginCls: {
    margin: theme.spacing(2),
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    padding: theme.spacing(1),
    paddingBottom: "2.5vh",
    paddingTop: "2.5vh",
    position: "fixed",
    bottom: 0,
    zIndex: 1000,
  },
  footerItem: {
    maxWidth: 300,
  },
  footerButton: {
    padding: theme.spacing(1.5),
  },
  footerAleator: {
    marginTop: theme.spacing(0.5),
  },
  errorTooManyQ: {
    color: "#661706",
    paddingTop: theme.spacing(1),
  },
}));

export default function TestePage() {
  // delay la grow in milisecunde
  const growTimeout = 700;
  let history = useHistory();
  const { state } = useLocation();

  const classes = useStyles();
  const [isCardSelected, setCardSelected] = useState("");
  const [isKumar, setKumar] = useState(false);
  const [isLawrence, setLawerence] = useState(false);
  const [isSinopsis, setSinopsis] = useState(false);
  const [listaselectiisubcat, setListaselectiisubcat] = useState([{}]);
  const [listaselectii, setListaselectii] = useState([]);
  const [listaSelectiiSimulare, setListaSelectiiSimulare] = useState([]);
  const [readyCat, setReadyCat] = useState(false);
  const [readyTest, setReadyTest] = useState(false);
  const [listaCategorii, setListaCategorii] = useState([]);
  const [listatTesteNeterm, setListaTesteNeterm] = useState([]);
  const [error, setError] = useState(0);
  const [goLoading, setGoLoading] = useState(false);
  const [questionRemaining, setQuestionRemaining] = useState(400);
  const [tipCont, setTipCont] = useState("");
  const [aleator, setAleator] = useState(false);
  const [premiumPop, setPremiumPop] = useState(false);
  const [cartePagini, setCartePagini] = useState("");
  const [firstPage, setFirstPage] = useState(0);
  const [secondPage, setSecondPage] = useState(0);
  const [listaCategoriiPerPage, setListaCategoriiPerPage] = useState([]);
  const [loadingPerPage, setLoadingPerPage] = useState(false);
  const [readyPerPage, setReadyPerPage] = useState(false);
  const [listaselectiisubcatPerPage, setListaselectiisubcatPerPage] = useState([
    {},
  ]);
  const [listaselectiiPerPage, setListaselectiiPerPage] = useState([]);
  const [aleatorPerPage, setAleatorPerPage] = useState(false);
  const [testFirstPage, setTestFirstPage] = useState(0);
  const [testSecondPage, setTestSecondPage] = useState(0);
  const [cookiesAccord, setCookiesAccord] = useState(
    localStorage.getItem("cookiesAccord") === "true" ? true : false
  );

  const handleError = (e) => {
    setError(e.status);
    setReadyCat(false);
    setReadyTest(false);
    setReadyPerPage(false);
    setLoadingPerPage(false);
  };

  const handleCategoriiPerPage = (e) => {
    setListaCategoriiPerPage(e.data["lista"]);

    let lista_temp = [];
    let lista_temp2 = [];

    for (let i = 0; i < e.data["lista"].length; ++i) {
      const lista_temp_temp = [];
      for (let j = 0; j < e.data["lista"][i]["subCategory"].length; ++j) {
        lista_temp_temp.push(0);
      }
      lista_temp.push(lista_temp_temp);
      lista_temp2.push(false);
    }
    setListaselectiisubcatPerPage(lista_temp);
    setListaselectiiPerPage(lista_temp2);
    setLoadingPerPage(false);
    setReadyPerPage(true);
  };

  const handleCategorii = (e) => {
    setListaCategorii(e.data["lista"]);
    setTipCont(e.data["tip_cont"]);
    if (e.data["tip_cont"] === "Standard") {
      setQuestionRemaining(e.data["intrebariRamase"]);
    }
    let lista_temp = [];
    let lista_temp2 = [];

    for (let i = 0; i < e.data["lista"].length; ++i) {
      const lista_temp_temp = [];
      for (let j = 0; j < e.data["lista"][i]["subCategory"].length; ++j) {
        lista_temp_temp.push(0);
      }
      lista_temp.push(lista_temp_temp);
      lista_temp2.push(false);
    }
    setListaselectiisubcat(lista_temp);
    setListaselectii(lista_temp2);
    setListaSelectiiSimulare(lista_temp2);
    setReadyCat(true);
  };

  const handleTeste = (e) => {
    setListaTesteNeterm(e.data["lista"]);
    setReadyTest(true);
  };

  const handleTestId = (testId) => {
    return history.push({
      pathname: "/rezolva_test",
      state: { testId: testId, aleator: aleator },
    });
  };

  const handleTestIdNou = (testId) => {
    return history.push({
      pathname: "/rezolva_test",
      state: { testId: testId.data["lista"], aleator: aleator },
    });
  };

  useEffect(() => {
    let url_categorii =
      "https://grileapiwin.azurewebsites.net/api/GetCategoriiWin?code=2PyRLKAmFmY9m2QCC2t3iRuMRwDF58dxkyYavc/eFowHS44pFQgrqA==";
    callApi(url_categorii, {}, handleCategorii, handleError);
    let url_teste =
      "https://grileapiwin.azurewebsites.net/api/ReturnTestWin?code=a4f9SUIh9j7zkFgmFTeGjiDgWCURrkcaj3uaLWUpoGnTQ/aCJKBkjQ==";
    callApi(url_teste, { greseli: false }, handleTeste, handleError);
    if (state !== undefined) {
      if (state.from === "profile") {
        setCardSelected("Teste începute");
      }
      if (state.from === "rezolva_test") {
        setCardSelected("Reparcurge greșeli");
      }
    }
  }, [state]);

  const deleteTest = async (testId) => {
    await callApi(
      "https://grileapiwin.azurewebsites.net/api/DeleteTestWin?code=E756BkprUyE3sBtZAU8ltkrwRebaSickMOE3NXaIv3cn3Ls8zNYQiA==",
      { testId },
      () => {},
      handleError
    );
    await callApi(
      "https://grileapiwin.azurewebsites.net/api/ReturnTestWin?code=a4f9SUIh9j7zkFgmFTeGjiDgWCURrkcaj3uaLWUpoGnTQ/aCJKBkjQ==",
      {},
      handleTeste,
      handleError
    );
  };

  const cautaGrilePerPage = async () => {
    setLoadingPerPage(true);
    setReadyPerPage(false);
    setTestFirstPage(firstPage);
    setTestSecondPage(secondPage);
    const url =
      "https://grileapiwin.azurewebsites.net/api/getcategoriiperpage?code=0XsuIZIk34HpyUs/xDAF6DFHk/xIS9ovT7aVCCn7UMkMb0SMM3nyZg==";
    let carte = "";
    if (cartePagini === "Kumar și Clark Medicină Clinică") {
      carte = "Kumar";
    } else if (
      cartePagini === "Chirurgie generală și specialități chirurgicale"
    ) {
      carte = "Chirurgie";
    } else {
      carte = "Sinopsis";
    }
    const data = {
      carte: carte,
      firstPage: firstPage,
      secondPage: secondPage,
    };
    await callApi(url, data, handleCategoriiPerPage, handleError);
  };

  const creeazaSimulare = async () => {
    setGoLoading(true);
    const lista_categorii = [];
    let vectorNumarGrile = [];
    for (let i = 0; i < listaSelectiiSimulare.length; i++) {
      if (listaSelectiiSimulare[i]) {
        vectorNumarGrile.push({
          nume_categorie: listaCategorii[i]["category_Name"],
          subcategorie: [],
        });
        for (let j = 0; j < listaselectiisubcat[i].length; j++) {
          vectorNumarGrile[vectorNumarGrile.length - 1]["subcategorie"].push({
            nume_subcategorie: listaCategorii[i]["subCategory"][j]["Name"],
            numar: listaCategorii[i]["subCategory"][j]["Count"],
          });
        }
      }
    }
    vectorNumarGrile = vectorNumarGrile.sort(
      (a, b) =>
        a["subcategorie"].reduce((acc, val) => acc + val["numar"], 0) -
        b["subcategorie"].reduce((acc, val) => acc + val["numar"], 0)
    );
    const mediaPerCapitol = Math.floor(
      200 / listaSelectiiSimulare.filter((capitol) => capitol).length
    );
    let d =
      200 -
      mediaPerCapitol *
        listaSelectiiSimulare.filter((capitol) => capitol).length;
    let grileDeAdaugat = 0;
    let grilePerCapitol = 0;

    let dSubcat = 0;
    let grileDeAdaugatSubcat = 0;
    let mediaPerSubCapitol = 0;
    let grilePerSubCapitol = 0;
    let grileRamaseDeAdaugat = 200;

    for (let i = 0; i < vectorNumarGrile.length; i++) {
      grileDeAdaugat = 0;
      grilePerCapitol = vectorNumarGrile[i]["subcategorie"].reduce(
        (acc, val) => acc + val["numar"],
        0
      );
      if (grilePerCapitol < mediaPerCapitol) {
        grileDeAdaugat = grilePerCapitol;
        d = d + mediaPerCapitol - grileDeAdaugat;
      } else if (grilePerCapitol < mediaPerCapitol + d) {
        grileDeAdaugat = grilePerCapitol;
        d = d - (grileDeAdaugat - mediaPerCapitol);
      } else {
        grileDeAdaugat = mediaPerCapitol + d;
        d = 0;
      }
      mediaPerSubCapitol = Math.floor(
        grileDeAdaugat / vectorNumarGrile[i]["subcategorie"].length
      );
      dSubcat =
        grileDeAdaugat -
        mediaPerSubCapitol * vectorNumarGrile[i]["subcategorie"].length;
      for (let j = 0; j < vectorNumarGrile[i]["subcategorie"].length; j++) {
        grileDeAdaugatSubcat = 0;
        grilePerSubCapitol = vectorNumarGrile[i]["subcategorie"].sort(
          (a, b) => a["numar"] - b["numar"]
        )[j]["numar"];

        if (
          i === vectorNumarGrile.length - 1 &&
          j === vectorNumarGrile[i]["subcategorie"].length - 1
        ) {
          grileDeAdaugatSubcat = grileRamaseDeAdaugat;
        } else {
          if (grilePerSubCapitol < mediaPerSubCapitol) {
            grileDeAdaugatSubcat = grilePerSubCapitol;
            dSubcat = dSubcat + mediaPerSubCapitol - grileDeAdaugatSubcat;
          } else if (grilePerSubCapitol < mediaPerSubCapitol + dSubcat) {
            grileDeAdaugatSubcat = grilePerSubCapitol;
            dSubcat = dSubcat - (grileDeAdaugatSubcat - mediaPerSubCapitol);
          } else {
            grileDeAdaugatSubcat = mediaPerSubCapitol + dSubcat;
            dSubcat = 0;
          }
        }
        lista_categorii.push({
          nume_categorie: vectorNumarGrile[i]["nume_categorie"],
          nume_subcategorie: vectorNumarGrile[i]["subcategorie"].sort(
            (a, b) => a["numar"] - b["numar"]
          )[j]["nume_subcategorie"],
          numar: grileDeAdaugatSubcat,
        });
        grileRamaseDeAdaugat = grileRamaseDeAdaugat - grileDeAdaugatSubcat;
      }
    }

    const url =
      "https://grileapiwin.azurewebsites.net/api/CreateTestWin?code=UWWieYZbXJombLLaR12BaLqCxfdBbHEz84QWnVaE/ZCVyCm2Fi9nvg==";
    await callApi(
      url,
      { lista_categorii, aleator: true },
      handleTestIdNou,
      handleError
    );
    setGoLoading(false);
  };

  const creeazaTest = async () => {
    setGoLoading(true);
    const lista_categorii = [];
    for (let i = 0; i < listaselectii.length; i++) {
      for (let j = 0; j < listaselectiisubcat[i].length; j++) {
        if (listaselectiisubcat[i][j] > 0) {
          lista_categorii.push({
            nume_categorie: listaCategorii[i]["category_Name"],
            nume_subcategorie: listaCategorii[i]["subCategory"][j]["Name"],
            numar: listaselectiisubcat[i][j],
          });
        }
      }
    }
    await callApi(
      "https://grileapiwin.azurewebsites.net/api/CreateTestWin?code=UWWieYZbXJombLLaR12BaLqCxfdBbHEz84QWnVaE/ZCVyCm2Fi9nvg==",
      { lista_categorii, aleator: false },
      handleTestIdNou,
      handleError
    );
    setGoLoading(false);
  };

  const creeazaTestPerPage = async () => {
    setGoLoading(true);
    const lista_categorii = [];
    for (let i = 0; i < listaselectiiPerPage.length; i++) {
      for (let j = 0; j < listaselectiisubcatPerPage[i].length; j++) {
        if (listaselectiisubcatPerPage[i][j] > 0) {
          lista_categorii.push({
            nume_categorie: listaCategoriiPerPage[i]["category_Name"],
            nume_subcategorie:
              listaCategoriiPerPage[i]["subCategory"][j]["Name"],
            numar: listaselectiisubcatPerPage[i][j],
          });
        }
      }
    }
    const data = {
      lista_categorii: lista_categorii,
      aleator: aleatorPerPage,
      firstPage: testFirstPage,
      secondPage: testSecondPage,
    };
    const url =
      "https://grileapiwin.azurewebsites.net/api/createtestperpage?code=W6TOWV3TlKt4Z4MDlmvET21aB4IJrDsYaNS8fDLkpq/E7zjaEJWt7g==";
    console.log(data);
    // await callApi(url, data, handleTestIdNou, handleError);
    setGoLoading(false);
  };

  const displaySimulare = () => {
    return (
      <>
        <div className={classes.bookDiv}>
          <Typography variant="h6" className={classes.instructionsText}>
            2. Selectează cărțile și capitolele:
          </Typography>
          <Grid
            className={classes.cardGrid}
            container
            justifyContent="center"
            spacing={4}
          >
            <Grid item className={classes.bookLevel}>
              <TestsBookCard
                isSelected={isKumar}
                setCardSelected={setKumar}
                imagine={kumar}
                title="Kumar și Clark Medicină Clinică"
              />
              {isKumar && (
                <Grow in={isKumar} timeout={growTimeout}>
                  <div className={classes.bookSubcatDiv}>
                    <CategoryListSimulare
                      data={listaCategorii}
                      listSelectii={listaselectii}
                      setListaSelectii={setListaselectii}
                      onClickCategorieSimulare={onClickCategorieSimulare}
                      listaSelectiiSimulare={listaSelectiiSimulare}
                      book="Kumar"
                    />
                  </div>
                </Grow>
              )}
            </Grid>
            <Grid item className={classes.bookLevel}>
              <TestsBookCard
                isSelected={isLawrence}
                setCardSelected={setLawerence}
                imagine={lawrence}
                title="Chirurgie generală și specialități chirurgicale"
              />
              {isLawrence && (
                <Grow in={isLawrence} timeout={growTimeout}>
                  <div className={classes.bookSubcatDiv}>
                    <CategoryListSimulare
                      data={listaCategorii}
                      listSelectii={listaselectii}
                      setListaSelectii={setListaselectii}
                      onClickCategorieSimulare={onClickCategorieSimulare}
                      listaSelectiiSimulare={listaSelectiiSimulare}
                      book="Chirurgie"
                    />
                  </div>
                </Grow>
              )}
            </Grid>
            <Grid item className={classes.bookLevel}>
              <TestsBookCard
                isSelected={isSinopsis}
                setCardSelected={setSinopsis}
                imagine={sinopsis}
                title="Sinopsis de medicină"
              />
              {isSinopsis && (
                <Grow in={isSinopsis} timeout={growTimeout}>
                  <div className={classes.bookSubcatDiv}>
                    <CategoryListSimulare
                      data={listaCategorii}
                      listSelectii={listaselectii}
                      setListaSelectii={setListaselectii}
                      onClickCategorieSimulare={onClickCategorieSimulare}
                      listaSelectiiSimulare={listaSelectiiSimulare}
                      book="Sinopsis"
                    />
                  </div>
                </Grow>
              )}
            </Grid>
          </Grid>
        </div>
      </>
    );
  };

  const displayExameneRezidentiat = () => {
    return (
      <div className={classes.bookDiv}>
        <Typography variant="h6" className={classes.instructionsText}>
          2. Selectează câte probleme dorești din fiecare an:
        </Typography>
        <Grid className={classes.cardGrid} container spacing={4}>
          <Grid item>
            <CategoryAcordion
              onClickCategorieMare={onClickCategorieMare}
              onClickSubCategorie={onClickSubCategorie}
              listaselectii={listaselectii}
              listaselectiisubcat={listaselectiisubcat}
              setListaselectii={setListaselectii}
              setListaselectiisubcat={setListaselectiisubcat}
              data={listaCategorii}
              book="Rezidențiat 2021"
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  const displayGrilePePagini = () => {
    return (
      <>
        <div className={classes.bookDiv}>
          <Typography variant="h6" className={classes.instructionsText}>
            2. Selectează cartea:
          </Typography>
          <Grid
            className={classes.cardGrid}
            container
            justifyContent="center"
            spacing={4}
          >
            <Grid item className={classes.bookLevel}>
              <TestsBookCard
                isSelected={cartePagini === "Kumar și Clark Medicină Clinică"}
                setCardSelected={setCartePagini}
                imagine={kumar}
                title="Kumar și Clark Medicină Clinică"
                grilePePagini={true}
              />
            </Grid>
            <Grid item className={classes.bookLevel}>
              <TestsBookCard
                isSelected={
                  cartePagini ===
                  "Chirurgie generală și specialități chirurgicale"
                }
                setCardSelected={setCartePagini}
                imagine={lawrence}
                title="Chirurgie generală și specialități chirurgicale"
                grilePePagini={true}
              />
            </Grid>
            <Grid item className={classes.bookLevel}>
              <TestsBookCard
                isSelected={cartePagini === "Sinopsis de medicină"}
                setCardSelected={setCartePagini}
                imagine={sinopsis}
                title="Sinopsis de medicină"
                grilePePagini={true}
              />
            </Grid>
          </Grid>
          {cartePagini !== "" && (
            <>
              <Grow in={cartePagini !== ""} timeout={growTimeout}>
                <div>
                  <Typography variant="h6" className={classes.instructionsText}>
                    3. Selectează paginile:
                  </Typography>
                  <div className={classes.bookSubcatDiv}>
                    <Typography
                      variant="subtitle2"
                      className={classes.instructionsText}
                    >
                      De la pagina:
                    </Typography>
                    <Input
                      // disabled={readyPerPage}
                      className={classes.marginCls}
                      label="de la pagina"
                      variant="outlined"
                      color="secondary"
                      value={firstPage}
                      inputProps={{
                        step: 1,
                        min: 0,
                        type: "number",
                      }}
                      onChange={(event) => {
                        setFirstPage(
                          event.target.value === ""
                            ? null
                            : Number(event.target.value)
                        );
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      className={classes.instructionsText}
                    >
                      Până la pagina:
                    </Typography>
                    <Input
                      // disabled={readyPerPage}
                      className={classes.marginCls}
                      label="până la pagina"
                      variant="outlined"
                      color="secondary"
                      value={secondPage}
                      inputProps={{
                        step: 1,
                        min: firstPage,
                        type: "number",
                      }}
                      onChange={(event) => {
                        setSecondPage(
                          event.target.value === ""
                            ? 0
                            : Number(event.target.value)
                        );
                      }}
                    />
                    <Button
                      className={classes.marginCls}
                      color="secondary"
                      variant="contained"
                      disabled={
                        firstPage > secondPage || loadingPerPage === true
                      }
                      onClick={cautaGrilePerPage}
                    >
                      {loadingPerPage ? (
                        <CircularProgress />
                      ) : (
                        <div>Caută grile</div>
                      )}
                    </Button>
                    {/* <Button
                      className={classes.marginCls}
                      color="primary"
                      variant="contained"
                      disabled={!readyPerPage}
                      onClick={() => {
                        setReadyPerPage(false);
                      }}
                    >
                      Altă căutare
                    </Button> */}
                  </div>
                  {firstPage > secondPage && (
                    <Typography
                      variant="subtitle2"
                      className={classes.instructionsText}
                    >
                      Primul număr trebuie să fie mai mic decât al doilea!
                    </Typography>
                  )}
                </div>
              </Grow>
              {readyPerPage &&
                (listaCategoriiPerPage.length === 0 ? (
                  <Typography variant="h6" className={classes.instructionsText}>
                    Nu am găsit grile în intervalul de pagini specificat de
                    tine.
                  </Typography>
                ) : (
                  <Grow in={readyPerPage} timeout={growTimeout}>
                    <div className={classes.bookSubcatDiv}>
                      <CategoryAcordion
                        onClickCategorieMare={onClickCategorieMarePerPage}
                        onClickSubCategorie={onClickSubCategoriePerPage}
                        listaselectii={listaselectiiPerPage}
                        listaselectiisubcat={listaselectiisubcatPerPage}
                        setListaselectii={setListaselectiiPerPage}
                        setListaselectiisubcat={setListaselectiisubcatPerPage}
                        data={listaCategoriiPerPage}
                        book={
                          cartePagini === "Kumar și Clark Medicină Clinică"
                            ? "Kumar"
                            : cartePagini ===
                              "Chirurgie generală și specialități chirurgicale"
                            ? "Chirurgie"
                            : "Sinopsis"
                        }
                      />
                    </div>
                  </Grow>
                ))}
            </>
          )}
        </div>
      </>
    );
  };

  const displayTestNou = () => {
    return (
      <>
        <div className={classes.bookDiv}>
          <Typography variant="h6" className={classes.instructionsText}>
            2. Selectează cărțile, capitolele și subcapitolele:
          </Typography>
          <Grid
            className={classes.cardGrid}
            container
            justifyContent="center"
            spacing={4}
          >
            <Grid item className={classes.bookLevel}>
              <TestsBookCard
                isSelected={isKumar}
                setCardSelected={setKumar}
                imagine={kumar}
                title="Kumar și Clark Medicină Clinică"
              />
              {isKumar && (
                <Grow in={isKumar} timeout={growTimeout}>
                  <div className={classes.bookSubcatDiv}>
                    <CategoryAcordion
                      onClickCategorieMare={onClickCategorieMare}
                      onClickSubCategorie={onClickSubCategorie}
                      listaselectii={listaselectii}
                      listaselectiisubcat={listaselectiisubcat}
                      setListaselectii={setListaselectii}
                      setListaselectiisubcat={setListaselectiisubcat}
                      data={listaCategorii}
                      book="Kumar"
                    />
                  </div>
                </Grow>
              )}
            </Grid>
            <Grid item className={classes.bookLevel}>
              <TestsBookCard
                isSelected={isLawrence}
                setCardSelected={setLawerence}
                imagine={lawrence}
                title="Chirurgie generală și specialități chirurgicale"
              />
              {isLawrence && (
                <Grow in={isLawrence} timeout={growTimeout}>
                  <div className={classes.bookSubcatDiv}>
                    <CategoryAcordion
                      onClickCategorieMare={onClickCategorieMare}
                      onClickSubCategorie={onClickSubCategorie}
                      listaselectii={listaselectii}
                      listaselectiisubcat={listaselectiisubcat}
                      setListaselectii={setListaselectii}
                      setListaselectiisubcat={setListaselectiisubcat}
                      data={listaCategorii}
                      book="Chirurgie"
                    />
                  </div>
                </Grow>
              )}
            </Grid>
            <Grid item className={classes.bookLevel}>
              <TestsBookCard
                isSelected={isSinopsis}
                setCardSelected={setSinopsis}
                imagine={sinopsis}
                title="Sinopsis de medicină"
              />
              {isSinopsis && (
                <Grow in={isSinopsis} timeout={growTimeout}>
                  <div className={classes.bookSubcatDiv}>
                    <CategoryAcordion
                      onClickCategorieMare={onClickCategorieMare}
                      onClickSubCategorie={onClickSubCategorie}
                      listaselectii={listaselectii}
                      listaselectiisubcat={listaselectiisubcat}
                      setListaselectii={setListaselectii}
                      setListaselectiisubcat={setListaselectiisubcat}
                      data={listaCategorii}
                      book="Sinopsis"
                    />
                  </div>
                </Grow>
              )}
            </Grid>
          </Grid>
        </div>
      </>
    );
  };

  const displayTestNeterminat = () => {
    return (
      <div>
        <Typography variant="h6" className={classes.instructionsText}>
          2. Selectează testul pe care dorești să îl continui:
        </Typography>
        <div>
          {
            <DataTable
              rows={listatTesteNeterm
                .sort((a, b) => a.Done - b.Done)
                .filter((test) => test["ReparcurgeGreseli"] === false)}
              onDelete={(id) => deleteTest(id)}
              onClick={(id) => handleTestId(id)}
            />
          }
        </div>
      </div>
    );
  };

  const displayReparcurgeGreseli = () => {
    return (
      <div>
        <Typography variant="h6" className={classes.instructionsText}>
          2. Selectează testul din care dorești să reparcurgi greșelile:
        </Typography>
        <div>
          {
            <DataTable
              rows={listatTesteNeterm.filter(
                (test) => test["ReparcurgeGreseli"] === true
              )}
              onDelete={(id) => deleteTest(id)}
              onClick={(id) => handleTestId(id)}
            />
          }
        </div>
      </div>
    );
  };

  const onClickCategorieSimulare = (i) => {
    const lista_temp_selectii = [...listaSelectiiSimulare];
    lista_temp_selectii[i] = !listaSelectiiSimulare[i];
    setListaSelectiiSimulare(lista_temp_selectii);
  };

  const onClickCategorieMarePerPage = (i) => {
    const lista_temp_selectii = [...listaselectiiPerPage];
    const lista_temporara_mare = [...listaselectiisubcatPerPage];
    const lista_temporara = [...listaselectiisubcatPerPage[i]];
    if (
      listaselectiisubcatPerPage[i].reduce((acc, value) => acc + value, 0) ===
      listaCategoriiPerPage[i].subCategory.reduce(
        (acc, subcat) => acc + subcat.Count,
        0
      )
    ) {
      for (
        let index = 0;
        index < listaselectiisubcatPerPage[i].length;
        index++
      ) {
        lista_temporara[index] = 0;
      }
      lista_temporara_mare[i] = lista_temporara;
      setListaselectiisubcatPerPage(lista_temporara_mare);
    } else {
      for (
        let index = 0;
        index < listaselectiisubcatPerPage[i].length;
        index++
      ) {
        lista_temporara[index] =
          listaCategoriiPerPage[i].subCategory[index].Count;
      }
      lista_temporara_mare[i] = lista_temporara;
      setListaselectiisubcatPerPage(lista_temporara_mare);
    }
    lista_temp_selectii[i] = !listaselectii[i];
    setListaselectiiPerPage(lista_temp_selectii);
  };

  const onClickCategorieMare = (i) => {
    const lista_temp_selectii = [...listaselectii];
    const lista_temporara_mare = [...listaselectiisubcat];
    const lista_temporara = [...listaselectiisubcat[i]];
    if (
      listaselectiisubcat[i].reduce((acc, value) => acc + value, 0) ===
      listaCategorii[i].subCategory.reduce(
        (acc, subcat) => acc + subcat.Count,
        0
      )
    ) {
      for (let index = 0; index < listaselectiisubcat[i].length; index++) {
        lista_temporara[index] = 0;
      }
      lista_temporara_mare[i] = lista_temporara;
      setListaselectiisubcat(lista_temporara_mare);
    } else {
      for (let index = 0; index < listaselectiisubcat[i].length; index++) {
        lista_temporara[index] = listaCategorii[i].subCategory[index].Count;
      }
      lista_temporara_mare[i] = lista_temporara;
      setListaselectiisubcat(lista_temporara_mare);
    }
    lista_temp_selectii[i] = !listaselectii[i];
    setListaselectii(lista_temp_selectii);
  };

  const onClickSubCategorie = (i, index, click = true, numGrile) => {
    //i = indexul categoriei
    // index = indexul subcategoriei in categoria i
    const lista_temporara_mare = [...listaselectiisubcat];
    const lista_temporara = [...listaselectiisubcat[i]];
    if (click) {
      if (lista_temporara[index] > 0) {
        lista_temporara[index] = 0;
      } else {
        lista_temporara[index] = listaCategorii[i].subCategory[index].Count;
      }
    } else {
      lista_temporara[index] = numGrile;
    }
    lista_temporara_mare[i] = lista_temporara;
    setListaselectiisubcat(lista_temporara_mare);
  };

  const onClickSubCategoriePerPage = (i, index, click = true, numGrile) => {
    //i = indexul categoriei
    // index = indexul subcategoriei in categoria i
    const lista_temporara_mare = [...listaselectiisubcatPerPage];
    const lista_temporara = [...listaselectiisubcatPerPage[i]];
    if (click) {
      if (lista_temporara[index] > 0) {
        lista_temporara[index] = 0;
      } else {
        lista_temporara[index] =
          listaCategoriiPerPage[i].subCategory[index].Count;
      }
    } else {
      lista_temporara[index] = numGrile;
    }
    lista_temporara_mare[i] = lista_temporara;
    setListaselectiisubcatPerPage(lista_temporara_mare);
  };

  const sumaElemArr = (array) => {
    return array.reduce(
      (acc, subArray) =>
        acc + subArray.reduce((subAcc, value) => subAcc + value, 0),
      0
    );
  };

  const sumaCategoriiArray = (array) => {
    return array.reduce((acc, value) => acc + value, 0);
  };

  const produsScalarListe = (array) => {
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        suma =
          suma +
          listaCategorii[i]["subCategory"].reduce(
            (acc, subCat) => subCat["Count"] + acc,
            0
          );
      }
    }
    return suma;
  };
  const TITLE = "Creează-ți test";

  // console.log(
  //   sumaElemArr(listaselectiisubcat) !== 0 ||
  //     sumaCategoriiArray(listaSelectiiSimulare) !== 0 ||
  //     (readyPerPage ? sumaElemArr(listaselectiisubcatPerPage) !== 0 : false)
  // );

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <CookiesAccord
        cookiesAccord={cookiesAccord}
        setCookiesAccord={setCookiesAccord}
      />
      <ErrorPopup errorStatus={error} setError={setError} />
      <PremiumPopup premiumPop={premiumPop} setPremiumPop={setPremiumPop} />
      <Container maxWidth="lg" className={classes.containerPart}>
        {readyCat && readyTest ? (
          <>
            <Typography variant="h6" className={classes.instructionsText}>
              Tipul contului tău: {tipCont}{" "}
              {tipCont === "Standard" && (
                <div> (Întrebări rămase: {questionRemaining}) </div>
              )}
            </Typography>
            {/* <Button
              onClick={() => {
                setPremiumPop(true);
              }}
            >
              Buton popup
            </Button> */}
            <Typography variant="h6" className={classes.instructionsText}>
              1. Selectează tipul testului pe care vrei să îl începi:
            </Typography>
            <Grid
              className={classes.cardGrid}
              justifyContent="center"
              container
              spacing={4}
              id="testCard_div"
            >
              <Grid item>
                <TestsCard
                  isSelected={isCardSelected === "Test nou"}
                  setCardSelected={setCardSelected}
                  imagine={testNouImg}
                  title="Test nou"
                  text="Selectează subcapitolele din care dorești grilele."
                  ready={readyCat}
                />
              </Grid>
              <Grid item>
                <TestsCard
                  isSelected={isCardSelected === "Grile pe pagini"}
                  setCardSelected={setCardSelected}
                  imagine={testNouPagini}
                  title="Grile pe pagini"
                  text="Selectează cartea și paginile din care dorești grilele."
                  ready={readyCat}
                  tipCont={tipCont}
                  setPremiumPop={setPremiumPop}
                />
              </Grid>
              <Grid item>
                <TestsCard
                  isSelected={isCardSelected === "Simulare"}
                  setCardSelected={setCardSelected}
                  imagine={simulareImg}
                  title="Simulare"
                  text="Rezolvă un test de 200 de grile din capitolele selectate de tine."
                  ready={readyCat}
                  tipCont={tipCont}
                  setPremiumPop={setPremiumPop}
                />
              </Grid>
              <Grid item>
                <TestsCard
                  isSelected={isCardSelected === "Teste începute"}
                  setCardSelected={setCardSelected}
                  imagine={testNeterminatImg}
                  title="Teste începute"
                  text="Selectează unul dintre testele neterminate pe care vrei să le continui."
                  ready={readyTest}
                  tipCont={tipCont}
                  setPremiumPop={setPremiumPop}
                />
              </Grid>
              <Grid item>
                <TestsCard
                  isSelected={isCardSelected === "Reparcurge greșeli"}
                  setCardSelected={setCardSelected}
                  imagine={reparcurgeGreseliImg}
                  title="Reparcurge greșeli"
                  text="Selectează unul dintre testele cu greșelile tale de-a lungul timpului"
                  tipCont={tipCont}
                  setPremiumPop={setPremiumPop}
                />
              </Grid>
              <Grid item>
                <TestsCard
                  isSelected={isCardSelected === "Examene rezidențiat"}
                  setCardSelected={setCardSelected}
                  imagine={exameneOficialeImg}
                  title="Examene rezidențiat"
                  text="Selectează unul dintre examenele de rezidențiat din anii trecuți"
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <CircularProgress />
        )}
        <div id="as vrea sa scrolez aici"></div>
        {isCardSelected === "Test nou" && (
          <Grow
            id="bookCard_div"
            in={isCardSelected === "Test nou"}
            timeout={growTimeout}
          >
            <div>{displayTestNou()}</div>
          </Grow>
        )}
        {isCardSelected === "Grile pe pagini" && (
          <Grow
            id="bookCard_div"
            in={isCardSelected === "Grile pe pagini"}
            timeout={growTimeout}
          >
            <div>{displayGrilePePagini()}</div>
          </Grow>
        )}
        {isCardSelected === "Simulare" && (
          <Grow
            id="bookCard_div"
            in={isCardSelected === "Simulare"}
            timeout={growTimeout}
          >
            <Typography>
              <div>{displaySimulare()}</div>
            </Typography>
          </Grow>
        )}
        {isCardSelected === "Teste începute" && (
          <Grow
            id="bookCard_div"
            in={isCardSelected === "Teste începute"}
            timeout={growTimeout}
          >
            <div>{displayTestNeterminat()}</div>
          </Grow>
        )}
        {isCardSelected === "Reparcurge greșeli" && (
          <Grow
            id="bookCard_div"
            in={isCardSelected === "Reparcurge greșeli"}
            timeout={growTimeout}
          >
            <div> {displayReparcurgeGreseli()} </div>
          </Grow>
        )}
        {isCardSelected === "Examene rezidențiat" && (
          <Grow
            id="bookCard_div"
            in={isCardSelected === "Examene rezidențiat"}
            timeout={growTimeout}
          >
            <div> {displayExameneRezidentiat()} </div>
          </Grow>
        )}
      </Container>

      {readyTest && readyCat && (
        <>
          {(sumaElemArr(listaselectiisubcat) !== 0 ||
            sumaCategoriiArray(listaSelectiiSimulare) !== 0 ||
            (readyPerPage
              ? sumaElemArr(listaselectiisubcatPerPage) !== 0
              : false)) && (
            <Slide
              in={
                (readyPerPage
                  ? sumaElemArr(listaselectiisubcatPerPage) !== 0
                  : false) ||
                (isCardSelected === "Test nou" ||
                isCardSelected === "Examene rezidențiat"
                  ? sumaElemArr(listaselectiisubcat) > 0
                  : sumaCategoriiArray(listaSelectiiSimulare) > 0)
              } // cand este selectata mai mult de o grila, apare footerul cu readySetGo
              direction="up"
              className={classes.footer}
            >
              <footer>
                <Container maxWidth="lg">
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    spacing={4}
                  >
                    <Grid className={classes.footerItem} item>
                      <Typography variant="subtitle2" component="p">
                        Tip test: {isCardSelected}
                      </Typography>
                      <Typography variant="subtitle2" component="p">
                        Număr de grile:{" "}
                        {isCardSelected === "Simulare"
                          ? produsScalarListe(listaSelectiiSimulare) <= 200
                            ? produsScalarListe(listaSelectiiSimulare)
                            : 200
                          : isCardSelected === "Grile pe pagini"
                          ? sumaElemArr(listaselectiisubcatPerPage)
                          : sumaElemArr(listaselectiisubcat)}
                      </Typography>
                      {isCardSelected === "Test nou" ||
                      isCardSelected === "Grile pe pagini" ||
                      isCardSelected === "Examene rezidențiat" ? (
                        <Button
                          className={classes.footerAleator}
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            isCardSelected === "Grile pe pagini"
                              ? setAleatorPerPage(!aleatorPerPage)
                              : setAleator(!aleator);
                          }}
                        >
                          {isCardSelected === "Grile pe pagini" ? (
                            <Typography variant="subtitle2">
                              {aleatorPerPage ? (
                                <>Grile randomizate</>
                              ) : (
                                <>Grile ordonate</>
                              )}
                            </Typography>
                          ) : (
                            <>
                              {aleator ? (
                                <Typography variant="subtitle2">
                                  Grile randomizate
                                </Typography>
                              ) : (
                                <Typography variant="subtitle2">
                                  Grile ordonate
                                </Typography>
                              )}
                            </>
                          )}
                        </Button>
                      ) : (
                        <Typography variant="subtitle2">
                          Ordinea grilelor: aleatoare
                        </Typography>
                      )}
                    </Grid>
                    <Grid className={classes.footerItem} item>
                      <Button
                        className={classes.footerButton}
                        color="secondary"
                        variant="contained"
                        disabled={
                          goLoading ||
                          (isCardSelected === "Simulare"
                            ? produsScalarListe(listaSelectiiSimulare) <= 200
                            : sumaElemArr(listaselectiisubcat) >
                              questionRemaining)
                        }
                        onClick={
                          isCardSelected === "Test nou" ||
                          isCardSelected === "Examene rezidențiat"
                            ? () => creeazaTest()
                            : isCardSelected === "Grile pe pagini"
                            ? () => creeazaTestPerPage()
                            : () => creeazaSimulare()
                        }
                      >
                        {goLoading ? (
                          <CircularProgress color="primary" size={25} />
                        ) : (
                          <Typography>Ready Set GO!</Typography>
                        )}
                      </Button>
                      {(isCardSelected === "Test nou" ||
                        isCardSelected === "Examene rezidențiat") &&
                        sumaElemArr(listaselectiisubcat) >
                          questionRemaining && (
                          <>
                            <Typography
                              variant="subtitle2"
                              className={classes.errorTooManyQ}
                            >
                              Poți selecta maxim {questionRemaining} întrebări.
                            </Typography>
                          </>
                        )}
                      {isCardSelected === "Simulare" &&
                        produsScalarListe(listaSelectiiSimulare) <= 200 && (
                          <>
                            <Typography
                              variant="subtitle2"
                              className={classes.errorTooManyQ}
                            >
                              Trebuie să selectezi cel puțin 200 întrebări.
                            </Typography>
                          </>
                        )}
                    </Grid>
                  </Grid>
                </Container>
              </footer>
            </Slide>
          )}
        </>
      )}
    </div>
  );
}
