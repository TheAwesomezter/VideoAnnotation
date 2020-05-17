import React, { Component } from "react";
import { TwoDimensionalVideo } from "react-annotation-tool";

// import video from "./video.mp4";
import "./style.scss";

const video = "http://techslides.com/demos/sample-videos/small.mp4";
export default class VideoAnnotation extends Component {
  constructor(props) {
    super(props);

    this.width = 1920;
    this.height = 1080;

    this.options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  submit(e) {
    console.log(e);
  }

  render() {
    return (
      <div>
        <h1>Main Implementation</h1>

        <TwoDimensionalVideo url={video} onSubmit={(e) => this.submit(e)} />
      </div>
    );
  }
}
