import React from "react";

// Material-ui
import Avatar from "@material-ui/core/Avatar";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.text.primary,
  },
}));

const UserAvatar = ({ currentUser, styles }) => {
  const classes = useStyles();

  return (
    <Avatar alt={currentUser.displayName} src={currentUser.avatar} className={classes.avatar} style={styles}>
      {!currentUser.avatar ? currentUser.displayName[0] : null}
    </Avatar>
  );
};

export default UserAvatar;
