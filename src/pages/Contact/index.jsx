import React from "react";

// Material-ui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Components
import ContactForm from "../../components/ContactForm";
import ContactCards from "../../components/ContactCards";

// Assest
import photo from "../../assets/GRBBApril-educate_compressed.jpg";

// Data
import { socialLinksData } from "../../utils/socialLinks";
import { contactCardData } from "../../utils/contactCards";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flex: 1,
    height: 350,
    width: "100%",
  },
  gridContainer: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    padding: theme.spacing(10),
    color: theme.palette.common.white,
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  darkBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: "rgba(0,0,0,0.6)",
  },
  pageTitle: {
    fontWeight: 600,
    "&::before": {
      display: "block",
      content: "''",
      width: "50%",
      height: "3px",
      backgroundColor: theme.palette.common.white,
    },
  },
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root} square>
        <img className={classes.image} src={photo} alt="Contact Us" />
        <div className={classes.darkBackground} />
        <Grid className={classes.gridContainer} item xs={12}>
          <div>
            <Typography variant="h3" className={classes.pageTitle}>
              Contact Us
            </Typography>
          </div>
        </Grid>
      </Paper>
      <Grid item container xs={12} justify="center" alignItems="center">
        <ContactForm links={socialLinksData} />
      </Grid>
      <Grid item container xs={12} justify="center" alignItems="center">
        <ContactCards cards={contactCardData} />
      </Grid>
      <Grid item container xs={12} justify="center" alignItems="center">
        map
      </Grid>
    </div>
  );
};

export default Contact;
