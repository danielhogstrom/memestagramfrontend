import axios from "axios";
import React from "react";
import "./Upload.css";


export default function FileUpload() {
  // State to store uploaded file
  const [file, setFile] = React.useState("");


  function setFileToUpload(event) {
      setFile(event.target.files[0])
  }  


  // Handles file upload
  function handleUpload(event) {
 
    var formData = new formData();
    formData.append("image", file)
    axios
        .post('localhost:8080/images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }            
    })
    console.log(formData)
  }




  return (


    
    <div id="upload-box" style={{
    position: 'fixed',
    top: "0",
    left: "0",
    }}>
      <input type="file" onChange={setFileToUpload}/>
      <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p>
      <input type="submit" onChange={handleUpload}/>

    
      

      {/*{file && <ImageThumb image={file} />*/}
    </div>

    
  );
}
