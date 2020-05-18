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

    this.defaultAnnotations = undefined;

    this.state = {
      ready: false,
    };

    this.options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async componentDidMount() {
    const response = await fetch("/getData");
    const json = await response.json();

    this.setState({ defaultData: json.data[1].drawnData.data }, () => {
      // console.log(this.state.defaultData[0]);
      this.defaultAnnotations = this.state.defaultData[0];
      this.setState({
        defaultAnnotations: this.defaultAnnotations,
        ready: true,
      });
    });
  }

  submit(e) {
    this.filterData(e);
  }

  filterData(data) {
    this.insertVideoData(data.annotations);
  }

  async insertVideoData(data) {
    console.log(data);
    this.options.body = JSON.stringify({ data });

    const response = await fetch("/insertData", this.options);
    const res = await response.json();

    if (res.message !== "Not Inserted") {
      alert("Data Inserted");
    } else {
      alert("some problem");
      console.log(res);
    }
  }

  render() {
    // const videoAnn = this.state.defAnn;
    // const videoAnn = this.state.defAnn;
    // console.log(this.state.defAnn);
    // console.log(videoAnn);
    console.log(this.state);

    let oo = [
      {
        color: "rgba(0, 0, 0, 1)",
        incidents: [
          {
            x: 184.25,
            y: 80,
            width: 99,
            height: 105,
            time: 0,
            status: "Show",
            id: "kacb6zeg",
            name: "kacb6zeg",
            label: "",
          },
        ],
        childrenNames: [],
        parentName: "",
        id: "kacb6zeg",
        name: "kacb6zeg",
        label: "1",
      },
    ];

    return (
      <div>
        <h1>Main Implementation</h1>
        <TwoDimensionalVideo
          url={video}
          defaultAnnotations={oo}
          onSubmit={(e) => this.submit(e)}
        />
        <TwoDimensionalVideo
          url={video}
          defaultAnnotations={
            this.state.ready ? this.state.defaultAnnotations : []
          }
        />
      </div>
    );
  }
}
