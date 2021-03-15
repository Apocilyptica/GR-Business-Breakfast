import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Actions
import { storageDelete } from "../../redux/UserData/userdata.actions";

// Material-ui
import Typography from "@material-ui/core/Typography";

// Components
import UploadForm from "../UploadForm";
import UserImages from "../UserImages";
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

const UserPhotos = () => {
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

  const handleDelete = (data) => {
    dispatch(storageDelete(data));
  };

  return (
    <div>
      <Typography className={classes.title} variant="h3" color="primary" align="center">
        My Images
      </Typography>
      <UploadForm />
      <UserImages setSelectedImage={setSelectedImage} handleDelete={handleDelete} isSelectImage={false} />
      {selectedImage && (
        <TransitionsModal open={open} onClose={onClose}>
          <img className={classes.image} src={selectedImage} alt="selected" />
        </TransitionsModal>
      )}
    </div>
  );
};

export default UserPhotos;
