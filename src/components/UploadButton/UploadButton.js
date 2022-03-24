import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import "./uploadbutton.css";
import axios from "axios";

const S3_BUCKET = "memestagram";
const REGION = "eu-north-1";

AWS.config.update({
  accessKeyId: "AKIA3WEOS4RPZHNOEYUK ",
  secretAccessKey: "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",
});
//https://memestagram.s3.amazonaws.com/{iff2.png}
const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadImageToS3WithNativeSdk = (props) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [memeObj, setMemeObj] = useState({});

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
    setMemeObj({
      picurl: `https://memestagram.s3.amazonaws.com/${e.target.files[0].name}`,
      description: "hej",
      memeCreatedByUser: props.user,
    });
  };

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
  };

  const sendMeme = (meme) => {
    axios.post("http://localhost:8080/api/meme/add", meme);
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
      <label class="file">
        <input
          type="file"
          className="custom-file-input"
          id="file"
          aria-label="File browser example"
          accept="image/*"
          onChange={handleFileInput}
        />
        <span class="file-custom"></span>
        <button onClick={() => uploadFile(selectedFile)}>upload</button>
      </label>
    </div>
  );
};

export default UploadImageToS3WithNativeSdk;
