import React, { useEffect } from "react";
import { Route } from "react-router";
import { isUserLoggedIn } from "../../utils/session";

interface IProtectedRoute {
  path: string;
  exact?: boolean;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({
  path,
  exact,
  children,
}) => {
  useEffect(() => {
    if (!isUserLoggedIn()) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
};

export default ProtectedRoute;
