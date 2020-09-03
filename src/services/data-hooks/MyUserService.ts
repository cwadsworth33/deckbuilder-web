import { useEffect, useState } from "react";
import { myUserService } from "../DataServices";

export const useIsAuthenticated = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authorizationHeader'));
  useEffect(() => {
    const sub = myUserService.getIsLoggedIn().subscribe(loggedIn => setIsLoggedIn(loggedIn));
    return () => sub.unsubscribe();
  });
  return isLoggedIn;
};