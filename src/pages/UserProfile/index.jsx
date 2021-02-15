import React from "react";

// Material-ui
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Components
import CoverPhoto from "../../components/CoverPhoto";
import UserBio from "../../components/UserBio";
import UserSocialLinks from "../../components/UserSocialLinks";
import { useSelector } from "react-redux";

const mapState = ({ user, userdata }) => ({
  currentUser: user.currentUser,
  loading: userdata.loading,
});

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  paper: {
    flex: 1,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
  },
}));

const UserProfile = (props) => {
  const { currentUser, loading } = useSelector(mapState);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="space-between" alignItems="flex-start" spacing={2}>
        <Grid item xs={12} md={6} container direction="column" alignItems="stretch" spacing={2}>
          <Grid item container>
            <Paper className={classes.paper}>
              <CoverPhoto photoURL={currentUser.photoURL} currentUser={currentUser ? true : false} loading={loading} />
            </Paper>
          </Grid>
          <Grid item container>
            <Paper className={classes.paper}>
              <UserBio bio={currentUser.bio} currentUser={currentUser ? true : false} />
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} container direction="column" alignItems="stretch" spacing={2}>
          <Grid item container>
            <Paper className={classes.paper}>
              <UserSocialLinks currentUser={currentUser ? true : false} socialLinks={currentUser.socialLinks} />
            </Paper>
          </Grid>
          <Grid item container>
            <Paper className={classes.paper} />
          </Grid>
          <Grid item container>
            <Paper className={classes.paper} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfile;
