import React from "react";

// Material-ui
import Grid from "@material-ui/core/grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  paperRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
  fontWeight: {
    fontWeight: 600,
  },
}));

const ContactCards = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" spacing={1}>
      {props.cards.map((card, index) => {
        return (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <Paper className={classes.paperRoot} elevation={4}>
              <Grid item xs={12}>
                <Typography className={classes.fontWeight} align="center" variant="h6">
                  {card.title}
                </Typography>
                <Typography align="center">{card.name}</Typography>
                <Typography className={classes.fontWeight} align="center">
                  {card.phone}
                </Typography>
                <Typography className={classes.fontWeight} align="center">
                  {card.email}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ContactCards;
