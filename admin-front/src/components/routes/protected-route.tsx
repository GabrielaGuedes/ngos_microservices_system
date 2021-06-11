import React, { useEffect } from "react";
import { Route } from "react-router";
import { isServicePathDisabled } from "../../utils/service-path-checker";
import { isUserLoggedIn } from "../../utils/session";

interface IProtectedRoute {
  path: string;
  exact?: boolean;
  servicePath?: boolean;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({
  path,
  exact,
  servicePath,
  children,
}) => {
  useEffect(() => {
    if (!isUserLoggedIn()) {
      window.location.href = "/login";
    }

    // TODO: improve this when refactoring the app.js
    if (servicePath) {
      isServicePathDisabled(path).then((disabled: boolean) => {
        console.log("disabled: ", disabled);
        if (disabled) window.location.href = "/";
      });
    }
  }, []);

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
};

export default ProtectedRoute;
