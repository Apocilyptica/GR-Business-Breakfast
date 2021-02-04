import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { sendFile, setFile, syncFileURL } from "../../redux/Storage/storage.actions";

// Material-ui
import Grid from "@material-ui/core/grid";
import Paper from "@material-ui/core/paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import { DropzoneDialog } from "material-ui-dropzone";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Material-ui Icons
import SettingsOverscanOutlinedIcon from "@material-ui/icons/SettingsOverscanOutlined";

// Components
import DropdownMenu from "../DropdownMenu";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faUpload, faTrashAlt, faCamera } from "@fortawesome/free-solid-svg-icons";

// Assets

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(1, 10),
  },
  editPhotoButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  userPhoto: {
    width: "100%",
    height: "auto",
  },
  photoContainer: {
    position: "relative",
  },
  photoPaper: {
    width: 500,
  },
}));

const mapState = ({ user, storage }) => ({
  currentUser: user.currentUser,
  profilePhoto: storage.url,
});

const CoverPhoto = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { currentUser, profilePhoto } = useSelector(mapState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(syncFileURL());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (file) => {
    if (!currentUser) return;
    const photo = file[0];
    dispatch(setFile(photo));
    dispatch(sendFile());
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Paper className={classes.photoPaper} elevation={3}>
          <Grid className={classes.photoContainer} container justify="center" alignItems="center">
            <Grid item xs>
              <img className={classes.userPhoto} src={profilePhoto} alt="UserPhoto" />
              <DropdownMenu
                button={
                  <Typography>
                    <FontAwesomeIcon icon={faCamera} />
                    Edit Cover Photo
                  </Typography>
                }
                buttonStyles={classes.editPhotoButton}
              >
                <MenuItem>
                  <FontAwesomeIcon icon={faImages} />
                  <Typography variant="subtitle1">Select Photo</Typography>
                </MenuItem>
                <MenuItem onClick={handleOpen}>
                  <FontAwesomeIcon icon={faUpload} />
                  <Typography variant="subtitle1">Upload Photo</Typography>
                </MenuItem>
                <MenuItem>
                  <SettingsOverscanOutlinedIcon />
                  <Typography variant="subtitle1">Reposition</Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <FontAwesomeIcon icon={faTrashAlt} />
                  <Typography variant="subtitle1">Remove</Typography>
                </MenuItem>
              </DropdownMenu>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <div>
        <DropzoneDialog
          clearOnUnmount={true}
          open={open}
          onSave={handleSave}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={handleClose}
          filesLimit={1}
        />
      </div>
    </div>
  );
};

export default CoverPhoto;
