import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Redux Actions
import { setSocialLinks } from "../../redux/UserData/userdata.actions";

// Material-ui
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Data
import { userSocialLinks } from "../../utils/userSocialLinks";

// Material-ui Alert
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  formItem: {
    margin: theme.spacing(2, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

const UserSocialLinks = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    facebook: props.socialLinks ? props.socialLinks.facebook : "",
    linkedin: props.socialLinks ? props.socialLinks.linkedin : "",
    twitter: props.socialLinks ? props.socialLinks.twitter : "",
    instagram: props.socialLinks ? props.socialLinks.instagram : "",
  });
  const [validURL, setValidURL] = useState({
    facebook: checkValidURL(props.socialLinks ? props.socialLinks.facebook : "", "facebook"),
    linkedin: checkValidURL(props.socialLinks ? props.socialLinks.linkedin : "", "linkedin"),
    twitter: checkValidURL(props.socialLinks ? props.socialLinks.twitter : "", "twitter"),
    instagram: checkValidURL(props.socialLinks ? props.socialLinks.instagram : "", "instagram"),
  });
  const [validate, setValidate] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const checkValidation = Object.keys(validURL).every(function (k) {
    return validURL[k] === false;
  });

  useEffect(() => {
    setValidate(checkValidation);
  }, [validURL, checkValidation]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!props.currentUser) return;
    if (!validate) {
      setOpen(true);
      return;
    }
    setOpen(false);
    dispatch(setSocialLinks(values));
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    const validation = setValidURL({ ...validURL, [prop]: checkValidURL(event.target.value, prop) });
    setValidate(!validation);
  };

  function checkValidURL(str, prop) {
    if (str.length === 0) return false;
    var pattern = new RegExp(
      `^(https?:\\/\\/)?(?:www.)?${prop}?` + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !pattern.test(str);
  }

  return (
    <div>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Typography variant="h3" align="center">
          Social Links
        </Typography>
        {userSocialLinks.map((link, index) => {
          return (
            <div key={index}>
              <FormControl className={classes.formItem} key={index} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{link.label}</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="url"
                  autoComplete="off"
                  value={eval(`values.${link.name}`)}
                  onChange={handleChange(`${link.name}`)}
                  endAdornment={
                    <InputAdornment style={link.color} position="end">
                      {link.iconUI}
                    </InputAdornment>
                  }
                  labelWidth={link.labelWidth}
                />
              </FormControl>
              {eval(`validURL.${link.name}`) ? (
                <Typography color="error" variant="subtitle2">
                  * Please Enter A Valid {link.label}
                </Typography>
              ) : null}
            </div>
          );
        })}
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          Submit Changes
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          You Must Enter A Valid Social Link URL To Submit!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserSocialLinks;
