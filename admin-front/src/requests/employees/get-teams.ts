import { getRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeTeam, IEmployeeTeamsFilters } from "./types";

export const getTeams = async (
  filters?: IEmployeeTeamsFilters
): Promise<IEmployeeTeam[]> => {
  return await getRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${EMPLOYEES_ROUTES.teams}`,
    filters
  );
};
