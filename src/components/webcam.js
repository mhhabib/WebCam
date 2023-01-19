import React, { Fragment, useState } from "react";
import Webcam from "react-webcam";
import "./webcam.css";
import uuid from "react-uuid";

function WebCamera() {
  const webcamRef = React.useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imageList, setimageList] = useState([]);
  const cameraToggleButton = isCameraOpen ? "Close Camera" : "Open Camera";
  const cameraControl = () => {
    if (isCameraOpen) {
      setIsCameraOpen(false);
      setimageList([]);
    } else {
      setIsCameraOpen(true);
    }
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1920,
      height: 1080,
    });
    setimageList((previousData) => {
      return [{ id: uuid.toString(), imageName: imageSrc }, ...previousData];
    });
  };

  const photoDiv = {
    marginTop: "50px",
    textAlign: "center",
  };
  const photoStyle = {
    margin: "5px",
    width: "360px",
    height: "240px",
    border: "5px solid #d1d1d1",
    borderRadius: "20px",
  };
  const onOffButton = {
    textDecoration: "none",
    backgroundColor: "#D61C4E",
    border: "none",
    color: "#E0E0E0",
    padding: "6px 15px",
    cursor: "pointer",
    fontSize: "16px",
  };
  const emptyCamera = {
    marginTop: "30%",
  };
  const captureButton = {
    textDecoration: "none",
    backgroundColor: "#18978F",
    border: "none",
    color: "#E0E0E0",
    padding: "6px 15px",
    cursor: "pointer",
    fontSize: "16px",
  };
  const cameraBox = {
    marginTop: "50px",
    textAlign: "center",
  };
  const cameraAPIStyle = {
    border: "4px solid #d1d1d1",
    borderRadius: "20px",
    width: "480px",
  };
  const downloadButton = {
    textDecoration: "none",
    backgroundColor: "#22A39F",
    border: "none",
    color: "white",
    padding: "6px 15px",
    cursor: "pointer",
    fontSize: "16px",
    width: "19%",
  };
  return (
    <Fragment>
      <div style={cameraBox}>
        {isCameraOpen && (
          <Webcam
            style={cameraAPIStyle}
            mirrored={true}
            audio={false}
            screenshotFormat="image/jpeg"
            ref={webcamRef}
          />
        )}
        {!isCameraOpen && <div style={emptyCamera}></div>}
        <div>
          <button style={onOffButton} onClick={cameraControl}>
            {cameraToggleButton}
          </button>{" "}
          {isCameraOpen && (
            <button style={captureButton} onClick={capture}>
              Capture Image
            </button>
          )}
        </div>
      </div>
      <div style={photoDiv}>
        {imageList.map((imageData) => (
          <div style={{ display: "inline-block", marginBottom: "30px" }}>
            <img style={photoStyle} src={imageData.imageName} alt="" /> <br />
            <a style={downloadButton} href={imageData.imageName} download>
              <i className="fa fa-download"> </i>
              Download
            </a>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
export default WebCamera;
