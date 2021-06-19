import { putRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeTeam, INewEmployeeTeam } from "./types";

export const updateTeam = async (
  data: INewEmployeeTeam,
  id: string | number
): Promise<IEmployeeTeam> => {
  return await putRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${EMPLOYEES_ROUTES.teams}/${id}`,
    data
  );
};
