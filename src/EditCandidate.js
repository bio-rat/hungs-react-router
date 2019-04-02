import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class EditCandidate extends Component {
  constructor() {
    super();
    this.state = {
      thisCandidate: {},
      newFirstName: "",
      newLastName: "",
      newLastJob: "",
      newSkill: ""
    };
  }

  async handleEdit() {
    const thisCandidate = this.state.thisCandidate;
    const data = {
      firstName: this.state.newFirstName
        ? this.state.newFirstName
        : thisCandidate.firstName,
      lastName: this.state.newLastName
        ? this.state.newLastName
        : thisCandidate.lastName,
      lastJob: this.state.newLastJob
        ? this.state.newLastJob
        : thisCandidate.lastJob,
      profilePic: thisCandidate.profilePic,
      skill: this.state.newSkill ? this.state.newSkill : thisCandidate.skill
    };
    const url = `http://localhost:3001/candidates/${
      this.props.match.params.id
    }`;
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    // change to view
    this.props.history.push(`/view/candidate/${this.props.match.params.id}`);
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
  }

  handleTextChange(a, b, c, d) {
    this.setState({
      newFirstName: a ? a : this.state.newFirstName,
      newLastName: b ? b : this.state.newLastName,
      newLastJob: c ? c : this.state.newLastJob,
      newSkill: d ? d : this.state.newSkill
    });
  }

  render() {
    const thisCandidate = this.state.thisCandidate;
    return (
      <div>
        <h1>Edit candidate {thisCandidate.id}</h1>
        <Form>
          <FormGroup row>
            <Label sm={2}>firstName</Label>
            <Col sm={10}>
              <Input
                onChange={e =>
                  this.handleTextChange(e.target.value, "", "", "")
                }
                placeholder={thisCandidate.firstName}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>lastName</Label>
            <Col sm={10}>
              <Input
                onChange={e =>
                  this.handleTextChange("", e.target.value, "", "")
                }
                placeholder={thisCandidate.lastName}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>lastJob</Label>
            <Col sm={10}>
              <Input
                onChange={e =>
                  this.handleTextChange("", "", e.target.value, "")
                }
                placeholder={thisCandidate.lastJob}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>skill</Label>
            <Col sm={10}>
              <Input
                onChange={e =>
                  this.handleTextChange("", "", "", e.target.value)
                }
                placeholder={thisCandidate.skill}
              />
            </Col>
          </FormGroup>
        </Form>
        <Button className="btn-success" onClick={() => this.handleEdit()}>
          Confirm edit
        </Button>
        <Button
          className="btn-danger"
          onClick={() =>
            this.props.history.push(
              `/view/candidate/${this.props.match.params.id}`
            )
          }
        >
          Cancel
        </Button>
      </div>
    );
  }
}
