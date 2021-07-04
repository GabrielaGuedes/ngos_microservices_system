import { getRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeTeam } from "./types";

export const getTeam = async (id: string | number): Promise<IEmployeeTeam> => {
  return await getRequest(`${EMPLOYEES_ROUTES.teams}/${id}`);
};
