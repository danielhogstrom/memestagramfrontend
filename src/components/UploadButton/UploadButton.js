import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";
import "./Uploadbutton.css";


export default class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  handleChange(files) {
    console.log(files);
    this.setState({
      files: files,
    });
    let formData = new FormData();
    formData.append("image", files);
    axios.post("http://localhost:8080/api/user/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  render() {    
    return <DropzoneArea onChange={this.handleChange.bind(this)} />;
    
  }
}
