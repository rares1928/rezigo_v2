import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  makeStyles,
  Button,
  ButtonGroup,
  IconButton,
  Link,
  Box,
  Grid,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import logo from "../poze/logo4.svg";
import clsx from "clsx";
import { useLocation } from "react-router";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import Cookies from "universal-cookie";

const useStyles = makeStyles((theme) => ({
  main: {
    // minHeight: "100vh",
  },
  rootNavBar: {
    height: theme.spacing(8),
  },
  logoGroup: {
    flexGrow: 1,
  },
  logo: {
    height: "60px",
    cursor: "pointer",
  },
  menuButton: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    display: "flex",
  },
  menuButtonTel: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: theme.spacing(4, 2, 0),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

export default function LayoutSite(props) {
  const cookies = new Cookies();
  let name = cookies.get("firstname");
  let location = useLocation();

  const classes = useStyles();
  const [mobileView, setMobileView] = useState(false);
  const [deschis, setDeschis] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDeschis(open);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.menuButtonTel}>
        <ButtonGroup
          aria-label="outlined secondary button group"
          orientation="vertical"
        >
          <Button
            disableElevation
            variant="outlined"
            onClick={() => {
              props.setDarkMode(!props.darkMode);
              localStorage.setItem("darkMode", !props.darkMode);
            }}
          >
            {props.darkMode && <Brightness7Icon />}
            {!props.darkMode && (
              <>
                <Brightness2Icon />
              </>
            )}
          </Button>
          <Button
            disableElevation
            startIcon={<MenuBookRoundedIcon />}
            variant={
              location.pathname === "/creeaza-ti_test"
                ? "contained"
                : "outlined"
            }
            href="/creeaza-ti_test"
          >
            <Typography variant="h6">Test</Typography>
          </Button>
          <Button
            disableElevation
            disabled
            startIcon={<LibraryBooksRoundedIcon />}
            variant={
              location.pathname === "/librarie" ? "contained" : "outlined"
            }
            href="/librarie"
          >
            <Typography variant="h6">Librărie</Typography>
          </Button>
          <Button
            startIcon={<AccountBoxRoundedIcon />}
            disableElevation
            variant={location.pathname === "/profil" ? "contained" : "outlined"}
            href="/profil"
          >
            <Typography variant="h6" align="center">
              {name}
            </Typography>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 650
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar>
        <div className={classes.logoGroup}>
          <Link href="/">
            <img src={logo} alt="logo" className={classes.logo} />
          </Link>
        </div>
        <div className={classes.menuButton}>
          <ButtonGroup aria-label="outlined secondary button group">
            <Button
              disableElevation
              variant="outlined"
              onClick={() => {
                props.setDarkMode(!props.darkMode);
                localStorage.setItem("darkMode", !props.darkMode);
              }}
            >
              {props.darkMode && <WbSunnyIcon />}
              {!props.darkMode && (
                <>
                  <Brightness2Icon />
                </>
              )}
            </Button>
            <Button
              disableElevation
              startIcon={<MenuBookRoundedIcon />}
              variant={
                location.pathname === "/creeaza-ti_test"
                  ? "contained"
                  : "outlined"
              }
              href="/creeaza-ti_test"
            >
              <Typography variant="h6">Test</Typography>
            </Button>
            <Button
              disableElevation
              disabled
              startIcon={<LibraryBooksRoundedIcon />}
              variant={
                location.pathname === "/librarie" ? "contained" : "outlined"
              }
              href="/librarie"
            >
              <Typography variant="h6">Librărie</Typography>
            </Button>
            <Button
              startIcon={<AccountBoxRoundedIcon />}
              disableElevation
              variant={
                location.pathname === "/profil" ? "contained" : "outlined"
              }
              href="/profil"
            >
              <Typography variant="h6" align="center">
                {name}
              </Typography>
            </Button>
          </ButtonGroup>
        </div>
      </Toolbar>
    );
  };
  const displayMobileView = () => {
    return (
      <Toolbar>
        <Link href="/">
          <img src={logo} alt="logo" className={classes.logo} />
        </Link>
        <div className={classes.menuButton}>
          <IconButton onClick={toggleDrawer("right", true)}>
            <MenuRoundedIcon />
          </IconButton>
          <Drawer
            anchor={"right"}
            open={deschis}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </div>
      </Toolbar>
    );
  };
  return (
    <Box className={classes.main} component="main">
      {!(
        location.pathname.includes("/login") ||
        location.pathname.includes("/signup") ||
        location.pathname.includes("/resetare_parola") ||
        location.pathname.includes("/prezentare")
      ) && (
        <AppBar
          className={classes.rootNavBar}
          position="relative"
          elevation={0}
        >
          {mobileView ? displayMobileView() : displayDesktop()}
        </AppBar>
      )}
      <Grid>{props.children}</Grid>
    </Box>
  );
}
