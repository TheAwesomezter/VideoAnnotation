import React, { Component } from "react";
import { TwoDimensionalVideo } from "react-annotation-tool";

import video from "./video.mp4";
import "./style.scss";

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

  submit() {
    console.log();
  }

  render() {
    return (
      <div>
        <h1>Main Implementation</h1>

        <TwoDimensionalVideo url={video} onSubmit={submit} />
      </div>
    );
  }
}
