import React, { Fragment, useEffect, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

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

  // Fetch all image files
  useEffect(() => {
      controlData()
  }, []);

  const dataURLtoBlob = (dataURL) => {
    const byteString = window.atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++){
      ia[i]=byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
  }

  const controlData = async () => {
      const response = await fetch("http://localhost:8000/getfiles/", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data.images)
        setimageList(data.images)
      }
  };
  const capture = async() => {
      const imageSrc = webcamRef.current.getScreenshot({
        width: 1280,
        height: 720,
      });
      const blob = dataURLtoBlob(imageSrc);
      const formData = new FormData();
      formData.append("file", blob, "image.jpg"); 
      const response = await axios.post(
          "http://localhost:8000/upload",
          formData,
          {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          }
      );
      if (response.status === 201) {
        console.log("Image uploaded successfully!");
        controlData();
      } else {
        console.error(`Error uploading image: ${response.status}`);
      }
  }   
  
  
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
        {imageList?.map((imageData) => (
          <div key={imageData._id} style={{ display: "inline-block", marginBottom: "30px" }}>
            <img style={photoStyle} src={imageData.imageUrl} alt="" /> <br />
            <a style={downloadButton} href={imageData.imageUrl} download>
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
