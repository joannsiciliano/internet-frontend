import "./App.css";
import React, { Component, isValidElement } from "react";
import SignupForm from "./forms/SignupForm";
import LoginForm from "./forms/LoginForm.js";
import HomePage from "./Pages/HomePage.js";
import { Switch, Route, withRouter } from "react-router-dom";
import SecondPage from "./Pages/SecondPage";
import ThirdPage from "./Pages/ThirdPage";
import FourthPage from "./Pages/FourthPage";
import FifthPage from "./Pages/FifthPage";
import SixthPage from "./Pages/SixthPage";
class App extends Component {
  state = {
    user: {},
    error: "",
  };
  componentDidMount() {
    this.validateUser();
  }
  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      user: {},
    });
  };
  validateUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://this-is-internet.herokuapp.com/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.id) {
            this.setState({
              user: result,
            });
          }
        });
    }
  };

  signUp = (user) => {
    fetch("https://this-is-internet.herokuapp.com/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password,
        },
      }),
    })
      .then((response) => response.json())
      .then((user) => this.setState({ user }));
    if (user.username && user.password) {
      this.props.history.push("/login");
    }
  };

  login = (username, password) => {
    fetch("https://this-is-internet.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);
          this.setState({
            user: result.user,
          });
          this.props.history.push("/");
        } else {
          this.setState({
            error: result.error,
          });
        }
      });
  };

  render() {
    return (
      <div className="App">
        {this.state.user.id ? (
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <HomePage
                  user={this.state.user}
                  logout={this.logout}
                  error={this.state.error}
                  login={this.login}
                />
              )}
            />

            <Route
              path="/cosine"
              exact
              render={(props) => (
                <SecondPage
                  user={this.state.user}
                  logout={this.logout}
                  error={this.state.error}
                  login={this.login}
                />
              )}
            />
            <Route
              path="/void"
              exact
              render={(props) => (
                <ThirdPage
                  user={this.state.user}
                  logout={this.logout}
                  error={this.state.error}
                  login={this.login}
                />
              )}
            />
            <Route
              path="/u4ia"
              exact
              render={(props) => (
                <FourthPage
                  user={this.state.user}
                  logout={this.logout}
                  error={this.state.error}
                  login={this.login}
                />
              )}
            />
            <Route
              path="/chatroom"
              exact
              render={(props) => (
                <FifthPage
                  user={this.state.user}
                  logout={this.logout}
                  error={this.state.error}
                  login={this.login}
                />
              )}
            />
            <Route
              path="/universe"
              exact
              render={(props) => (
                <SixthPage
                  user={this.state.user}
                  logout={this.logout}
                  error={this.state.error}
                  login={this.login}
                />
              )}
            />
          </Switch>
        ) : (
          <>
            <Route
              path="/signup"
              exact
              render={(props) => <SignupForm {...props} signUp={this.signUp} />}
            />
            <Switch>
              <Route
                path="/login"
                exact
                render={(props) => (
                  <LoginForm
                    {...props}
                    login={this.login}
                    error={this.state.error}
                  />
                )}
              />
            </Switch>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(App);
