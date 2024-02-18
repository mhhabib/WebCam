import React, { Fragment, useEffect, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const API = process.env.REACT_APP_BASE_API

function WebCamera() {
  const webcamRef = React.useRef(null);
  const captureInterval=React.useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const [imageList, setimageList] = useState([]);
 

  // Fetch all image files
  let captureCount=1;
  const captureImage=()=>{
    capture();
    captureCount--;
    if(captureCount<=0){
      clearInterval(captureInterval.current)
      setIsCameraOpen(false)
    }
  }
  useEffect(() => {
      controlData()
      captureInterval.current=setInterval(captureImage, 5000);
      return ()=>clearInterval(captureInterval.current);
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
      const response = await fetch(`${API}getfiles/`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });
      const data = await response.json();
      if (response.status === 200) {
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
        `${API}upload/`,
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
  const imageDataSrc=(path) =>{
    return `${API}${path}`
  }
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
      </div>
      <div style={photoDiv}>
        {imageList?.map((imageData) => (
          <div key={imageData._id} style={{ display: "inline-block", marginBottom: "30px" }}>
            <img style={photoStyle} src={imageDataSrc(imageData.imageUrl)} alt="" /> <br />
            <a style={downloadButton} href={imageDataSrc(imageData.imageUrl)} download>
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
