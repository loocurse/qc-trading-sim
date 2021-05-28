import React from "react";
import { Router, Switch, Route } from "react-router-dom";

export const MyRouter = ({ testComponent, children }) => {
  return (
    <Router>
      <Switch>
        <Route path="/">{children}</Route>
        <Route path="/test">{testComponent}</Route>
      </Switch>
    </Router>
  );
};
