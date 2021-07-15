import "./App.css";
import { grommet, Grommet } from "grommet";
import { Toaster } from "react-hot-toast";
import { Route, Switch } from "react-router-dom";
import { deepMerge } from "grommet/utils";
import { customThemeForGrommet } from "./ui-constants/custom-theme-for-grommet";
import { COLORS } from "./ui-constants/colors";
import Initial from "./pages/initial";

function App() {
  return (
    <Grommet
      theme={deepMerge(grommet, customThemeForGrommet)}
      style={{ backgroundColor: COLORS.background, minHeight: "100vh" }}
    >
      <Switch>
        <Route path="/" exact>
          <Initial />
        </Route>
      </Switch>
      <Toaster />
    </Grommet>
  );
}

export default App;
