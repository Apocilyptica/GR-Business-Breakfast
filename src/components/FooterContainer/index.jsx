import React from "react";

// Material-ui
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCoffee, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

// Assets
import Logo from "../../assets/GRBB-Logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    color: "white",
    backgroundColor: theme.palette.common.black,
    padding: theme.spacing(3),
  },
  paperLogo: {
    width: 260,
  },
  paperLink: {
    width: 60,
    height: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  link: {
    fontSize: 30,
    color: theme.palette.common.white,
  },
  linkItem: {
    maxWidth: 60,
  },
  linkContainer: {
    maxWidth: 260,
  },
  image: {
    width: "100%",
    height: "auto",
    padding: theme.spacing(1),
  },
  eventDetails: {
    padding: theme.spacing(1),
  },
}));

const FooterContainer = (props) => {
  const classes = useStyles(props);

  return (
    <Grid container className={classes.root} justify="center" alignItems="center">
      <Grid item container className={classes.linkContainer} xs={12} md={4} justify="center" alignItems="center" spacing={1}>
        <Grid item>
          <Paper className={classes.paperLogo} square elevation={0}>
            <img className={classes.image} src={Logo} alt="Logo" />
          </Paper>
        </Grid>
        <Grid container justify="space-between" alignItems="center">
          {props.links.map((link, index) => {
            return (
              <Grid className={classes.linkItem} key={index} item xs={3}>
                <Link href={link.URL} target="_blank">
                  <Paper style={link.backgroundColor} className={classes.paperLink} square elevation={0}>
                    <Typography className={classes.link} align="center">
                      {link.iconFa}
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            );
          })}
          <Grid item className={classes.linkItem} xs={3}>
            <Paper style={{ backgroundColor: "red" }} className={classes.paperLink} square elevation={0}>
              <Typography style={{}} className={classes.link} align="center">
                <FontAwesomeIcon icon={faEnvelope} />
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={classes.eventDetails} xs={12} md={4} direction="column" justify="center" alignItems="center">
        <Grid item container xs={12} spacing={1} justify="center" alignItems="center">
          <Grid item xs={5} container justify="flex-end">
            <Paper style={{ backgroundColor: "black" }} className={classes.paperLink} square elevation={0}>
              <Typography className={classes.link} align="center">
                <FontAwesomeIcon icon={faCoffee} />
              </Typography>
            </Paper>
          </Grid>
          <Grid item container xs={7} direction="column">
            <Grid item>
              <Typography>7:45am</Typography>
            </Grid>
            <Grid item>
              <Typography>Networking</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1} justify="center" alignItems="center">
          <Grid item xs={5} container justify="flex-end">
            <Paper style={{ backgroundColor: "black" }} className={classes.paperLink} square elevation={0}>
              <Typography className={classes.link} align="center">
                <FontAwesomeIcon icon={faLightbulb} />
              </Typography>
            </Paper>
          </Grid>
          <Grid item container xs={7} direction="column" justify="center">
            <Grid item>
              <Typography>8:00am - 9:00am</Typography>
            </Grid>
            <Grid item>
              <Typography>Event</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1} justify="center" alignItems="center">
          <Grid item xs={5} container justify="flex-end">
            <Paper style={{ backgroundColor: "black" }} className={classes.paperLink} square elevation={0}>
              <Typography className={classes.link} align="center">
                <FontAwesomeIcon icon={faMapPin} />
              </Typography>
            </Paper>
          </Grid>
          <Grid item container xs={7} direction="column" justify="center">
            <Grid item>
              <Typography>Virtual Event</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} md={4} justify="center" alignItems="center">
        eventcard
      </Grid>
    </Grid>
  );
};

export default FooterContainer;
