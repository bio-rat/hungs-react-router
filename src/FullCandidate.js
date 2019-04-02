import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default class FullCandidate extends Component {
  constructor() {
    super();
    this.state = {
      candidates: []
    };
  }

  async componentDidMount() {
    const url = "http://localhost:3001/candidates";
    const resp = await fetch(url);
    const json = await resp.json();
    this.setState({
      candidates: json.reverse()
    });
  }

  render() {
    return (
      <div>
        <Button
          className="btn-success"
          onClick={() => this.props.history.push("/add/")}
        >
          Add new candidate
        </Button>
        {this.state.candidates.map(x => (
          <div key={x.id}>
            <Link
              to={{
                pathname: `/view/candidate/${x.id}`,
                state: x
              }}
            >
              {x.firstName}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
