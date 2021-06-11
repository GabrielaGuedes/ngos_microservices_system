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
import ProtectedRoute from "./components/routes/protected-route";
import Settings from "./pages/settings/settings";

function App() {
  return (
    <Grommet
      theme={deepMerge(grommet, customThemeForGrommet)}
      style={{ backgroundColor: COLORS.background, minHeight: "100vh" }}
    >
      <Switch>
        <ProtectedRoute path="/" exact>
          <Sidebar />
          <StyledPage>Pagina inicial</StyledPage>
        </ProtectedRoute>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute servicePath path="/donations">
          <Sidebar />
          <StyledPage>doações feitas</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/donators">
          <Sidebar />
          <StyledPage>doadores</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/employees" exact>
          <Sidebar />
          <StyledPage>funcionarios</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/employees/areas">
          <Sidebar />
          <StyledPage>Areas</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/employees/teams">
          <Sidebar />
          <StyledPage>Times</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/volunteers" exact>
          <Sidebar />
          <StyledPage>Voluntarios</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/volunteers/areas">
          <Sidebar />
          <StyledPage>Areas</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/volunteers/teams">
          <Sidebar />
          <StyledPage>Times</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/projects">
          <Sidebar />
          <StyledPage>Projetos</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/financial-control" exact>
          <Sidebar />
          <StyledPage>Controle financeiro</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/financial-control/goals">
          <Sidebar />
          <StyledPage>Metas</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/marketing" exact>
          <Sidebar />
          <StyledPage>Marketing</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/marketing/posted">
          <Sidebar />
          <StyledPage>Postadas</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/reports">
          <Sidebar />
          <StyledPage>relatórios</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute servicePath path="/invoices">
          <Sidebar />
          <StyledPage>notas fiscais</StyledPage>
        </ProtectedRoute>
        <ProtectedRoute path="/settings">
          <Sidebar />
          <StyledPage>
            <Settings />
          </StyledPage>
        </ProtectedRoute>
      </Switch>
      <Toaster />
    </Grommet>
  );
}

export default App;
