import React from "react";

// Material-ui
import Link from "@material-ui/core/Link";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  iconButton: (props) => ({
    color: theme.palette.common.white,
    "&:hover": {
      color: props.color,
    },
  }),
}));

const SocialLinks = (props) => {
  const classes = useStyles(props.color);

  return (
    <Link href={props.href} target={props.target} className={classes.iconButton}>
      {props.icon}
    </Link>
  );
};

export default SocialLinks;
