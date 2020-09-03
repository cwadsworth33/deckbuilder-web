import React from "react";
import { Redirect } from "react-router-dom";

export type LoginGuardedRouteProps = {
  isAuthenticated: boolean
}

export const LoginGuardedRoute: React.FC<LoginGuardedRouteProps> = ({isAuthenticated, children}) => {
  return isAuthenticated ? <>{children}</> : <Redirect to={'/'} />
}

export const LogoutGuardedRoute: React.FC<LoginGuardedRouteProps> = ({isAuthenticated, children}) => {
  return isAuthenticated ? <Redirect to={'/dashboard'} /> : <>{children}</>
}