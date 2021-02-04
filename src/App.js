import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

// Redux
import { checkUserSession } from "./redux/User/user.actions";

// Material-ui
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import Toolbar from "@material-ui/core/Toolbar";

// Material-ui Styles
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";

// Material-ui Icons
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// Components

import UserProfile from "./pages/UserProfile";

// High Order Components

// layouts
import MainLayout from "./layouts/MainLayout";
import UserProfileLayout from "./layouts/UserProfileLayout";

// Pages
import Homepage from "./pages/HomePage";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Membership from "./pages/Membership";
import OurMembers from "./pages/OurMembers";
import PastEvents from "./pages/PastEvents";
import Sponsors from "./pages/Sponsors";
import Testimonials from "./pages/Testimonials";
import UpComingEvents from "./pages/UpComingEvents";

// Default SCSS
import "./default.scss";

// ---------------------------Code Below ---------------------------- //

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 2,
  },
}));

const ScrollTop = (props) => {
  const { children } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
};

const mapState = ({ style }) => ({
  darkMode: style.darkMode,
});

function App(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { darkMode } = useSelector(mapState);

  const themeDark = createMuiTheme({
    palette: {
      primary: {
        light: "#575978",
        main: "#ca3e47",
        dark: "#0B0D2C",
      },
      secondary: {
        light: "#9C353E",
        main: "#263859",
        dark: "#360000",
      },
      text: {
        primary: "#ca3e47",
      },
      type: "dark",
    },
  });

  // Material-ui Theme Styles
  const themeLight = createMuiTheme({
    palette: {
      primary: {
        light: "#575978",
        main: "#242645",
        dark: "#0B0D2C",
      },
      secondary: {
        light: "#9C353E",
        main: "#69020b",
        dark: "#360000",
      },
      text: {
        primary: "#656464",
      },
    },
  });

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkMode ? themeDark : themeLight}>
      <Grid container direction="column">
        <Toolbar id="back-to-top-anchor" />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainLayout>
                <Homepage />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() => (
              <MainLayout>
                <Login />
              </MainLayout>
            )}
          />
          <Route
            path="/upcomingevents"
            render={() => (
              <MainLayout>
                <UpComingEvents />
              </MainLayout>
            )}
          />
          <Route
            path="/pastevents"
            render={() => (
              <MainLayout>
                <PastEvents />
              </MainLayout>
            )}
          />
          <Route
            path="/membership"
            render={() => (
              <MainLayout>
                <Membership />
              </MainLayout>
            )}
          />
          <Route
            path="/ourmembers"
            render={() => (
              <MainLayout>
                <OurMembers />
              </MainLayout>
            )}
          />
          <Route
            path="/about"
            render={() => (
              <MainLayout>
                <About />
              </MainLayout>
            )}
          />
          <Route
            path="/sponsors"
            render={() => (
              <MainLayout>
                <Sponsors />
              </MainLayout>
            )}
          />
          <Route
            path="/testimonials"
            render={() => (
              <MainLayout>
                <Testimonials />
              </MainLayout>
            )}
          />
          <Route
            path="/contact"
            render={() => (
              <MainLayout>
                <Contact />
              </MainLayout>
            )}
          />
          <Route
            path="/userprofile"
            render={() => (
              <UserProfileLayout>
                <UserProfile />
              </UserProfileLayout>
            )}
          />
        </Switch>
        <ScrollTop {...props}>
          <Fab className={classes.fab} color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
