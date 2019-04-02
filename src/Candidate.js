import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./Candidate.css";

export default class Candidate extends Component {
  constructor() {
    super();
    this.state = {
      thisCandidate: {}
    };
  }

  async handleDelete() {
    const url = `http://localhost:3001/candidates/${
      this.props.match.params.id
    }`;
    const resp = await fetch(url, { method: "delete" });
    //change path
    this.props.history.push("/view");
    console.log(resp);
  }

  componentDidMount() {
    this.getCandidateData();
  }

  async getCandidateData() {
    const url = `http://localhost:3001/candidates/${
      this.props.match.params.id
    }`;
    const resp = await fetch(url);
    const json = await resp.json();
    this.setState({
      thisCandidate: json
    });
    // console.log(resp);
  }

  render() {
    console.log(this.props);
    const candidate = this.state.thisCandidate;
    return (
      <div style={{ marginLeft: "40%" }}>
        <Card style={{ width: "300px", height: "400px" }}>
          <CardImg
            top
            width="100px"
            src={candidate.profilePic}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{candidate.firstName}</CardTitle>
            <CardSubtitle>{candidate.lastName}</CardSubtitle>
            <ul className="list-unstyled">
              <li>last job: {candidate.lastJob}</li>
              <li>skill: {candidate.skill}</li>
            </ul>
          </CardBody>
          <CardFooter>
            <Button onClick={() => this.props.history.push("/view/")}>
              Go Home
            </Button>
            <Button
              className="btn-success"
              onClick={() =>
                this.props.history.push(`/edit/candidate/${candidate.id}`)
              }
            >
              Click to edit
            </Button>
            <Button className="btn-danger" onClick={() => this.handleDelete()}>
              Click to delete
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
