import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Redux
import { updateUserData } from "../../redux/UserData/userdata.actions";

// Material-ui
import Grid from "@material-ui/core/grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Components
import DropdownMenu from "../DropdownMenu";
import ImgEditor from "../ImgEditor";
import UserPhotosSelect from "../UserPhotosSelect";
import CustomDialog from "../CustomDialog";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCamera, faImage, faUserCircle } from "@fortawesome/free-solid-svg-icons";

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
  dummyPic: {
    display: "flex",
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    background: "rgba(0, 0, 0, 0.5)",
  },
}));

const CoverPhoto = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isAvatar, setIsAvatar] = useState(false);
  const [openSelectImage, setOpenSelectImage] = useState(false);

  useEffect(() => {
    if (avatar) {
      dispatch(updateUserData("avatar", avatar));
    }
  }, [avatar, dispatch]);

  const handleLoaderOpen = () => {
    setOpen(true);
  };

  const handleSelectImageClose = () => {
    setOpenSelectImage(false);
  };

  const handleSelectImageOpen = () => {
    setOpenSelectImage(true);
  };

  const handleAvatarImageOpen = () => {
    setIsAvatar(true);
    setOpen(true);
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
            <MenuItem onClick={handleSelectImageOpen}>
              <Typography className={classes.editPhotoIcon}>
                <FontAwesomeIcon icon={faImage} />
              </Typography>
              <Typography variant="subtitle1">Set Profile Image</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleAvatarImageOpen}>
              <Typography className={classes.editPhotoIcon}>
                <FontAwesomeIcon icon={faUserCircle} />
              </Typography>
              <Typography variant="subtitle1">Set Avatar</Typography>
            </MenuItem>
          </DropdownMenu>
        </Grid>
      </Grid>
      <ImgEditor open={open} setOpen={setOpen} isAvatar={isAvatar} setAvatar={setAvatar} setIsAvatar={setIsAvatar} />
      <div>
        <CustomDialog open={openSelectImage} onClose={handleSelectImageClose} title="My Images">
          <UserPhotosSelect isSelectImage={true} buttonTitle="Set as Profile" dataType="profileImage" setOpenSelectImage={setOpenSelectImage} />
        </CustomDialog>
      </div>
    </div>
  );
};

export default CoverPhoto;
