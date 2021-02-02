import React from "react";

// Material-ui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faUsers, faCoffee } from "@fortawesome/free-solid-svg-icons";

// Components
import MembershipCard from "../MembershipCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5, 0, 5, 5),
  },
  title: {
    fontWeight: 600,
    textTransform: "uppercase",
  },
  membershipTitle: {
    fontStyle: "italic",
  },
  membershipStatement: {
    margin: theme.spacing(3, 0, 0, 0),
    maxWidth: 300,
  },
  icon: {
    color: theme.palette.primary.main,
  },
  iconSubheading: {
    fontWeight: 600,
    textTransform: "uppercase",
    padding: theme.spacing(2, 0, 1, 0),
  },
}));

const HomeMembership = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <Grid container item xs={12} direction="column" justify="center" alignItems="center" spacing={5}>
        <Grid container item xs={12} justify="center" alignItems="center" spacing={5}>
          <Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
            <MembershipCard />
          </Grid>
          <Grid item container direction="column" xs={12} sm={9} md={6} lg={4} xl={3}>
            <Grid item>
              <Typography className={classes.membershipTitle} variant="h5">
                The GRBB
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.title} variant="h3" color="primary">
                Annual Membership
              </Typography>
            </Grid>
            <Grid item className={classes.membershipStatement}>
              <Typography variant="subtitle1">
                Become a member of the Grand Rapids Business Breakfast and receive not only FREE admission to monthly events, but also many other
                great benefits! Click to the button below and join Grand Rapid’s premiere business breakfast group.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item justify="center" alignItems="center" spacing={5}>
          <Grid container item direction="column" justify="center" alignItems="center" xs={4} sm={3} md={2}>
            <Grid item>
              <FontAwesomeIcon className={classes.icon} icon={faAward} size="5x" />
            </Grid>
            <Grid item>
              <Typography className={classes.iconSubheading} align="center" variant="h6" color="primary">
                Free Admission
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="subtitle1">
                Free admission to all regular meetings as an official member
              </Typography>
            </Grid>
          </Grid>
          <Grid container item direction="column" justify="flex-start" alignItems="center" xs={4} sm={3} md={2}>
            <Grid item>
              <FontAwesomeIcon className={classes.icon} icon={faUsers} size="5x" />
            </Grid>
            <Grid item>
              <Typography className={classes.iconSubheading} align="center" variant="h6" color="primary">
                Website Promotion
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="subtitle1">
                Short BIO, Picture, Company Website, & links to Social Media sites
              </Typography>
            </Grid>
          </Grid>
          <Grid container item direction="column" justify="center" alignItems="center" xs={4} sm={3} md={2}>
            <Grid item>
              <FontAwesomeIcon className={classes.icon} icon={faCoffee} size="5x" />
            </Grid>
            <Grid item>
              <Typography className={classes.iconSubheading} align="center" variant="h6" color="primary">
                Meeting Promotion
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="subtitle1">
                Display of business cards or brochures on the membership table at all monthly events
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HomeMembership;
