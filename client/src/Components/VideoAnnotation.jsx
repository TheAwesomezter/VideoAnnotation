import React, { Component } from "react";
import { TwoDimensionalVideo } from "react-annotation-tool";

// import video from "./video.mp4";
import "./style.scss";

const video = "http://techslides.com/demos/sample-videos/small.mp4";
export default class VideoAnnotation extends Component {
  constructor(props) {
    super(props);

    this.defaultAnnotations = undefined;

    this.state = {
      ready: false,
      clearThing: (
        <TwoDimensionalVideo
          url={video}
          onSubmit={(e) => this.submit(e)}
          defaultAnnotations={[]}
        ></TwoDimensionalVideo>
      ),
    };

    this.twodRef = React.createRef();

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

    const ind = prompt(
      "Enter the index you want to visit, latest is (in computer terms, index starts at 0, so you would need to subtract 1 from this, to see the latest): " +
        json.data.length
    );
    this.setState({
      tag: (
        <TwoDimensionalVideo
          ref={this.twodRef}
          url={video}
          onSubmit={(e) => this.submit(e)}
          defaultAnnotations={json.data[ind].drawnData}
        />
      ),
    });
  }

  submit(e) {
    this.filterData(e);
  }

  filterData(data) {
    this.insertVideoData(data.annotations);
  }

  async insertVideoData(data) {
    this.options.body = JSON.stringify(data);

    const response = await fetch("/insertData", this.options);
    const res = await response.json();

    if (res.message !== "Not Inserted") {
      alert("Data Inserted");
    } else {
      alert("some problem");
      console.log(res);
    }
  }

  clearVideo(e) {
    this.setState({ ready: true });
  }

  render() {
    return (
      <div>
        <h1>Main Implementation</h1>

        {this.state.ready ? this.state.clearThing : this.state.tag}
        <button onClick={(e) => this.clearVideo(e)}>Clear</button>
      </div>
    );
  }
}
