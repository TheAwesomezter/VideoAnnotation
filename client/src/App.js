import React from "react";
import VideoAnnotation from "./Components/VideoAnnotation";
import VideoAnnotationHome from "./Components/VideoAnnotationHome";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <div>
          <Route path="/" component={VideoAnnotationHome} exact />
          <Route path="/video/:id" component={VideoAnnotation} exact />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
