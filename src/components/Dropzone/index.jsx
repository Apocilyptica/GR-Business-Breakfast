import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

// Material-ui
import Typography from "@material-ui/core/Typography";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 5,
  width: "50vw",
  height: 300,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#333",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function Dropzone({ setImageSrc, setFileName }) {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    maxFiles: 1,
    accept: "image/*",
    onDrop: async (acceptedFile) => {
      const file = acceptedFile[0];

      if (file) {
        let imageDataUrl = await readFile(file);
        setImageSrc(imageDataUrl);
        setFileName(file.name);
      }
    },
  });

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Typography>Drag 'n' drop an image, or click to select image</Typography>
        <br />
        <Typography>
          <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />
        </Typography>
      </div>
    </section>
  );
}

export default Dropzone;
