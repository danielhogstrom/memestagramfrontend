import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import "./uploadbutton.css";
import axios from "axios";

const S3_BUCKET = "memestagram";
const REGION = "eu-north-1";

AWS.config.update({
  accessKeyId: "AKIA3WEOS4RPZHNOEYUK",
  secretAccessKey: "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",
});

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
    setMemeObj({
      picurl: `https://memestagram.s3.amazonaws.com/${e.target.files[0].name}`,
      description: "hej",
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
    //Rerender BasicGrid
    props.setUpdate(() => {
      if (props.update === true) {
        return false;
      }
      return true;
    });
  };

  const sendMeme = (meme) => {
    console.log(props.user);
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
      <input
        type="file"
        className="inputfile"
        name="file"
        id="file"
        aria-label="File browser example"
        accept="image/*"
        onChange={handleFileInput}
      />
      <button onClick={() => uploadFile(selectedFile)}>upload</button>
    </div>
  );
};

export default UploadImageToS3WithNativeSdk;
