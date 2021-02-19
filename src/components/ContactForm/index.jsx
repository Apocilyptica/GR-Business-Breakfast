import React from "react";

// Material-ui
import Grid from "@material-ui/core/grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  formRoot: {
    margin: theme.spacing(5),
  },
  formFields: {
    width: "100%",
  },
  paperRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    padding: theme.spacing(1),
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1, 0),
    lineHeight: 1,
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
}));

const ContactForm = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form className={classes.formRoot}>
        <Grid container justify="center" alignItems="center" spacing={3}>
          <Grid container item xs={12} md={6}>
            <Paper className={classes.root} elevation={6}>
              <Grid className={classes.formContainer} container item xs={12} spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    id="filled-required"
                    label="First Name"
                    variant="outlined"
                    type="name"
                    name="first"
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    id="filled-required"
                    label="Last Name"
                    variant="outlined"
                    type="name"
                    name="last"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    id="filled-required"
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth required id="filled-required" label="Phone" variant="outlined" type="phone" name="phone" autoComplete="tel" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth required id="outlined-multiline-static" label="How Can We Assist You?" multiline rows={4} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <Button className={classes.buttonContainer} variant="contained" color="secondary">
                    <Grid item container justify="center" alignItems="center">
                      <Typography className={classes.button} variant="h5">
                        Submit
                      </Typography>
                    </Grid>
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container item xs={12} md={3} spacing={2}>
            <Grid item>
              {" "}
              <Typography variant="h6">Questions? We Can Help</Typography>
            </Grid>
            <Grid item>
              Have a question, comment or suggestion for us? Please fill out our assistance form or contact a specific department from the options
              below.
            </Grid>
            <Grid container item justify="flex-start" alignItems="center" spacing={1}>
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
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ContactForm;
