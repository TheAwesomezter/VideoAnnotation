import React, { Component } from "react";
import { Player, ControlBar } from "video-react";
import { SketchField, Tools } from "react-sketch";

import video from "./video.mp4";
import "./style.scss";

const captureFrame = require("capture-frame");

export default class VideoAnnotation extends Component {
  constructor(props) {
    super(props);

    this.width = 1920;
    this.height = 1080;

    this.videoData = {};

    this.options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    this.state = {
      image: undefined,
    };
  }

  async componentDidMount() {
    const response = await fetch("/getData");
    const json = await response.json();

    // console.log(json.data[0].drawnData.data);
    this.setState({ saveData: json.data[0].drawnData.data });
  }

  takeScreenshot() {
    const video = this.player.video.video; // getting the video player current state

    const ss = captureFrame(video);
    this.setState(
      { image: window.URL.createObjectURL(new window.Blob([ss])) },
      () => {
        // this.imgTag.width = this.width;
        // this.imgTag.height = this.height;
        this.getRequiredData();
        this.sketchField.setBackgroundFromDataUrl(this.state.image);
        this.sketchField.zoom(0);
      }
    );
  }

  async insertData() {
    const data = this.state.dataToBeSaved;
    this.options.body = JSON.stringify({ data });

    console.log(this.options);

    const response = await fetch("/insertData", this.options);
    const json = await response.json();

    if (json.message !== "Not Inserted") {
      alert("inserted");
    } else {
      console.log(json);
    }
  }

  getRequiredData() {
    const { player } = this.player.getState();
    console.log(player.currentTime);
  }

  saveSomeData() {
    this.setState({ dataToBeSaved: this.sketchField.toJSON() }, () =>
      this.insertData()
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

        {/* <img
          src={this.state.image}
          alt="None"
          ref={(imgTag) => (this.imgTag = imgTag)}
        /> */}

        <SketchField
          width={this.width}
          height={this.height}
          tool={Tools.Pencil}
          ref={(sketchField) => (this.sketchField = sketchField)}
          value={this.state.saveData}
          lineColor="black"
          fillColor="green"
          lineWidth={3}
        />

        <button onClick={() => this.saveSomeData()}>Log It</button>
      </div>
    );
  }
}
