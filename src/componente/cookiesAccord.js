import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  buttonDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function CookiesAccord(props) {
  const classes = useStyles();
  return (
    <Dialog
      //   open={
      //     location.pathname === "/termeni" ||
      //     location.pathname === "/confidentialitate" ||
      //     location.pathname === "/cookies"
      //       ? false
      //       : !props.cookiesAccrod
      //   }
      open={!props.cookiesAccord}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Acest site folosește cookie-uri
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Cookie-urile sunt esențiale pentru funcționalitatea acestei pagini
          web. Ele ne ne ajută să afișăm fiecărui utilizator un conținut
          personalizat. Dacă dorești să aflii mai multe detalii, poți citi{" "}
          {
            <Link href="/termeni" color="secondary">
              {" "}
              termeni și condiții{" "}
            </Link>
          }
          ,{" "}
          {
            <Link href="/confidentialitate" color="secondary">
              politica de confidențialitate
            </Link>
          }{" "}
          sau{" "}
          {
            <Link href="/cookies" color="secondary">
              politica de cookies
            </Link>
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className={classes.buttonDiv}>
          <div />
          <div>
            <Button
              onClick={() => {
                props.setCookiesAccord(true);
                localStorage.setItem("cookiesAccord", true);
              }}
              variant="contained"
              color="secondary"
            >
              Am înțeles
            </Button>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
}
