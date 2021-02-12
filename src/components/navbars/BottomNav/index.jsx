import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Material-ui
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import withWidth from "@material-ui/core/withWidth";

// Components
import CellPhoneDrawer from "../CellPhoneDrawer";
import MenuItems from "../MenuItems";

// Data
import { navLinksData } from "../../../utils/navLinks";

// Assets
import Logo from "../../../assets/GRBB-Logo.png";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.common.white,
  },
  paperRoot: {
    flexGrow: 1,
    height: "100%",
  },
  img: {
    height: 75,
    margin: theme.spacing(1, 5, 1, 0),
  },
  link: {
    height: 75 + theme.spacing(2),
  },
}));

const BottomNav = () => {
  const classes = useStyles();
  return (
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
  );
};

BottomNav.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(BottomNav);
