import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Material-ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import withWidth from "@material-ui/core/withWidth";
import Hidden from "@material-ui/core/Hidden";

// Material-ui Icons

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Components
import TopNav from "../TopNav";
import MenuItems from "../MenuItems";
import CellPhoneDrawer from "../CellPhoneDrawer";

// Data
import { navLinksData } from "../../../utils/navLinks";

// Assets
import Logo from "../../../assets/GRBB-Logo.png";

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
          <Toolbar className={classes.toolbar} disableGutters>
            <Paper className={classes.paperRoot} square>
              <Grid container justify="center" spacing={0}>
                <Grid container item xs={11} justify="center">
                  <Link to="/" className={classes.link}>
                    <img className={classes.img} src={Logo} alt="logo" />
                  </Link>
                  <Hidden mdDown>
                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                      {Array.isArray(navLinksData) &&
                        navLinksData.map((item, index) => {
                          return (
                            <MenuItems
                              key={index}
                              id={item.id}
                              title={item.menu}
                              URL={item.URL}
                              label={item.label}
                              menuItems={item.menuItems}
                              color={item.styles.color}
                              backgroundColor={item.styles.backgroundColor}
                              hoverColor={item.styles.hoverColor}
                              hoverBackgroundColor={item.styles.hoverBackgroundColor}
                            />
                          );
                        })}
                    </ButtonGroup>
                  </Hidden>
                </Grid>

                <Hidden only={["lg", "xl"]}>
                  <Grid container item xs={1} justify="center">
                    <CellPhoneDrawer />
                  </Grid>
                </Hidden>
              </Grid>
            </Paper>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.offSet} />
    </div>
  );
};

MainNav.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(MainNav);
