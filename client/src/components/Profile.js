import React, { Component, Fragment } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { update } from "../actions/authActions";
import { countries } from "country-flag-icons";

class Profile extends Component {
  state = {
    name: undefined,
    city: undefined,
    countryFlag: undefined,
    country: undefined,
    msg: null,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    loadUser: PropTypes.func,
    update: PropTypes.func,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value,
    countryFlag: (<img
      style={{ marginTop: "5%" }}
      width="64"
      height="32"
      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${this.state.country}.svg`}
      alt='Country flag'
    />) }, () => {
      this.forceUpdate();
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, city, country } = this.state;

    if (city) {
      city.replace(/\s+/g, "+")
    };

    // Create user object
    const updatedUser = {
      name,
      city,
      country,
    };

    // Attempt to register
    this.props.update(updatedUser);
    window.location.reload();
  };

  render() {
    const { user } = this.props.auth;

    const alertLocation = (
      <Alert color="danger">
        You haven't set a location yet - Please insert a valid City/Country combination in the form below.
      </Alert>
    );

    const alertGuest = (
      <Alert color="danger">
        Please login or register to access this page!
      </Alert>
    );

    const profileForm = (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            disabled
            type="email"
            name="email"
            id="email"
            placeholder={user ? user.email : null}
            className="mb-3"
            onChange={this.onChange}
          />
          <Label for="name">Name</Label>
          <Input
            type="name"
            name="name"
            id="name"
            placeholder={user ? user.name : null}
            className="mb-3"
            onChange={this.onChange}
          />
          <Label for="city">City</Label>
          <Input
            type="city"
            name="city"
            id="city"
            placeholder={user ? user.city : null}
            className="mb-3"
            onChange={this.onChange}
          />
          <Label for="country">Country</Label>
          <Row className="align-items: center;">
            <Col xs={{ size: "auto" }}>{this.state.countryFlag}</Col>
            <Col xs={{ size: "auto" }}>
              <Input
                type="select"
                name="country"
                id="country"
                defaultValue={user ? user.country : null}
                className="mb-3"
                onChange={this.onChange}
              >
                {countries.map((country, i) => {
                  return (
                    <>
                      <option value={country}>{country}</option>
                    </>
                  );
                })}
              </Input>
            </Col>
          </Row>
          <Button className="mb-3">Submit</Button>
        </FormGroup>
      </Form>
    );

    return (
      <Container>
        {user && !user.country ? alertLocation : null}
        {user ? profileForm : alertGuest}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { update })(Profile);
