import React, { useState } from "react";

// Material-ui
import Fab from "@material-ui/core/Fab";

// Material-ui Icons
import AddIcon from "@material-ui/icons/Add";

// Components
import ImgEditor from "../ImgEditor";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    color: theme.palette.common.white,
  },
}));

const ImageUploadButton = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleClick} variant="extended">
        <AddIcon className={classes.input} />
        Add New Image
      </Fab>
      <ImgEditor open={open} setOpen={setOpen} />
    </div>
  );
};

export default ImageUploadButton;
