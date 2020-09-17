import React from "react"
import { Route, Router, Switch, useHistory, useRouteMatch } from "react-router-dom"
import { CardSearch } from "../CardSearch";
import { DeckDetails } from "./DeckDetails";

export const DeckDetailsRouter = () => {

  const history = useHistory();
  const { path } = useRouteMatch();

  console.log(path);
  
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={path}>
          <DeckDetails />
        </Route>
        <Route exact path={`${path}/add`}>
          <CardSearch />
        </Route>
      </Switch>
    </Router>
  )
}