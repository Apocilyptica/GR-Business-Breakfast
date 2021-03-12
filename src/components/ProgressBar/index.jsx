import React, { useEffect } from "react";
import { useStorageAdd } from "../../customHooks/useStorage";

// Material-ui
import LinearProgress from "@material-ui/core/LinearProgress";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
}));

const ProgressBar = ({ file, setOpen, onClose }) => {
  const classes = useStyles();
  const { url, progress } = useStorageAdd(file);

  useEffect(() => {
    if (url) {
      setOpen(false);
      onClose();
    }
  }, [url, setOpen, onClose]);

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default ProgressBar;
