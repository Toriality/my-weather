import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, DropdownItem } from "reactstrap";
import { connect } from "react-redux";
import { getWeather } from "../actions/weatherActions";
import PropTypes from "prop-types";
import Profile from "./Profile";

class Weather extends Component {
  static propTypes = {
    getWeather: PropTypes.func.isRequired,
    test: PropTypes.func.isRequired,
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
      }
    }
  }

  render() {
    const { weather } = this.props.weather;
    return (
      <Container>
        <Profile />
        <DropdownItem divider />
        <h6 style={{marginBottom: '2rem', marginTop: '2rem', marginLeft: '1rem'}}>Preview:</h6>
        <ListGroup>
          <ListGroupItem>Current temperature: {weather.temp}</ListGroupItem>
          <ListGroupItem>Minimum temperature {weather.tempMin}</ListGroupItem>
          <ListGroupItem>Maximum temperature {weather.tempMax}</ListGroupItem>
          <ListGroupItem>
            Weather
            <img
              src={`http://openweathermap.org/img/wn/${weather.weatherIcon}@4x.png`}
              alt={weather.weather}
            ></img>{" "}
            {weather.weather} - {weather.weatherDesc}
          </ListGroupItem>
        </ListGroup>
        <div>
          <div></div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  weather: state.weather,
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getWeather })(Weather);
