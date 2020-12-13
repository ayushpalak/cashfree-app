import React from "react";
import DashboardView from "./views/DashboardView";
import UserRoute from "./routes/UserRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <Grid
      container
      className="app-container"
      alignItems="center"
      justify="center"
    >
      <Router>
        <Switch>
          <Route exact path="/" component={DashboardView}></Route>
          <Route path="/user">
            <UserRoute />
          </Route>
        </Switch>
      </Router>
    </Grid>
  );
}

export default App;
