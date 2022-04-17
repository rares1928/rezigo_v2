import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  divTitle: {
    padding: theme.spacing(3),
  },
}));

export default function PremiumCancel() {
  const classes = useStyles();
  const TITLE = "Anulare";

  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Typography
        className={classes.divTitle}
        component="h2"
        variant="h3"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Anulare!
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        component="p"
      >
        Comanda ta a fost anulată!
      </Typography>
    </React.Fragment>
  );
}
