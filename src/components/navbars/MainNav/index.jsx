import React, { cloneElement } from "react";

// Material-ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

// Material-ui Icons

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Components
import TopNav from "../TopNav";
import BottomNav from "../BottomNav";

// Assets

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: theme.palette.common.white,
  },
  paperRoot: {
    flexGrow: 1,
    height: "100%",
  },
  fullHeight: {
    ...theme.mixins.toolbar,
  },
  img: {
    height: 75,
    margin: theme.spacing(1, 5, 1, 0),
  },
  link: {
    height: 75 + theme.spacing(2),
  },
  menuButton: {
    fontSize: 20,
  },
  offSet: {
    height: 75 + theme.spacing(2),
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

const MainNav = (props) => {
  const classes = useStyles();
  const topNavTrigger = useScrollTrigger();

  return (
    <div className={classes.root}>
      <ElevationScroll className={classes.appBarRoot} {...props}>
        <AppBar position="fixed">
          <TopNav collapse={!topNavTrigger} />
          <BottomNav />
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.offSet} />
    </div>
  );
};

export default MainNav;
