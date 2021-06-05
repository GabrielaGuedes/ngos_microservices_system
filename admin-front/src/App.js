import "./App.css";
import { Route, Switch } from "react-router";
import Login from "./pages/login/login";
import { grommet, Grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import { customThemeForGrommet } from "./ui-constants/custom-theme-for-grommet";
import { COLORS } from "./ui-constants/colors";

function App() {
  return (
    <Grommet
      theme={deepMerge(grommet, customThemeForGrommet)}
      style={{ backgroundColor: COLORS.background, minHeight: "100vh" }}
    >
      <Switch>
        <Route path="/" exact>
          <div>Pagina inicial</div>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/tuk">
          <div>logado</div>
        </Route>
      </Switch>
    </Grommet>
  );
}

export default App;
