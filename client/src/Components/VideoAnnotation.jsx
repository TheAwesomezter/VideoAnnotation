import React, { Component } from "react";
import { Player, ControlBar } from "video-react";

import video from "./video.mp4";
import "./style.scss";

const captureFrame = require("capture-frame");

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

  takeScreenshot() {
    const video = this.player.video.video; // getting the video player current state

    const ss = captureFrame(video);
    this.setState(
      { image: window.URL.createObjectURL(new window.Blob([ss])) },
      () => {}
    );
  }

  render() {
    return (
      <div>
        <h1>Another Implementation</h1>
        <div className="foo">
          <Player
            fluid={false}
            ref={(player) => {
              this.player = player;
            }}
            src={video}
            width={this.width}
            height={this.height}
            crossOrigin={"anonymous"}
          >
            <ControlBar autoHide={false} />
          </Player>
        </div>
        <button
          onClick={() => {
            this.takeScreenshot();
          }}
        >
          Take Screenshot
        </button>
        <br />
      </div>
    );
  }
}
