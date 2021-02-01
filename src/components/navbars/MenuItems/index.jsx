import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

// Material-ui
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Popper from "@material-ui/core/Popper";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";

// Material-ui Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: theme.mixins.toolbar,
    backgroundColor: (props) => props.backgroundColor,
    transition: "1s ease-in-out",
    "&:hover": {
      backgroundColor: (props) => props.hoverBackgroundColor,
    },
    padding: 0,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(0),
    },
  },
  menuItems: {
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.common.white,
    },
  },
  menuItem: {
    fontWeight: 600,
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    height: 75 + theme.spacing(2),
    padding: theme.spacing(4),
    fontWeight: 600,
    color: (props) => props.color,
    "&:hover": {
      color: (props) => props.hoverColor,
    },
  },
  becomeAMember: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const MenuItems = (props) => {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      {props.menuItems.length !== 0 ? (
        <Button className={classes.fullHeight} ref={anchorRef} aria-controls={open ? "menu-list-grow" : undefined} aria-haspopup="true">
          <Typography className={classes.navLink} color="primary" variant="h6">
            <Grid item container justify="center" alignItems="center">
              <Grid item>{props.title}</Grid> <Grid item>{props.menuItems.length !== 0 && <ExpandMoreIcon />}</Grid>
            </Grid>
          </Typography>
        </Button>
      ) : (
        <Link to={props.URL} style={{ textDecoration: "none" }}>
          <Button className={classes.fullHeight} ref={anchorRef} aria-controls={open ? "menu-list-grow" : undefined} aria-haspopup="true">
            <Typography className={classes.navLink} color="primary" variant="h6">
              <Grid item container justify="center" alignItems="center">
                <Grid item>{props.title}</Grid> <Grid item>{props.menuItems.length !== 0 && <ExpandMoreIcon />}</Grid>
              </Grid>
            </Typography>
          </Button>
        </Link>
      )}

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Collapse
            in={open}
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
            {...(open ? { timeout: 1000 } : {})}
          >
            <Paper elevation={10}>
              {props.menuItems.length !== 0 &&
                props.menuItems.map((item, index) => {
                  return (
                    <Link to={item.URL} style={{ textDecoration: "none" }}>
                      <MenuItem className={classes.menuItems} key={index} onClick={handleClose}>
                        <Typography className={classes.menuItem} variant="h6">
                          {item.menuItem}
                        </Typography>
                      </MenuItem>
                    </Link>
                  );
                })}
            </Paper>
          </Collapse>
        )}
      </Popper>
    </div>
  );
};

export default MenuItems;
