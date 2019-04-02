import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class EditCandidate extends Component {
  constructor() {
    super();
    this.state = {
      newFirstName: "",
      newLastName: "",
      newLastJob: "",
      newSkill: "",
      newImgUrl: ""
    };
  }

  async handleAdd() {
    const data = {
      firstName: this.state.newFirstName,
      lastName: this.state.newLastName,
      lastJob: this.state.newLastJob,
      profilePic: this.state.newImgUrl,
      skill: this.state.newSkill
    };
    const url = "http://localhost:3001/candidates";
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    // change to view FullCandidate
    this.props.history.push("/view/");
    console.log(resp);
  }

  handleTextChange(a, b, c, d, e) {
    this.setState(
      {
        newFirstName: a ? a : this.state.newFirstName,
        newLastName: b ? b : this.state.newLastName,
        newLastJob: c ? c : this.state.newLastJob,
        newSkill: d ? d : this.state.newSkill,
        newImgUrl: e ? e : this.state.newImgUrl
      },
      () => console.log(this.state)
    );
  }

  render() {
    return (
      <div>
        <h1>Add new candidate</h1>
        <Form>
          <FormGroup row>
            <Label sm={2}>firstName</Label>
            <Col sm={10}>
              <Input
                onChange={e =>
                  this.handleTextChange(e.target.value, "", "", "", "")
                }
                placeholder="firstName"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>lastName</Label>
            <Col sm={10}>
              <Input
                onChange={e =>
                  this.handleTextChange("", e.target.value, "", "", "")
                }
                placeholder="lastName"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>profilePic</Label>
            <Col sm={10}>
              <Input
                onChange={e =>
                  this.handleTextChange("", "", "", "", e.target.value)
                }
                placeholder="profilePic Url"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>lastJob</Label>
            <Col sm={10}>
              <Input
                onChange={e =>
                  this.handleTextChange("", "", e.target.value, "", "")
                }
                placeholder="lastJob"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>skill</Label>
            <Col sm={10}>
              <Input
                onChange={e =>
                  this.handleTextChange("", "", "", e.target.value, "")
                }
                placeholder="skill"
              />
            </Col>
          </FormGroup>
        </Form>
        <Button className="btn-success" onClick={() => this.handleAdd()}>
          Confirm Add
        </Button>
        <Button
          className="btn-danger"
          onClick={() => this.props.history.push("/view/")}
        >
          Cancel
        </Button>
      </div>
    );
  }
}
