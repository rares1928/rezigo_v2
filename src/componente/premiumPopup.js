import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

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

export default function PremiumPopup(props) {
  const classes = useStyles();

  let history = useHistory();
  const handleClose = () => {
    props.setPremiumPop(false);
  };

  return (
    <Dialog
      open={props.premiumPop}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Cont Premium</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Aceasă resursă poate fi accesată doar cu un cont premium.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className={classes.buttonDiv}>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Mă mai gândesc
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              history.push("/premium");
            }}
            variant="contained"
          >
            Vreau cont premium
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
