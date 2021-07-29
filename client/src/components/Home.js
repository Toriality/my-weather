import React, { Component, useState } from "react";
import {
     Container, ListGroup, ListGroupItem, Alert, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col 
    }
    from "reactstrap";
import { connect } from "react-redux";
import { getWeather } from "../actions/weatherActions";
import PropTypes from "prop-types";

class Home extends Component {
    state = {
        activeTab: '1',
    }

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
    const { user }  = this.props.auth;


    return (
      <Container>
          {user ? 
            (<Alert color="success">Welcome back, <a className="link" href="/edit_profile">{user.name}</a>!</Alert>) : null  
        }
              <Nav tabs>
        <NavItem>
          <NavLink className={this.state.activeTab === '1' ? 'active' : ''} onClick={() => 
            {
                this.setState({activeTab: '1'})
            }}>
             Now
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={this.state.activeTab === '2' ? 'active' : ''} onClick={() => 
            {
                this.setState({activeTab: '2'})
            }
        }>
            This week
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
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
        </TabPane>
        <TabPane tabId="2">Tab 2 Content</TabPane>
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

export default connect(mapStateToProps, { getWeather })(Home);
