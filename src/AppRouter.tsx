import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SignUpForm } from "./login/SignUpForm";
import { LoginForm } from "./login/LoginForm";
import { Dashboard } from "./post-login/dashboard";
import { PreLoginLayout } from "./layout/pre-login";
import { LogoutGuardedRoute, LoginGuardedRoute } from "./components/guarded-route";
import { useConnectObservable } from "./utils/hooks";
import { ServiceContext } from "./App";

export function AppRouter() {
  
  const { myUserService } = useContext(ServiceContext);
  const isAuthenticated = useConnectObservable<boolean>(myUserService.getIsLoggedIn(), !!localStorage.getItem('authorizationHeader'));
  
  return (
		<Router>
			<Switch>
				<Route exact path="/">
          <LogoutGuardedRoute isAuthenticated={isAuthenticated}>
            <PreLoginLayout>
              <LoginForm />
            </PreLoginLayout>
          </LogoutGuardedRoute>
        </Route>
				<Route exact path="/signup">
          <LogoutGuardedRoute isAuthenticated={isAuthenticated}>
            <PreLoginLayout>
              <SignUpForm />
            </PreLoginLayout>
          </LogoutGuardedRoute>
				</Route>
        <Route exact path="/dashboard">
          <LoginGuardedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </LoginGuardedRoute>
        </Route>
			</Switch>
		</Router>
  )
}