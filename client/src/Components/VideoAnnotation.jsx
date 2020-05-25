import React, { Component } from "react";
import { TwoDimensionalVideo } from "react-annotation-tool";
import { Link } from "react-router-dom";
// import video from "./video.mp4";
import "./style.scss";

// http://techslides.com/demos/sample-videos/small.mp4

export default class VideoAnnotation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uniqueHash: props.match.params.id,
    };

    this.twodRef = React.createRef();
  }

  async componentDidMount() {
    const response = await fetch(`/video/${this.state.uniqueHash}`);
    const json = await response.json();

    this.setState({
      tag: (
        <TwoDimensionalVideo
          ref={this.twodRef}
          url={json.data[0].videoLink}
          defaultAnnotations={json.data[0].drawnData}
        />
      ),
    });
  }

  render() {
    return (
      <div>
        <h1>Main Implementation</h1>
        {this.state.tag}
        <Link to={`/video/${this.state.hash}`}> {this.state.fullLink} </Link>
      </div>
    );
  }
}
