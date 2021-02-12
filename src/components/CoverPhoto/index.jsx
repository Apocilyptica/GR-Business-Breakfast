import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { sendFile, setFile } from "../../redux/UserData/userdata.actions";

// Material-ui
import Grid from "@material-ui/core/grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import { DropzoneDialog } from "material-ui-dropzone";
import Paper from "@material-ui/core/Paper";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Components
import DropdownMenu from "../DropdownMenu";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCamera } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(1),
  },
  editPhotoButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  editPhotoButtonText: {
    color: theme.palette.secondary.light,
    fontWeight: 600,
  },
  editPhotoIcon: {
    fontsize: 50,
    padding: theme.spacing(0, 1, 0, 0),
  },
  userPhoto: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  photoContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 200,
    minWidth: 500,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalDetails: {
    width: "100%",
  },
  modalPhoto: {
    width: "100%:,",
  },
  modalTitle: {
    fontWeight: 600,
  },
  dummyPic: {
    display: "flex",
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
}));

const mapState = ({ userdata }) => ({
  profilePhoto: userdata.url,
});

const CoverPhoto = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const [loaderOpen, setLoaderOpen] = useState(false);

  const handleLoaderSave = (file) => {
    if (!currentUser) return;
    const photo = file[0];
    dispatch(setFile(photo));
    dispatch(sendFile());
    setLoaderOpen(false);
  };

  const handleLoaderOpen = () => {
    setLoaderOpen(true);
  };
  const handleLoaderClose = () => {
    setLoaderOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid className={classes.photoContainer} container justify="center" alignItems="center">
          {props.photoURL ? (
            <img className={classes.userPhoto} src={props.photoURL} alt="UserPhoto" />
          ) : (
            <Paper className={classes.dummyPic}>
              <Typography variant="h3" align="center">
                Upload A Profile Picture
              </Typography>
            </Paper>
          )}

          <DropdownMenu
            button={
              <>
                <Typography className={classes.editPhotoIcon}>
                  <FontAwesomeIcon icon={faCamera} />
                </Typography>

                <Typography className={classes.editPhotoButtonText}>Edit Cover Photo</Typography>
              </>
            }
            buttonStyles={classes.editPhotoButton}
          >
            <MenuItem onClick={handleLoaderOpen}>
              <Typography className={classes.editPhotoIcon}>
                <FontAwesomeIcon icon={faUpload} />
              </Typography>
              <Typography variant="subtitle1">Upload Photo</Typography>
            </MenuItem>
          </DropdownMenu>
        </Grid>
      </Grid>
      <div>
        <DropzoneDialog
          clearOnUnmount={true}
          open={loaderOpen}
          onSave={handleLoaderSave}
          acceptedFiles={["image/*"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={handleLoaderClose}
          filesLimit={1}
        />
      </div>
    </div>
  );
};

export default CoverPhoto;