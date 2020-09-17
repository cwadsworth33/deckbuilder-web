import React from "react"
import { Route, Router, Switch, useHistory, useRouteMatch } from "react-router-dom"
import { Dashboard } from "./dashboard"
import { DeckDetailsRouter } from "./DeckDetails/DeckDetailsRouter";

export const PostLoginRouter: React.FC = () => {

  const history = useHistory();
  const { path } = useRouteMatch();
  
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={path}>
          <Dashboard />
        </Route>
        <Route path={`${path}/decks/:deckId`}>
          <DeckDetailsRouter />
        </Route>
      </Switch>
    </Router>
  )
}