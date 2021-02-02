import React, { useState } from "react";
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
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/grow";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";

// Material-ui Icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Component
import SocialLinks from "../../SocialLinks";

// Links
import { socialLinksData } from "../../../utils/socialLinks";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mapState = ({ user, style }) => ({
  currentUser: user.currentUser,
  loggedIn: user.loggedIn,
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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
  avatar: {
    backgroundColor: theme.palette.text.primary,
  },
  paperPopper: {
    padding: theme.spacing(1, 2),
  },
  // Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js and https://github.com/mui-org/material-ui/blob/4f2a07e140c954b478a6670c009c23a59ec3e2d4/docs/src/pages/components/popper/ScrollPlayground.js
  popper: {
    zIndex: 2000,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.71em",
      marginLeft: 4,
      marginRight: 4,
      "&::before": {
        transformOrigin: "0 100%",
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.71em",
      marginLeft: 4,
      marginRight: 4,
      "&::before": {
        transformOrigin: "100% 0",
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.71em",
      height: "1em",
      width: "0.71em",
      marginTop: 4,
      marginBottom: 4,
      "&::before": {
        transformOrigin: "100% 100%",
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.71em",
      height: "1em",
      width: "0.71em",
      marginTop: 4,
      marginBottom: 4,
      "&::before": {
        transformOrigin: "0 0",
      },
    },
  },
  // Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js
  arrow: {
    overflow: "hidden",
    position: "absolute",
    width: "1em",
    height: "0.71em" /* = width / sqrt(2) = (length of the hypotenuse) */,
    boxSizing: "border-box",
    color: theme.palette.common.white,
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: "100%",
      height: "100%",
      boxShadow: theme.shadows[1],
      backgroundColor: "currentColor",
      transform: "rotate(45deg)",
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
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [arrowRef, setArrowRef] = React.useState(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    console.log(event);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleSignOut = (event) => {
    loggedIn ? dispatch(signOutUserStart()) : history.push("/login");
    return handleClose(event);
  };

  return (
    <div className={classes.root}>
      <Collapse in={props.collapse}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
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
                    <Button ref={anchorRef} aria-controls={open ? "menu-list-grow" : undefined} aria-haspopup="true" onClick={handleToggle}>
                      <Avatar className={classes.avatar}>{currentUser.displayName[0]}</Avatar>
                    </Button>
                    <Popper
                      className={classes.popper}
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                      modifiers={{
                        arrow: {
                          enabled: true,
                          element: arrowRef,
                        },
                      }}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
                          <ClickAwayListener onClickAway={handleClose}>
                            <Paper className={classes.paperPopper}>
                              <span className={classes.arrow} ref={setArrowRef} />
                              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
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
                                <MenuItem onClick={handleClose}>
                                  <Typography variant="subtitle1">Your Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  <Typography variant="subtitle1">Your Account</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleSignOut}>
                                  <Typography variant="subtitle1">Sign out</Typography>
                                </MenuItem>
                              </MenuList>
                            </Paper>
                          </ClickAwayListener>
                        </Grow>
                      )}
                    </Popper>
                  </Grid>
                )}
              </Grid>
            </div>
          </Toolbar>
        </AppBar>
      </Collapse>
    </div>
  );
};

TopNav.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(TopNav);
