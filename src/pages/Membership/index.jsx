import React from "react";

// Material-ui
import Grid from "@material-ui/core/grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Material-ui icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// Components
import MembershipCard from "../../components/MembershipCard";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt, faLaptopCode, faAddressCard, faUserPlus, faIdCard } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    padding: theme.spacing(2),
  },
  gridRoot: {
    padding: theme.spacing(2),
  },
  title: {
    fontWeight: 600,
  },
  subTitle: {
    fontStyle: "italic",
    textTransform: "uppercase",
  },
  details: {
    display: "flex",
    alignItems: "center",
    fontWeight: 800,
    fontSize: 15,
    margin: theme.spacing(1, 0),
    lineHeight: 1,
  },
  iconPadding: {
    margin: theme.spacing(0, 2, 0, 0),
  },
  costDetail: {
    fontWeight: 600,
    color: theme.palette.common.black,
  },
  button: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1, 0),
    lineHeight: 1,
  },
}));

const Membership = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} square>
      <Grid container item xs={12} justify="center" alignItems="center">
        <Grid className={classes.gridRoot} item container xs={12} md={5} justify="center" alignItems="center">
          <MembershipCard />
        </Grid>
        <Grid className={classes.gridRoot} item container xs={12} md={5}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h4" color="primary">
              Annual Membership
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.subTitle} variant="h6">
              Membership Includes:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid item container justify="flex-start" alignItems="center">
              <Typography className={classes.details} variant="subtitle1" color="primary">
                <FontAwesomeIcon className={classes.iconPadding} icon={faMoneyBillAlt} size="2x" />
                FREE admission to all regular meetings
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item container justify="flex-start" alignItems="center">
              <Typography className={classes.details} variant="subtitle1" color="primary">
                <FontAwesomeIcon className={classes.iconPadding} icon={faUserPlus} size="2x" />
                Allowance for substitutes in lieu of absence
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item container justify="flex-start" alignItems="center">
              <Typography className={classes.details} variant="subtitle1" color="primary">
                <FontAwesomeIcon className={classes.iconPadding} icon={faIdCard} size="2x" />A custom membership name tag including title and/or
                company information
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item container justify="flex-start" alignItems="center">
              <Typography className={classes.details} variant="subtitle1" color="primary">
                <FontAwesomeIcon className={classes.iconPadding} icon={faLaptopCode} size="2x" />
                Member info page to include: Short BIO & Picture, Company Website, Link to Linked In Account Page OR Blog Site
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item container justify="flex-start" alignItems="center">
              <Typography className={classes.details} variant="subtitle1" color="primary">
                <FontAwesomeIcon className={classes.iconPadding} icon={faAddressCard} size="2x" />
                Display of business cards or brochures on the membership table
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.costDetail} variant="h3">
              $150.00
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.subTitle} variant="h6">
              Yearly
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary">
              <Grid item container justify="flex-start" alignItems="center">
                <Typography className={classes.button} variant="h5">
                  <ShoppingCartIcon className={classes.iconPadding} />
                  Purchase Annual Membership
                </Typography>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Membership;
