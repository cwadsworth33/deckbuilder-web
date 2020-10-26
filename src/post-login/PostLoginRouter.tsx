import React from "react"
import { Route, Router, Switch, useHistory, useRouteMatch } from "react-router-dom"
import { DecksResolver } from "../resolvers/DecksResolver";
import { Dashboard } from "./dashboard"
import { DeckDetailsRouter } from "./DeckDetails/DeckDetailsRouter";

export const PostLoginRouter: React.FC = () => {

  const history = useHistory();
  const { path } = useRouteMatch();
  
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={path}>
          <DecksResolver>
            <Dashboard />
          </DecksResolver>
        </Route>
        <Route path={`${path}/decks/:deckId`}>
          <DecksResolver>
            <DeckDetailsRouter />
          </DecksResolver>
        </Route>
      </Switch>
    </Router>
  )
}