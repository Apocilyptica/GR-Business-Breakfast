import React from "react";

// Material-ui
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Assest
import Logo from "../../assets/GRBB-Logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexWrap: "wrap",
    overflow: "hidden",
  },
  banner: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: "100%",
  },
  bannerText: {
    fontStyle: "italic",
    textTransform: "uppercase",
    letterSpacing: 4,
  },
  logo: {
    width: "100%",
    padding: theme.spacing(2, 3, 0, 3),
    backgroundColor: theme.palette.common.white,
  },
  membership: {
    backgroundColor: theme.palette.common.white,
  },
  membershipText: {
    fontWeight: 800,
    letterSpacing: 4,
    padding: theme.spacing(1, 0, 2, 0),
  },
  footer: {
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    minHeight: 28,
  },
}));

const MembershipCard = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={10}>
      <Grid container item xs={12} direction="column" justify="center" alignItems="center">
        <Grid item className={classes.banner} xs={12}>
          <Typography className={classes.bannerText} align="center" variant="subtitle1">
            Official
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img className={classes.logo} src={Logo} alt="GR Business Breakfast" />
        </Grid>
        <Grid item className={classes.membership} xs={12}>
          <Typography className={classes.membershipText} color="primary" variant="h3">
            Membership
          </Typography>
        </Grid>
        <Grid className={classes.footer} item xs={12}>
          <Typography />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MembershipCard;
