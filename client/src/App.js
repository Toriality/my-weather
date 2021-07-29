import "./App.css";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import Weather from "./components/Weather";
import Home from './components/Home';
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <Router>
              <Route path="/" exact component={Home} />
              <Route path="/dashboard" exact component={Weather} />
            </Router>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
