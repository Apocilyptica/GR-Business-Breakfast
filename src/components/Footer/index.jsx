import React from "react";

// Material-ui
import Grid from "@material-ui/core/grid";
import Typography from "@material-ui/core/Typography";

// Compenents
import SponsorCarousel from "../SponsorCarousel";
import FooterContainer from "../FooterContainer";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Data
import { socialLinksData } from "../../utils/socialLinks";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  sponsorBanner: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(1),
    width: "100%",
    color: "white",
  },
  sponsorBannerText: {
    fontWeight: 600,
  },
  watermarkBanner: {
    backgroundColor: theme.palette.grey[900],
    width: "100%",
    color: "white",
  },
  watermarkBannerText: {
    padding: theme.spacing(0, 5),
    fontWeight: 400,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container justify="center" alignItems="center" direction="column">
      <Grid item className={classes.sponsorBanner} xs={12}>
        <Typography className={classes.sponsorBannerText} variant="h5" align="center">
          Thank You Sponsors
        </Typography>
      </Grid>
      <Grid item container xs={12} justify="center" alignItems="center">
        <SponsorCarousel />
      </Grid>
      <Grid item container xs={12} justify="center" alignItems="center" direction="column">
        <FooterContainer links={socialLinksData} />
      </Grid>
      <Grid container item className={classes.watermarkBanner} xs={12} justify="center">
        <Grid item xs={12} md={6} lg={3}>
          <Typography className={classes.watermarkBannerText} variant="body2" align="center">
            Site Crafted By James Jager
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Typography className={classes.watermarkBannerText} variant="body2" align="center">
            Photos Curated From Forward Exposure
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
