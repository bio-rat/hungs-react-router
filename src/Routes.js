import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Candidate from "./Candidate";
import EditCandidate from "./EditCandidate";
import FullCandidate from "./FullCandidate";
import NoMatch from "./NoMatch";
import AddCandidate from "./AddCandidate";

class Routes extends React.Component {
  constructor() {
    super();
    this.state = {
      test: "hello"
    };
  }
  render() {
    return (
      <Switch>
        <Route path="/home/:id" exact component={Home} />
        <Route path="/view/" exact component={FullCandidate} />
        <Route path="/view/candidate/:id" component={Candidate} />
        <Route exact path="/edit/candidate/:id" component={EditCandidate} />
        <Route path="/add/" exact component={AddCandidate} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

export default Routes;
