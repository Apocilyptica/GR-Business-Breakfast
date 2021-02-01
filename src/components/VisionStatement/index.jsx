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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5, 0, 0, 5),
  },
  title: {
    fontWeight: 600,
    textTransform: "uppercase",
  },
  visionStatement: {
    fontStyle: "italic",
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  iconSubheading: {
    fontWeight: 600,
  },
}));

const VisionStatement = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container xs={12} direction="column" justify="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h4" color="primary" align="center">
            Relevant. Edifying. Visionary. Educational.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={8}>
          <Typography className={classes.visionStatement} variant="h6" align="center">
            The Vision for the GR Business Breakfast is to connect business leaders offering a time of networking, edification and insight. We bring
            in dynamic speakers who provide relevant information about hot topics in business and inform you of upcoming trends and changes affecting
            our community/economy. Our goal is to offer an experience that helps each one become prepared to lead our respective companies and
            organizations into the future.
          </Typography>
        </Grid>
        <Grid container item justify="center" alignItems="center" spacing={5}>
          <Grid container item direction="column" justify="center" alignItems="center" xs={4} sm={3} md={2}>
            <Grid item>
              <FontAwesomeIcon className={classes.icon} icon={faAward} size="5x" />
            </Grid>
            <Grid item>
              <Typography className={classes.iconSubheading} align="center" variant="subtitle1" color="primary">
                Top Business Speakers
              </Typography>
            </Grid>
          </Grid>
          <Grid container item direction="column" justify="center" alignItems="center" xs={4} sm={3} md={2}>
            <Grid item>
              <FontAwesomeIcon className={classes.icon} icon={faUsers} size="5x" />
            </Grid>
            <Grid item>
              <Typography className={classes.iconSubheading} align="center" variant="subtitle1" color="primary">
                Valuable Networking
              </Typography>
            </Grid>
          </Grid>
          <Grid container item direction="column" justify="center" alignItems="center" xs={4} sm={3} md={2}>
            <Grid item>
              <FontAwesomeIcon className={classes.icon} icon={faCoffee} size="5x" />
            </Grid>
            <Grid item>
              <Typography className={classes.iconSubheading} align="center" variant="subtitle1" color="primary">
                Light Breakfast Fare
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VisionStatement;
