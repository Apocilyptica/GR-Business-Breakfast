import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

// Material-ui
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Mterial-ui Icons
import MenuIcon from "@material-ui/icons/Menu";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Data
import { navLinksData } from "../../../utils/navLinks";
import { MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  list: {
    width: 250,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  fullList: {
    width: "auto",
  },
  menuItems: {
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.common.white,
    },
  },
  navLink: {
    fontWeight: 600,
  },
}));

const CellPhoneDrawer = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div className={clsx(classes.list, classes.fullList)} role="presentation" onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {navLinksData.map((item, index) => (
          <div key={index}>
            <Accordion>
              {item.menuItems.length !== 0 ? (
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.navLink} color="primary" variant="h6">
                    {item.menu}
                  </Typography>
                </AccordionSummary>
              ) : (
                <Link to={item.URL} style={{ textDecoration: "none" }}>
                  <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={toggleDrawer(anchor, false)}>
                    <Typography className={classes.navLink} color="primary" variant="h6">
                      {item.menu}
                    </Typography>
                  </AccordionSummary>
                </Link>
              )}
              <Divider />
              {item.menuItems.length !== 0 &&
                item.menuItems.map((item, index) => {
                  return (
                    <Link key={index} to={item.URL} style={{ textDecoration: "none" }}>
                      <MenuItem className={classes.menuItems} onClick={toggleDrawer(anchor, false)}>
                        <Typography className={classes.menuItem} variant="subtitle2">
                          {item.menuItem}
                        </Typography>
                      </MenuItem>
                    </Link>
                  );
                })}
            </Accordion>
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {["top"].map((anchor) => (
        <>
          <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </>
      ))}
    </>
  );
};

export default CellPhoneDrawer;
