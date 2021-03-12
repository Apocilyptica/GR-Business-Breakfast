import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../../redux/User/user.actions";

// Material-ui
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

// Material-ui Icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Component
import SocialLinks from "../../SocialLinks";
import UserAvatar from "../../UserAvatar";

// Links
import { socialLinksData } from "../../../utils/socialLinks";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownMenu from "../../DropdownMenu";

const mapState = ({ user, style }) => ({
  currentUser: user.currentUser,
  loggedIn: user.loggedIn,
});

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
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
  userName: {
    fontWeight: 600,
  },
  setStatus: {
    fontSize: 10,
  },
  setStatusButton: {
    margin: theme.spacing(1, 2),
  },
  signInButton: {
    backgroundColor: theme.palette.common.white,
  },
  signInButtonText: {
    fontSize: 15,
    fontWeight: 600,
    textTransform: "capitalize",
    padding: theme.spacing(0, 1, 0, 0),
  },
}));

const TopNav = (props) => {
  const classes = useStyles(props);
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser, loggedIn } = useSelector(mapState);

  const handleSignOut = (event) => {
    loggedIn ? dispatch(signOutUserStart()) : history.push("/login");
  };

  return (
    <Collapse in={props.collapse}>
      <Toolbar className={classes.toolbar}>
        {props.cellPhoneButton}
        {socialLinksData.map((link, index) => {
          return (
            <IconButton key={index} edge="start" aria-label={link.label}>
              <SocialLinks href={link.URL} target="_blank" className={classes.iconButton} icon={link.iconUI} color={link.color} />
            </IconButton>
          );
        })}
        <Hidden only={["sm", "xs"]}>
          <Typography className={classes.title} variant="h6">
            GR Business Breakfast
          </Typography>
        </Hidden>
        <Hidden only={["lg", "md", "xl"]}>
          <Typography className={classes.title} variant="h6">
            GRBB
          </Typography>
        </Hidden>
        <div>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item>
              <IconButton aria-label="shopping cart">
                <ShoppingCartIcon className={classes.shoppingCart} />
              </IconButton>
            </Grid>
            <Hidden only={["xs", "sm"]}>{loggedIn && <Grid item>Welcome {currentUser.displayName}</Grid>}</Hidden>
            {!loggedIn && (
              <Grid item>
                <Button className={classes.signInButton} variant="outlined" color="secondary" onClick={handleSignOut}>
                  <Typography className={classes.signInButtonText}>Sign In</Typography>
                  <FontAwesomeIcon icon={faSignInAlt} />
                </Button>
              </Grid>
            )}
            {loggedIn && (
              <Grid item>
                <DropdownMenu button={<UserAvatar currentUser={currentUser} />}>
                  <Typography variant="subtitle1">Signed in as</Typography>
                  <Typography className={classes.userName} variant="subtitle1">
                    {currentUser.displayName}
                  </Typography>
                  <Divider />
                  <Button className={classes.setStatusButton} variant="outlined" color="secondary">
                    <Typography className={classes.setStatus} align="center">
                      Set status
                    </Typography>
                  </Button>
                  <Divider />
                  <MenuItem>
                    <NavLink to={`/userprofile/${currentUser.displayName.replace(/\s/g, "")}`}>
                      <Typography variant="subtitle1">Your Profile</Typography>
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to={`/useraccount/${currentUser.displayName.replace(/\s/g, "")}`}>
                      <Typography variant="subtitle1">Your Account</Typography>
                    </NavLink>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleSignOut}>
                    <Typography variant="subtitle1">Sign out</Typography>
                  </MenuItem>
                </DropdownMenu>
              </Grid>
            )}
          </Grid>
        </div>
      </Toolbar>
    </Collapse>
  );
};

TopNav.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(TopNav);
