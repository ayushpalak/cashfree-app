import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import UserView from "../views/UserView";
export default function UserRoute() {
  let match = useRouteMatch();

  return (
    <div className="app">
      <Switch>
        <Route exact path={`${match.path}/:userId`}>
          <UserView />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}
