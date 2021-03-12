import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Actions
import { updateUserData } from "../../redux/UserData/userdata.actions";

// Material-ui
import Button from "@material-ui/core/button";

// Components
import UploadForm from "../UploadForm";
import UserImages from "../UserImages";
import CustomDialog from "../CustomDialog";
import TransitionsModal from "../Modal";

// material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "75vw",
    maxHeight: "50vh",
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight: 600,
  },
}));

const UserPhotosSelect = ({ dataType, setOpenSelectImage, isSelectImage, buttonTitle }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      setOpen(true);
    }
  }, [selectedImage]);

  const onClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleSetImageUrl = () => {
    dispatch(updateUserData(dataType, selectedImage));
    setSelectedImage(null);
    setOpen(false);
    setOpenSelectImage(false);
  };

  return (
    <div>
      <UploadForm />
      <UserImages setSelectedImage={setSelectedImage} isSelectImage={isSelectImage} />
      {selectedImage && (
        <TransitionsModal open={open} onClose={onClose}>
          <img className={classes.image} src={selectedImage} alt="selected" />
          <div>
            <Button variant="contained" color="primary" onClick={handleSetImageUrl}>
              {buttonTitle}
            </Button>
          </div>
        </TransitionsModal>
      )}
    </div>
  );
};

export default UserPhotosSelect;
