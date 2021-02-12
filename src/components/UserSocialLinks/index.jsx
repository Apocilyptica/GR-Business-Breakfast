import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Material-ui
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Material-ui Icons
import FacebookIcon from "@material-ui/icons/Facebook";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

const UserSocialLinks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [values, setValues] = useState({
    facebook: "",
    linkedin: "",
    twitter: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Typography variant="h3" align="center">
          Social Links
        </Typography>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Facebook URL</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            value={values.facebook}
            onChange={handleChange("facebook")}
            required
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <FacebookIcon />
              </InputAdornment>
            }
            labelWidth={110}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          Submit Changes
        </Button>
      </form>
    </div>
  );
};

export default UserSocialLinks;
