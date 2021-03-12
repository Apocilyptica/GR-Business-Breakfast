import React from "react";
import { useFirestore } from "../../customHooks/useFirestore";

// Material-ui
import IconButton from "@material-ui/core/IconButton";

// Material-ui Icons
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsOverscanIcon from "@material-ui/icons/SettingsOverscan";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imgGrid: {
    margin: "20px auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "40px",
  },
  imgWrap: {
    overflow: "hidden",
    height: 0,
    padding: "50% 0",
    position: "relative",

    "&:hover img": {
      opacity: 0.3,
    },
    "&:hover div": {
      opacity: 1,
    },
  },
  img: {
    minWidth: "100%",
    minHeight: "100%",
    maxWidth: "150%",
    position: "absolute",
    top: 0,
    left: 0,
    cursor: "pointer",
    transition: ".5s ease",
  },
  icons: {
    display: "absolute",
    Top: "50%",
    left: "50%",
    opacity: 0,
    transition: ".5s ease",
    transform: "translateY(-50%)",
    textAlign: "center",
  },
  icon: {
    "&:hover": {
      fontSize: 40,
    },
  },
  selectImage: {
    minWidth: "20vw",
  },
}));

const UserImages = ({ setSelectedImage, handleDelete, isSelectImage }) => {
  const classes = useStyles();
  const { docs } = useFirestore("images");

  return (
    <div className={classes.imgGrid}>
      {docs &&
        docs.map((doc) => (
          <div>
            {isSelectImage ? (
              <div className={classes.selectImage}>
                <div className={classes.imgWrap} key={doc.id} onClick={() => setSelectedImage(doc.url)}>
                  <img className={classes.img} src={doc.url} alt="user images" />
                </div>
              </div>
            ) : (
              <div className={classes.imgWrap} key={doc.id}>
                <img className={classes.img} src={doc.url} alt="user images" />
                <div className={classes.icons}>
                  <IconButton aria-label="expand" onClick={() => setSelectedImage(doc.url)}>
                    <SettingsOverscanIcon className={classes.icon} color="primary" fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete({ uuid: doc.uuid, id: doc.id })}>
                    <DeleteIcon className={classes.icon} color="secondary" fontSize="large" />
                  </IconButton>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default UserImages;
