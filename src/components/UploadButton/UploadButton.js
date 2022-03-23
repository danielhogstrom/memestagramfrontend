import React, { useState } from "react";
import AWS from "aws-sdk";
import "./uploadbutton.css";

const S3_BUCKET = "memestagram";
const REGION = "eu-north-1";

AWS.config.update({});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadImageToS3WithNativeSdk = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    uploadFile(selectedFile);
  };

  const uploadFile = (file) => {
    console.log(file);
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
      </label>
    </div>
  );
};

export default UploadImageToS3WithNativeSdk;
