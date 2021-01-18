import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/pages/login/login";
import Home from "./components/pages/home/home";
import EditDragon from "./components/pages/edit-dragon/editDragon";
import "./App.css";
import 'normalize.css'

const App = props => {
  let routes = (
    <Switch>
      <Route path="/" exact component={Login} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dragon/:id" render={props => <EditDragon {...props} />} />
        <Route path="/home" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <header className="App-header">{routes}</header>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};



export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
