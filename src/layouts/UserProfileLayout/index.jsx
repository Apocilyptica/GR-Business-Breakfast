import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// Material-ui
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useScrollTrigger } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// Material-ui Icons
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

// Components
import TopNav from "../../components/navbars/TopNav";
import BottomNav from "../../components/navbars/BottomNav";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
  },
}));

const ElevationScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 12 : 0,
  });
};

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const topNavTrigger = useScrollTrigger();
  const { currentUser } = useSelector(mapState);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.avatar}>
        <Avatar alt={currentUser.displayName} src={currentUser.photoURL} className={classes.large}>
          {!currentUser.photoURL ? currentUser.displayName[0] : null}
        </Avatar>
      </div>
      <Divider />
      <List>
        <NavLink to={`/userprofile/${currentUser.displayName.replace(/\s/g, "")}`}>
          <ListItem button>
            <ListItemIcon>
              {" "}
              <AccountCircleIcon />{" "}
            </ListItemIcon>
            <ListItemText primary={currentUser.displayName} />
          </ListItem>
        </NavLink>
        <NavLink to={`/useraccount/${currentUser.displayName.replace(/\s/g, "")}`}>
          <ListItem button>
            <ListItemIcon>
              {" "}
              <LockIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <ElevationScroll className={classes.appBarRoot} {...props}>
        <AppBar position="fixed" className={classes.appBar}>
          <TopNav
            collapse={!topNavTrigger}
            cellPhoneButton={
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
                <MenuIcon />
              </IconButton>
            }
          />
          <BottomNav />
        </AppBar>
      </ElevationScroll>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;