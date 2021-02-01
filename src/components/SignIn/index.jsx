import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Redux
import { emailSignInStart, googleSignInStart } from "../../redux/User/user.actions";

// Material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// Material-ui Icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ErrorIcon from "@material-ui/icons/Error";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  signin: {
    margin: theme.spacing(3, 0, 1),
  },
  signingoogle: {
    margin: theme.spacing(0, 0, 2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  error: {
    fontSize: 12,
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser, userErr } = useSelector(mapState);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser, history]);

  const resetForm = () => {
    setValues({
      email: "",
      password: "",
      showPassword: false,
    });
  };

  const handleSubmit = (event) => {
    const email = values.email;
    const password = values.password;
    event.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Member Sign in
        </Typography>

        {!Array.isArray(userErr) && (
          <Grid container justify="center" alignItems="center" spacing={0}>
            <Grid item xs={1}>
              <ErrorIcon color="error" />
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.error} color="error">
                {userErr}
              </Typography>
            </Grid>
          </Grid>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange("email")}
            value={values.email}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              required
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.signin}>
            Sign In
          </Button>
          <Button onClick={handleGoogleSignIn} fullWidth variant="contained" color="primary" className={classes.signingoogle}>
            Sign In With Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/recovery" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/registration" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default SignIn;
