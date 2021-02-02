import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../../redux/User/user.actions";
import { setDarkMode } from "../../../redux/Styles/styles.actions";

// Material-ui
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

// Material-ui Icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Component
import SocialLinks from "../../SocialLinks";

// Links
import { socialLinksData } from "../../../utils/socialLinks";

const mapState = ({ user, style }) => ({
  currentUser: user.currentUser,
  loggedIn: user.loggedIn,
  darkMode: style.darkMode,
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    background: `linear-gradient(10deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
  },
  shoppingCart: {
    color: theme.palette.common.white,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  avatar: {
    backgroundColor: theme.palette.text.primary,
  },
}));

const TopNav = (props) => {
  const classes = useStyles(props);
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser, loggedIn, darkMode } = useSelector(mapState);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    loggedIn ? dispatch(signOutUserStart()) : history.push("/login");
    return;
  };

  const handleDarkModeChange = (event) => {
    dispatch(setDarkMode(event.target.checked));
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Collapse in={props.collapse}>
        <Toolbar className={classes.toolbar}>
          {socialLinksData.map((link, index) => {
            return (
              <IconButton key={index} edge="start" className={classes.menuButton} aria-label={link.label}>
                <SocialLinks href={link.URL} target="_blank" className={classes.iconButton} icon={link.icon} color={link.color} />
              </IconButton>
            );
          })}
          <Hidden only={["sm", "xs"]}>
            <Typography variant="h6" className={classes.title}>
              GR Business Breakfast
            </Typography>
          </Hidden>
          <Hidden only={["lg", "md", "xl"]}>
            <Typography variant="h6" className={classes.title}>
              GRBB
            </Typography>
          </Hidden>
          <Grid container style={{ width: 400 }}>
            <Grid container item xs={2} justify="center">
              {loggedIn && (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar className={classes.avatar}>{currentUser.displayName[0]}</Avatar>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu>
                </div>
              )}
            </Grid>
            <Grid container item xs={6} alignItems="center" spacing={0}>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch checked={loggedIn} onChange={handleChange} aria-label="login switch" />}
                    label={loggedIn ? "Logout" : "Login"}
                  />
                </FormGroup>
              </Grid>
              <Hidden only={["xs", "sm"]}>
                {loggedIn && (
                  <Grid item xs={12}>
                    Welcome {currentUser.displayName}
                  </Grid>
                )}
              </Hidden>
            </Grid>
            <Grid container item xs={4} alignItems="center">
              <IconButton edge="end" className={classes.menuButton} aria-label="shopping cart">
                <ShoppingCartIcon className={classes.shoppingCart} fontSize="large" />
              </IconButton>
              <Hidden only={["xs", "sm", "md"]}>
                <Switch checked={darkMode} onChange={handleDarkModeChange} name="darkMode" inputProps={{ "aria-label": "set dark mode" }} />
              </Hidden>
            </Grid>
          </Grid>
        </Toolbar>
      </Collapse>
    </div>
  );
};

TopNav.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(TopNav);
