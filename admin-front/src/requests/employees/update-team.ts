import { putRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeTeam, INewEmployeeTeam } from "./types";

export const updateTeam = async (
  data: INewEmployeeTeam,
  id: string | number
): Promise<IEmployeeTeam> => {
  return await putRequest(`${EMPLOYEES_ROUTES.teams}/${id}`, data);
};
