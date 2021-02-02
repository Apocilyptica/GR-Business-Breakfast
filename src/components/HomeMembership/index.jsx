import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// Material-ui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt, faLaptopCode, faAddressCard } from "@fortawesome/free-solid-svg-icons";

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
    width: 300,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  icon: {
    color: theme.palette.primary.main,
  },
  iconSubheading: {
    fontWeight: 600,
    textTransform: "uppercase",
    padding: theme.spacing(2, 0, 1, 0),
  },
  button: {
    color: (props) => props.secondary.color,
    backgroundColor: (props) => props.secondary.backgroundColor,
    transition: "1s ease",
    margin: theme.spacing(5),
    padding: theme.spacing(2),
    "&:hover": {
      color: (props) => props.secondary.hoverColor,
      backgroundColor: (props) => props.secondary.hoverBackgroundColor,
    },
  },
  buttonTitle: {
    fontWeight: 600,
  },
}));

const HomeMembership = (props) => {
  const classes = useStyles(props.styles);

  return (
    <Paper className={classes.root} elevation={0}>
      <Grid container item xs={12} direction="column" justify="center" alignItems="center" spacing={5}>
        <Grid container item xs={12} justify="center" alignItems="center" spacing={5}>
          <Grid item xs={12} sm={9} md={6} lg={4} xl={3}>
            <MembershipCard />
          </Grid>
          <Grid item container direction="column" xs={12} sm={9} md={6} lg={4} xl={3}>
            <Grid item>
              <Typography className={classes.membershipTitle} variant="h5" align={isWidthDown("sm", props.width) ? "center" : "left"}>
                The GRBB
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.title} variant="h3" color="primary" align={isWidthDown("sm", props.width) ? "center" : "left"}>
                Annual Membership
              </Typography>
            </Grid>
            <Grid item className={classes.membershipStatement}>
              <Typography variant="subtitle1" align={isWidthDown("sm", props.width) ? "center" : "left"}>
                Become a member of the Grand Rapids Business Breakfast and receive not only FREE admission to monthly events, but also many other
                great benefits! Click to the button below and join Grand Rapid’s premiere business breakfast group.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item justify="center" alignItems="center" spacing={5}>
          <Grid container item direction="column" justify="center" alignItems="center" xs={12} sm={3} md={2}>
            <Grid item>
              <FontAwesomeIcon className={classes.icon} icon={faMoneyBillAlt} size="3x" />
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
          <Grid container item direction="column" justify="flex-start" alignItems="center" xs={12} sm={3} md={2}>
            <Grid item>
              <FontAwesomeIcon className={classes.icon} icon={faLaptopCode} size="3x" />
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
          <Grid container item direction="column" justify="center" alignItems="center" xs={12} sm={3} md={2}>
            <Grid item>
              <FontAwesomeIcon className={classes.icon} icon={faAddressCard} size="3x" />
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
        <Grid item>
          <Button className={classes.button}>
            <NavLink to="/membership">
              <Typography className={classes.buttonTitle} variant="h5">
                Become A Member
              </Typography>
            </NavLink>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

HomeMembership.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(HomeMembership);
