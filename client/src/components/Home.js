import React, { Component, useState } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Alert,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { getWeather, getWeatherWeek } from "../actions/weatherActions";
import PropTypes from "prop-types";

class Home extends Component {
  state = {
    activeTab: "1",
  };

  static propTypes = {
    getWeather: PropTypes.func.isRequired,
    getWeatherWeek: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    weather: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidUpdate(prevProps) {
    if (this.props.auth.user !== prevProps.auth.user) {
      if (this.props.auth.user !== null) {
        this.props.getWeather(
          this.props.auth.user.city,
          this.props.auth.user.country
        );
        this.props.getWeatherWeek(
          this.props.auth.user.city,
          this.props.auth.user.country
        );
      }
    }
  }

  render() {
    const { now, week } = this.props.weather;
    const { user } = this.props.auth;
    const daysInAWeek = [0, 1, 2, 3, 4, 5, 6];

    return (
      <Container>
        {user ? (
          <Alert color="success">
            Welcome back,{" "}
            <a className="link" href="/edit_profile">
              {user.name}
            </a>
            !
          </Alert>
        ) : null}
        <Nav tabs>
          <NavItem>
            <NavLink
              className={this.state.activeTab === "1" ? "active" : ""}
              onClick={() => {
                this.setState({ activeTab: "1" });
              }}
            >
              Now
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab === "2" ? "active" : ""}
              onClick={() => {
                this.setState({ activeTab: "2" });
              }}
            >
              This week
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ListGroup>
              <ListGroupItem>Current temperature: {now.temp}</ListGroupItem>
              <ListGroupItem>Minimum temperature {now.tempMin}</ListGroupItem>
              <ListGroupItem>Maximum temperature {now.tempMax}</ListGroupItem>
              <ListGroupItem>
                Weather
                <img
                  src={`http://openweathermap.org/img/wn/${now.weatherIcon}@4x.png`}
                  alt={now.weather}
                ></img>{" "}
                {now.weather} - {now.weatherDesc}
              </ListGroupItem>
            </ListGroup>
          </TabPane>
          <TabPane tabId="2">
            <Row xs="auto" style={{ justifyContent: "center" }}>
              {daysInAWeek.map((day) => {
                return (
                  <Col style={{ padding: "2rem" }}>
                    <Row>
                      <img
                        src={`http://openweathermap.org/img/wn/${week.weatherIcon[day]}@2x.png`}
                        alt={week.weather[day]}
                      />
                    </Row>
                    <Row>
                      <h2>{week.weather[day]}</h2>
                    </Row>
                    <Row>
                      <h3>{week.temp[day]}°C</h3>
                    </Row>
                    <Row>
                      <h4>🠕 {week.tempMax[day]}°C</h4>
                    </Row>
                    <Row>
                      <h4>🠗 {week.tempMin[day]}°C</h4>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  weather: state.weather,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getWeather, getWeatherWeek })(Home);
