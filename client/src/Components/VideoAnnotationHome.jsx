import React, { Component } from "react";
import { TwoDimensionalVideo } from "react-annotation-tool";

const crypto = require("crypto");

export default class VideoAnnotationHome extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  componentDidMount() {
    this.getVideoLink();
  }

  getVideoLink() {
    const videoLink = prompt("Enter the video link: ");
    this.setState({ videoLink });
  }

  submit(e) {
    this.filterData(e);
  }

  filterData(data) {
    this.insertVideoData(data.annotations);
  }

  async insertVideoData(data) {
    const video = this.state.videoLink;
    const hash = this.generateRoute();
    const link = "https://videoannotation.herokuapp.com/video/" + hash;
    this.setState({ fullLink: <h2>{link}</h2>, hash });

    this.options.body = JSON.stringify({ data, hash, video });

    const response = await fetch("/insertData", this.options);
    const res = await response.json();

    if (res.message !== "Not Inserted") {
      alert("Data Inserted");
      this.props.history.push(`/video/${hash}`);
    } else {
      alert("some problem");
      console.log(res);
    }
  }

  hashFunction(data) {
    const md5 = crypto.createHash("md5");
    const hash = md5.update(data).digest("hex");

    return hash;
  }

  generateRoute() {
    const date = new Date().toUTCString();

    return this.hashFunction(date);
  }

  render() {
    return (
      <div>
        <h1>Video Annotation Home Page</h1>

        <TwoDimensionalVideo
          url={this.state.videoLink}
          onSubmit={(e) => this.submit(e)}
        />
      </div>
    );
  }
}
