import "./App.css";
import { Route, Switch } from "react-router";
import Login from "./pages/login/login";
import { grommet, Grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import { customThemeForGrommet } from "./ui-constants/custom-theme-for-grommet";
import { COLORS } from "./ui-constants/colors";
import Sidebar from "./components/sidebar/sidebar";
import { Toaster } from "react-hot-toast";
import { StyledPage } from "./App.style";

function App() {
  return (
    <Grommet
      theme={deepMerge(grommet, customThemeForGrommet)}
      style={{ backgroundColor: COLORS.background, minHeight: "100vh" }}
    >
      <Switch>
        <Route path="/" exact>
          <Sidebar />
          <StyledPage>Pagina inicial</StyledPage>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/donations">
          <Sidebar />
          <StyledPage>doações feitas</StyledPage>
        </Route>
        <Route path="/donators">
          <Sidebar />
          <StyledPage>doadore</StyledPage>
        </Route>
        <Route path="/employees" exact>
          <Sidebar />
          <StyledPage>funcionarios</StyledPage>
        </Route>
        <Route path="/employees/areas">
          <Sidebar />
          <StyledPage>Areas</StyledPage>
        </Route>
        <Route path="/employees/teams">
          <Sidebar />
          <StyledPage>Times</StyledPage>
        </Route>
        <Route path="/volunteers" exact>
          <Sidebar />
          <StyledPage>Voluntarios</StyledPage>
        </Route>
        <Route path="/volunteers/areas">
          <Sidebar />
          <StyledPage>Areas</StyledPage>
        </Route>
        <Route path="/volunteers/teams">
          <Sidebar />
          <StyledPage>Times</StyledPage>
        </Route>
        <Route path="/projects">
          <Sidebar />
          <StyledPage>Projetos</StyledPage>
        </Route>
        <Route path="/financial-control" exact>
          <Sidebar />
          <StyledPage>Controle financeiro</StyledPage>
        </Route>
        <Route path="/financial-control/goals">
          <Sidebar />
          <StyledPage>Metas</StyledPage>
        </Route>
        <Route path="/marketing" exact>
          <Sidebar />
          <StyledPage>Marketing</StyledPage>
        </Route>
        <Route path="/marketing/posted">
          <Sidebar />
          <StyledPage>Postadas</StyledPage>
        </Route>
        <Route path="/reports">
          <Sidebar />
          <StyledPage>relatórios</StyledPage>
        </Route>
        <Route path="/invoices">
          <Sidebar />
          <StyledPage>notas fiscais</StyledPage>
        </Route>
        <Route path="/settings">
          <Sidebar />
          <StyledPage>configurações</StyledPage>
        </Route>
      </Switch>
      <Toaster />
    </Grommet>
  );
}

export default App;
