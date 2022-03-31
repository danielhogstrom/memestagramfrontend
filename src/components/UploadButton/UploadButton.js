import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import "./uploadbutton.css";
import axios from "axios";
import Box from "@mui/material/Box";
import FileInput from "../FileInput/FileInput";

const S3_BUCKET = "memestagram";
const REGION = "eu-north-1";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadImageToS3WithNativeSdk = (props) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [memeObj, setMemeObj] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [input, setInput] = useState("");

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    setMemeObj({
      picurl: `https://memestagram.s3.amazonaws.com/${e.target.files[0].name}`,
      description: input,
      likes: 0,
    });
  };
  useEffect(() => {
    if (selectedFile) {
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  }, [selectedFile]);

  const descriptionInput = () => {};

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };
    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
    sendMeme(memeObj);
    //Rerender BasicGrid
    props.setUpdate(() => {
      if (props.update === true) {
        return false;
      }
      return true;
    });
  };

  const sendMeme = (meme) => {
    axios.post(`http://localhost:8080/api/meme/${props.user.id}/add`, meme);
  };

  return (
    //Todo description

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {imageUrl && selectedFile && (
        <Box
          mt={2}
          textAlign="center"
          style={{ width: "350px", height: "350px" }}
        >
          <div>Image Preview:</div>
          <img
            style={{ width: "300px", height: "300px" }}
            src={imageUrl}
            alt={selectedFile.name}
          />
        </Box>
      )}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="description"
        style={{ padding: "10px" }}
      ></input>
      <div className="file-input">
        <input
          type="file"
          className="file"
          name="file"
          id="file"
          aria-label="File browser example"
          accept="image/*"
          onChange={handleFileInput}
          style={{}}
        />
        <label htmlFor="file">Select File</label>
      </div>
      <div className="upload-input">
        <button
          className="upload"
          onClick={() => uploadFile(selectedFile)}
          style={{}}
        >
          upload
        </button>
      </div>
    </div>
  );
};

export default UploadImageToS3WithNativeSdk;
