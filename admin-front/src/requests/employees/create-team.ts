import { postRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeTeam, INewEmployeeTeam } from "./types";

export const createTeam = async (
  data: INewEmployeeTeam
): Promise<IEmployeeTeam> => {
  return await postRequest(EMPLOYEES_ROUTES.teams, data);
};
