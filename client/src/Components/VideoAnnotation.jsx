import React, { Component } from "react";
import video from "./video.mp4";
import CanvasDraw from "react-canvas-draw";

export default class VideoAnnotation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canvas: {
        width: 0,
        height: 0,
      },
      video: {
        width: 720,
        height: 480,
      },
      firstDone: false,
    };
  }

  options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };

  componentDidMount() {
    this.getVideoData()
    .then((res) => this.setState({ data: [res.data[1].drawnData.toSave] })) // change the index if saving multiple times
    .catch((err) => console.error(err));

    console.log(this.state.data)
  }

  getVideoData = async () => {
    const response = await fetch("/getData");
    if (response.status !== 200) {
      throw Error(await response.json().message);
    }

    return await response.json();
  };

  _onLoadMetadata(e) {
    let ratio = e.target.videoWidth / e.target.videoHeight;
    let w = e.target.videoWidth - 100;
    let h = parseInt(w / ratio, 10);

    console.log(w, h);
    this.setState({ canvas: { width: w, height: h }, w, h });
    document.querySelector("canvas").width = this.state.video.width;
    document.querySelector("canvas").height = this.state.video.height;
    console.log(this.state);
  }

  snap() {
    let context = document.querySelector("canvas").getContext("2d");
    context.fillRect(0, 0, this.state.w, this.state.h);
    context.drawImage(
      document.querySelector("video"),
      0,
      0,
      this.state.video.width,
      this.state.video.height
    );
    let dataURI = document.querySelector("canvas").toDataURL("image/jpeg");
    this.setState({ dataURI }, () => {
      this.setState({
        draw: (
          <CanvasDraw
            ref={(canvasDraw) => (this.saveCanvas = canvasDraw)}
            imgSrc={this.state.dataURI}
            immediateLoading={true}
            saveData={(this.state.data) + ""}
          ></CanvasDraw>
        ),
        firstDone: true,
      });
    });
  }

  async saveData() {
    let toSave = this.saveCanvas.getSaveData();
    this.options.body = JSON.stringify({toSave});

    const respone = await fetch("/insertData", this.options);
    const res = await respone.json();

    if (res.message === "Not Inserted") {
      alert("Something went wrong");
      console.log(res);
      return;
    } else {
      alert("inserted video data");
    }
  }

  render() {
    return (
      <div>
        <video
          height={this.state.video.height}
          width={this.state.video.width}
          controls
          onLoadedMetadata={(e) => this._onLoadMetadata(e)}
        >
          <source src={video} type="video/mp4" />
        </video>
        <canvas></canvas>
        <button onClick={() => this.snap()}>Click Me</button>
        {this.state.draw}
        <button
          onClick={() => {
            this.saveData();
          }}
        >
          Click to save
        </button>
        <button onClick={() => this.saveCanvas.clear()}>Clear</button>
      </div>
    );
  }
}
 

/* ISSUES:
 Basically, only one image per reload can be edited, so once a person clicks on the click me button, they would only be able to edit the current screenshot, and further attempts at clicking the click me button would just reload the picture on canvas, but not on the editable one.
 No error handling implemented
*/