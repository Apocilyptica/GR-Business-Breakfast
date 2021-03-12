import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Dropzone from "../Dropzone";

// Components
import TransitionsModal from "../Modal";
import ProgressBar from "../ProgressBar";

// Material-ui
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Utils
import { getCroppedImg, getImageBlob } from "../../utils/canvas";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  cropContainer: {
    position: "relative",
    width: "50vw",
    height: 200,
    background: "#333",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 5,
    [theme.breakpoints.up("sm")]: {
      height: 400,
    },
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  sliderContainer: {
    display: "flex",
    flex: "1",
    alignItems: "center",
  },
  sliderLabel: {
    [theme.breakpoints.down("xs")]: {
      minWidth: 65,
    },
  },
  slider: {
    padding: "22px 0px",
    marginLeft: 16,
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      margin: "0 16px",
    },
  },
}));

const ImgEditor = ({ open, setOpen, isAvatar, setAvatar }) => {
  const classes = useStyles();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [ratio, setRatio] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [upload, setUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = await getImageBlob(croppedImage, fileName);
      setFile(file);
      setUpload(true);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, fileName]);

  const onClose = useCallback(() => {
    setImageSrc(null);
    setOpen(false);
    setFile(null);
    setUpload(false);
    setFileName(null);
  }, [setOpen]);

  const handleUpload = () => {
    handleCroppedImage();
  };

  return (
    <TransitionsModal open={open} setOpen={setOpen} onClose={onClose}>
      <Typography variant="h6">Image</Typography>
      {imageSrc ? (
        <React.Fragment>
          <div className={classes.cropContainer}>
            <Cropper
              cropShape={isAvatar ? "round" : "rect"}
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1 / ratio}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          {upload ? (
            <ProgressBar file={file} setFile={setFile} setOpen={setOpen} onClose={onClose} isAvatar={isAvatar} setAvatar={setAvatar} />
          ) : (
            <div className={classes.controls}>
              <div className={classes.sliderContainer}>
                <Typography variant="overline" className={classes.sliderLabel}>
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  className={classes.slider}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
              <div className={classes.sliderContainer}>
                <Typography variant="overline" className={classes.sliderLabel}>
                  Ratio
                </Typography>
                <Slider
                  value={ratio}
                  min={0.1}
                  max={2}
                  step={0.01}
                  aria-labelledby="Ratio"
                  className={classes.slider}
                  onChange={(e, ratio) => setRatio(ratio)}
                />
              </div>
              <Button onClick={handleUpload} variant="contained" color="primary" className={classes.cropButton}>
                Save
              </Button>
            </div>
          )}
        </React.Fragment>
      ) : (
        <Dropzone setImageSrc={setImageSrc} setFileName={setFileName} />
      )}
    </TransitionsModal>
  );
};

export default ImgEditor;
